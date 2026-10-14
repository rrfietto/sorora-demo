import test from 'node:test'
import assert from 'node:assert/strict'
import {
  DEFAULT_PREFERENCES,
  PODS,
  DAYS,
  canJoin,
  findMatches,
  findNearbyMatches,
  timeDifferenceMinutes,
} from '../src/data.ts'
import { freshState, loadState, STORAGE_KEY } from '../src/store.ts'
import { createDemoMeeting } from '../src/meeting.ts'

test('default journey finds three compatible pods with Calculus Circle first', () => {
  const matches = findMatches(DEFAULT_PREFERENCES, null)
  assert.equal(matches.length, 3)
  assert.equal(matches[0].id, 'calculus-circle')
  for (const pod of matches) {
    assert.equal(pod.course, 'Calculus I')
    assert.equal(pod.day, 'Wednesday')
    assert.equal(pod.time, '18:00')
    assert.ok(pod.members.length < pod.capacity)
  }
})
test('wrong course or availability never gets a fabricated match', () => {
  assert.equal(findMatches({ ...DEFAULT_PREFERENCES, day: 'Monday' }, null).length, 0)
  assert.equal(findMatches({ ...DEFAULT_PREFERENCES, time: '19:00' }, null).length, 0)
  assert.equal(findMatches({ ...DEFAULT_PREFERENCES, course: 'Physics I' }, null).length, 0)
})
test('nearby suggestions appear only when the time differs, on the same day and course', () => {
  const preferences = { ...DEFAULT_PREFERENCES, time: '19:00' }
  const suggestions = findNearbyMatches(preferences, null)
  assert.equal(suggestions.length, 3)
  assert.equal(suggestions[0].id, 'calculus-circle')
  assert.equal(timeDifferenceMinutes(suggestions[0].time, preferences.time), -60)
  for (const pod of suggestions) {
    assert.equal(pod.course, preferences.course)
    assert.equal(pod.day, preferences.day)
    assert.ok(pod.members.length < pod.capacity)
  }
  assert.deepEqual(findNearbyMatches(DEFAULT_PREFERENCES, null), [])
  assert.deepEqual(findNearbyMatches(preferences, 'calculus-circle'), [])
  assert.deepEqual(findNearbyMatches({ ...preferences, day: 'Monday' }, null), [])
  assert.deepEqual(findNearbyMatches({ ...preferences, course: 'Physics I' }, null), [])
})
test('nearby suggestions exclude full/foreign pods and times more than two hours away', () => {
  const preferences = { ...DEFAULT_PREFERENCES, time: '19:00' }
  const foreign = { ...PODS[0], id: 'foreign', institutionId: 'another-school' }
  const distant = { ...PODS[0], id: 'distant', time: '16:00' }
  const nearest = { ...PODS[1], id: 'nearest', time: '19:30' }
  const suggestions = findNearbyMatches(preferences, null, [...PODS, foreign, distant, nearest])
  assert.equal(suggestions[0].id, 'nearest')
  assert.ok(!suggestions.some((p) => ['foreign', 'full-circle', 'distant'].includes(p.id)))
  assert.deepEqual(findNearbyMatches({ ...preferences, time: '21:00' }, null), [])
  assert.equal(timeDifferenceMinutes('20:00', '19:00'), 60)
})
test('other subjects have real compatible seeded options', () => {
  assert.equal(
    findMatches(
      { ...DEFAULT_PREFERENCES, course: 'Intro to Programming', day: 'Tuesday', time: '17:00' },
      null,
    )[0].id,
    'code-companions',
  )
  assert.equal(
    findMatches(
      { ...DEFAULT_PREFERENCES, course: 'Organic Chemistry', day: 'Monday', time: '17:00' },
      null,
    )[0].id,
    'chemistry-circle',
  )
})
test('full and foreign-institution pods are excluded', () => {
  const foreign = { ...PODS[0], id: 'foreign', institutionId: 'another-school' }
  assert.ok(
    !findMatches(DEFAULT_PREFERENCES, null, [...PODS, foreign]).some(
      (p) => p.id === 'full-circle' || p.id === 'foreign',
    ),
  )
  assert.equal(canJoin(foreign, null), false)
  assert.equal(
    canJoin(
      PODS.find((p) => p.id === 'full-circle')!,
      null,
    ),
    false,
  )
})
test('joining the last seat gives exactly 5/5 and prevents another or duplicate join', () => {
  const circle = PODS[0]
  assert.equal(canJoin(circle, null), true)
  assert.equal(circle.members.length + 1, circle.capacity)
  assert.equal(canJoin(circle, circle.id), false)
  assert.equal(canJoin(PODS[1], circle.id), false)
  assert.ok(findMatches(DEFAULT_PREFERENCES, circle.id).some((p) => p.id === circle.id))
})
test('level ranks options without inventing compatibility', () => {
  assert.equal(
    findMatches({ ...DEFAULT_PREFERENCES, level: 'Intermediate' }, null)[0].id,
    'derivative-collective',
  )
})
const saved = new Map<string, string>()
Object.defineProperty(globalThis, 'localStorage', {
  value: {
    getItem: (key: string) => saved.get(key) ?? null,
    setItem: (key: string, value: string) => saved.set(key, value),
  },
  configurable: true,
})
test('persisted membership, steps, reflection and completion survive reload', () => {
  const state = {
    ...freshState(),
    accessed: true,
    joinedPodId: 'calculus-circle',
    completed: true,
    answers: ['Ready', 'Chain rule', 'Compared reasoning', 'Practice three problems'],
    checkedSteps: [0, 1, 2, 3],
    reflection: 'I asked for help.',
  }
  saved.set(STORAGE_KEY, JSON.stringify(state))
  assert.deepEqual(loadState(), state)
})
test('meeting links are deterministic, fictional and include exactly the pod roster', () => {
  const meeting = createDemoMeeting(PODS[0], 'Zoe')
  assert.deepEqual(createDemoMeeting(PODS[0], 'Zoe'), meeting)
  assert.match(meeting.code, /^[a-z]{3}-[a-z]{4}-[a-z]{3}$/)
  assert.equal(new URL(meeting.url).hostname, 'meet.sorora.example')
  assert.equal(meeting.participants.length, 5)
  assert.deepEqual(
    meeting.participants.map((member) => member.name),
    ['Maya', 'Sofia', 'Lina', 'Noor', 'Zoe'],
  )
  assert.ok(meeting.participants.every((member) => member.email.endsWith('@northbridge.example')))
  const sameName = createDemoMeeting(PODS[0], 'Maya')
  assert.equal(new Set(sameName.participants.map((member) => member.email)).size, 5)
  assert.equal(
    createDemoMeeting(PODS[0], 'Ána Silva').participants.at(-1)?.email,
    'anasilva.demo@northbridge.example',
  )
})
test('meeting generation persists and older saves migrate without losing membership', () => {
  const state = {
    ...freshState(),
    accessed: true,
    joinedPodId: 'calculus-circle',
    meetingGenerated: true,
  }
  saved.set(STORAGE_KEY, JSON.stringify(state))
  assert.deepEqual(loadState(), state)
  const old = { ...state } as Partial<typeof state>
  delete old.meetingGenerated
  saved.set(STORAGE_KEY, JSON.stringify(old))
  assert.deepEqual(loadState(), { ...state, meetingGenerated: false })
  assert.equal(freshState().meetingGenerated, false)
})
test('fresh/reset state restores Zoe and the demo defaults', () => {
  saved.set(STORAGE_KEY, JSON.stringify(freshState()))
  assert.deepEqual(loadState(), freshState())
  assert.equal(loadState().preferences.name, 'Zoe')
})
test('weekend availability is supported and never returns weekday-only matches', () => {
  assert.ok(DAYS.includes('Saturday'))
  assert.ok(DAYS.includes('Sunday'))
  for (const day of ['Saturday', 'Sunday'] as const) {
    const preferences = { ...DEFAULT_PREFERENCES, day }
    assert.deepEqual(findMatches(preferences, null), [])
    const weekendPod = { ...PODS[0], id: `weekend-${day}`, day }
    assert.equal(findMatches(preferences, null, [...PODS, weekendPod])[0].id, weekendPod.id)
  }
})
test('Saturday and Sunday preferences survive reload without losing demo state', () => {
  for (const day of ['Saturday', 'Sunday'] as const) {
    const state = { ...freshState(), accessed: true, preferences: { ...DEFAULT_PREFERENCES, day } }
    saved.set(STORAGE_KEY, JSON.stringify(state))
    assert.deepEqual(loadState(), state)
  }
})
test('invalid or malformed saved data recovers gracefully', () => {
  saved.set(STORAGE_KEY, '{bad json')
  assert.deepEqual(loadState(), freshState())
  saved.set(STORAGE_KEY, JSON.stringify({ accessed: true }))
  assert.deepEqual(loadState(), freshState())
  saved.set(STORAGE_KEY, JSON.stringify({ ...freshState(), joinedPodId: 'full-circle' }))
  assert.deepEqual(loadState(), freshState())
})
