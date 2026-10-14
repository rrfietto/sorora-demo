export const INSTITUTION = {
  id: 'northbridge',
  name: 'Northbridge University',
  shortName: 'Northbridge',
  timezone: 'Europe/Athens',
} as const
export const COURSES = [
  'Calculus I',
  'Intro to Programming',
  'Physics I',
  'Organic Chemistry',
] as const
export type Course = (typeof COURSES)[number]
export type Level = 'Beginner' | 'Intermediate'
export const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const
export type Day = (typeof DAYS)[number]
export interface Preferences {
  name: string
  course: Course
  level: Level
  day: Day
  time: string
  goal: string
}
export interface Member {
  name: string
  initials: string
  color: string
  major: string
  note: string
}
export interface Pod {
  id: string
  institutionId: string
  name: string
  course: Course
  day: Day
  time: string
  level: Level
  capacity: number
  members: Member[]
  description: string
  theme: string
  tag: string
}
const member = (name: string, color: string, major: string, note: string): Member => ({
  name,
  initials: name.slice(0, 1),
  color,
  major,
  note,
})
const maya = member(
  'Maya',
  'peach',
  'Engineering · Year 1',
  'I can help with limits. Derivatives are my next challenge!',
)
const sofia = member(
  'Sofia',
  'lavender',
  'Mathematics · Year 1',
  'Big fan of drawing a problem before solving it.',
)
const lina = member(
  'Lina',
  'sage',
  'Computer Science · Year 1',
  'Learning to ask questions, even the small ones.',
)
const noor = member(
  'Noor',
  'sand',
  'Physics · Year 1',
  'Here for steady progress and a little encouragement.',
)
const elena = member('Elena', 'rose', 'Chemistry · Year 2', 'One concept at a time. We have this.')
export const PODS: Pod[] = [
  {
    id: 'calculus-circle',
    institutionId: 'northbridge',
    name: 'Calculus Circle',
    course: 'Calculus I',
    day: 'Wednesday',
    time: '18:00',
    level: 'Beginner',
    capacity: 5,
    members: [maya, sofia, lina, noor],
    description: 'Small steps, shared breakthroughs. A friendly space to make calculus click.',
    theme: 'Making sense of derivatives',
    tag: 'A little encouragement goes a long way',
  },
  {
    id: 'derivative-collective',
    institutionId: 'northbridge',
    name: 'The Derivative Collective',
    course: 'Calculus I',
    day: 'Wednesday',
    time: '18:00',
    level: 'Intermediate',
    capacity: 5,
    members: [elena, lina, sofia],
    description: 'Turn tricky practice problems into a weekly team effort.',
    theme: 'The chain rule, together',
    tag: 'Practice makes progress',
  },
  {
    id: 'limitless',
    institutionId: 'northbridge',
    name: 'Limitless',
    course: 'Calculus I',
    day: 'Wednesday',
    time: '18:00',
    level: 'Beginner',
    capacity: 5,
    members: [noor, elena],
    description: 'Ask the small questions. Build a stronger foundation, together.',
    theme: 'From limits to derivatives',
    tag: 'No question is too small',
  },
  {
    id: 'code-companions',
    institutionId: 'northbridge',
    name: 'Code Companions',
    course: 'Intro to Programming',
    day: 'Tuesday',
    time: '17:00',
    level: 'Beginner',
    capacity: 5,
    members: [lina, maya, noor],
    description: 'Work through loops, functions, and your first little breakthroughs.',
    theme: 'Functions and friendly debugging',
    tag: 'Learning line by line',
  },
  {
    id: 'physics-friends',
    institutionId: 'northbridge',
    name: 'The Motion Club',
    course: 'Physics I',
    day: 'Thursday',
    time: '18:00',
    level: 'Beginner',
    capacity: 5,
    members: [noor, sofia, elena],
    description: 'Bring your diagrams and your questions. We’ll figure out the forces.',
    theme: 'Free-body diagrams',
    tag: 'Find your momentum',
  },
  {
    id: 'chemistry-circle',
    institutionId: 'northbridge',
    name: 'Good Chemistry',
    course: 'Organic Chemistry',
    day: 'Monday',
    time: '17:00',
    level: 'Intermediate',
    capacity: 5,
    members: [elena, maya, lina],
    description: 'A supportive weekly circle for mechanisms and molecular puzzles.',
    theme: 'Reaction mechanisms',
    tag: 'Better bonds, better study',
  },
  {
    id: 'calculus-friday',
    institutionId: 'northbridge',
    name: 'Friday Foundations',
    course: 'Calculus I',
    day: 'Friday',
    time: '16:00',
    level: 'Beginner',
    capacity: 5,
    members: [maya, noor, elena],
    description: 'End the week with clarity, confidence, and a few solved problems.',
    theme: 'Derivative fundamentals',
    tag: 'Finish the week feeling good',
  },
  {
    id: 'full-circle',
    institutionId: 'northbridge',
    name: 'Problem Solvers',
    course: 'Calculus I',
    day: 'Wednesday',
    time: '18:00',
    level: 'Beginner',
    capacity: 5,
    members: [maya, sofia, lina, noor, elena],
    description: 'A close-knit study circle for first-year calculus.',
    theme: 'Differentiation practice',
    tag: 'Every step counts',
  },
]
export const DEFAULT_PREFERENCES: Preferences = {
  name: 'Zoe',
  course: 'Calculus I',
  level: 'Beginner',
  day: 'Wednesday',
  time: '18:00',
  goal: 'Feel more confident with derivatives',
}
export function findMatches(
  preferences: Preferences,
  joinedPodId: string | null,
  pods: Pod[] = PODS,
): Pod[] {
  return pods
    .filter(
      (pod) =>
        pod.institutionId === INSTITUTION.id &&
        pod.course === preferences.course &&
        pod.day === preferences.day &&
        pod.time === preferences.time &&
        (pod.members.length < pod.capacity || pod.id === joinedPodId),
    )
    .sort((a, b) => Number(b.level === preferences.level) - Number(a.level === preferences.level))
}
export function timeDifferenceMinutes(actual: string, preferred: string): number {
  const minutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }
  return minutes(actual) - minutes(preferred)
}

