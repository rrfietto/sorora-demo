import { DEFAULT_PREFERENCES, PODS, COURSES, DAYS } from './data.ts'
import type { Preferences } from './data'
export interface DemoState {
  accessed: boolean
  preferences: Preferences
  joinedPodId: string | null
  completed: boolean
  answers: string[]
  reflection: string
  checkedSteps: number[]
  meetingGenerated: boolean
}
export const STORAGE_KEY = 'sorora-demo-v1'
export function freshState(): DemoState {
  return {
    accessed: false,
    preferences: { ...DEFAULT_PREFERENCES },
    joinedPodId: null,
    completed: false,
    answers: ['', '', '', ''],
    reflection: '',
    checkedSteps: [],
    meetingGenerated: false,
  }
}
export function loadState(): DemoState {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
    if (!raw || typeof raw !== 'object') return freshState()
    const saved = raw as DemoState
    if (
      typeof saved.accessed !== 'boolean' ||
      !saved.preferences ||
      typeof saved.preferences.name !== 'string' ||
      !COURSES.includes(saved.preferences.course) ||
      !['Beginner', 'Intermediate'].includes(saved.preferences.level) ||
      !DAYS.includes(saved.preferences.day) ||
      !['16:00', '17:00', '18:00', '19:00'].includes(saved.preferences.time) ||
      typeof saved.preferences.goal !== 'string' ||
      (saved.joinedPodId !== null &&
        !PODS.some((p) => p.id === saved.joinedPodId && p.members.length < p.capacity)) ||
      typeof saved.completed !== 'boolean' ||
      !Array.isArray(saved.answers) ||
      saved.answers.length !== 4 ||
      !saved.answers.every((a) => typeof a === 'string') ||
      typeof saved.reflection !== 'string' ||
      !Array.isArray(saved.checkedSteps) ||
      !saved.checkedSteps.every((s) => Number.isInteger(s) && s >= 0 && s < 4)
    )
      return freshState()
    // Older demo saves predate the meeting preview; keep their existing progress.
    return {
      ...saved,
      meetingGenerated: saved.meetingGenerated === true && saved.joinedPodId !== null,
    }
  } catch {
    return freshState()
  }
}
