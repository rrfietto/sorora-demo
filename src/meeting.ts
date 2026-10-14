import type { Pod } from './data'

export interface MeetingParticipant {
  name: string
  email: string
}
export interface DemoMeeting {
  code: string
  url: string
  participants: MeetingParticipant[]
}

function fictionalEmail(name: string, suffix: string): string {
  const alias =
    name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '') || 'student'
  return `${alias}.${suffix}@northbridge.example`
}

// Reserved .example domains ensure the preview never points at a real meeting or mailbox.
export function createDemoMeeting(pod: Pod, studentName: string): DemoMeeting {
  let hash = 2166136261
  for (const character of pod.id) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619) >>> 0
  let letters = ''
  for (let index = 0; index < 10; index++) {
    hash = (Math.imul(hash, 1664525) + 1013904223) >>> 0
    letters += String.fromCharCode(97 + (hash % 26))
  }
  const code = `${letters.slice(0, 3)}-${letters.slice(3, 7)}-${letters.slice(7)}`
  return {
    code,
    url: `https://meet.sorora.example/${code}`,
    participants: [
      ...pod.members.map((member) => ({
        name: member.name,
        email: fictionalEmail(member.name, 'student'),
      })),
      {
        name: studentName.trim() || 'Zoe',
        email: fictionalEmail(studentName.trim() || 'Zoe', 'demo'),
      },
    ],
  }
}