// Alternatives never count as exact matches: the student must accept the new time.
export function findNearbyMatches(
  preferences: Preferences,
  joinedPodId: string | null,
  pods: Pod[] = PODS,
): Pod[] {
  if (joinedPodId || findMatches(preferences, joinedPodId, pods).length) return []
  return pods
    .filter((pod) => {
      const distance = Math.abs(timeDifferenceMinutes(pod.time, preferences.time))
      return (
        pod.institutionId === INSTITUTION.id &&
        pod.course === preferences.course &&
        pod.day === preferences.day &&
        pod.members.length < pod.capacity &&
        distance > 0 &&
        distance <= 120
      )
    })
    .sort(
      (a, b) =>
        Math.abs(timeDifferenceMinutes(a.time, preferences.time)) -
          Math.abs(timeDifferenceMinutes(b.time, preferences.time)) ||
        Number(b.level === preferences.level) - Number(a.level === preferences.level),
    )
    .slice(0, 3)
}

export function canJoin(pod: Pod, joinedPodId: string | null): boolean {
  return (
    joinedPodId === null &&
    pod.institutionId === INSTITUTION.id &&
    pod.members.length < pod.capacity
  )
}
export const AGENDA = [
  {
    title: 'Arrive & check in',
    minutes: 5,
    label: 'CONNECT',
    description:
      'Take a breath. Share how you’re arriving today, and one thing you’d like support with.',
    prompt: 'How are you feeling about this week’s material?',
    options: ['Ready to give it a go', 'A little stuck, but here', 'Excited to help someone'],
  },
  {
    title: 'Exchange questions',
    minutes: 10,
    label: 'SHARE',
    description:
      'Make space for everyone’s questions. Choose one challenge to work through as a circle.',
    prompt: 'What do you need help with this week?',
    options: [
      'Knowing when to use the chain rule',
      'Connecting graphs and derivatives',
      'Breaking a problem into smaller steps',
    ],
  },
  {
    title: 'Work it out together',
    minutes: 20,
    label: 'STUDY',
    description:
      'Try the problem on your own, compare your reasoning, then explain one step to a peer.',
    prompt: 'Try this: if f(x) = (3x² + 1)⁴, what is f′(x)?',
    options: [
      'I tried it and compared my approach',
      'I explained a step to the circle',
      'I asked for help and worked through it',
    ],
  },
  {
    title: 'Reflect & look ahead',
    minutes: 10,
    label: 'GROW',
    description:
      'Notice a small win. Set one achievable goal to bring back to the circle next week.',
    prompt: 'What will you take into next week?',
    options: [
      'Practice three chain-rule problems',
      'Ask a question earlier instead of staying stuck',
      'Explain a derivative problem to a peer',
    ],
  },
] as const
