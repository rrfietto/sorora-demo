import { useState } from 'react'
import { CheckCircle2, Copy, Link2, LockKeyhole, Mail, Video } from 'lucide-react'
import type { Pod } from './data'
import { createDemoMeeting } from './meeting'
import { useAppearance } from './appearance'
import './meeting.css'

export default function MeetingCard({
  pod,
  studentName,
  generated,
  onGenerate,
}: {
  pod: Pod
  studentName: string
  generated: boolean
  onGenerate: () => void
}) {
  const { t } = useAppearance()
  const [preview, setPreview] = useState(false)
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle')
  const meeting = createDemoMeeting(pod, studentName)
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(meeting.url)
      setCopyStatus('copied')
    } catch {
      setCopyStatus('failed')
    }
  }
  return (
    <section className="card meeting-card" aria-labelledby="meeting-title">
      <div className="meeting-heading">
        <span className="mini-icon">
          <Video size={20} />
        </span>
        <div>
          <span className="eyebrow">{t('YOUR SESSION, ONE SHARED SPACE')}</span>
          <h2 id="meeting-title">{t('A meeting link for your circle')}</h2>
        </div>
        <span className="badge lavender">{t('Fictional meeting · Demo only')}</span>
      </div>
      <p className="meeting-description">
        {t(
          'Preview a Google Meet-style room link and a member-email allowlist for this session. No real room or invitations are created.',
        )}
      </p>
      {!generated ? (
        <button className="button secondary meeting-generate" onClick={onGenerate}>
          <Link2 size={16} />
          {t('Generate demo meeting link')}
        </button>
      ) : (
        <>
          <div className="meeting-generated" role="status">
            <CheckCircle2 size={15} />
            {t('Demo link generated · Saved in this browser')}
          </div>
          <div className="meeting-link-row">
            <label className="meeting-link-field">
              <span className="sr-only">{t('Fictional meeting link')}</span>
              <input
                readOnly
                value={meeting.url}
                onFocus={(event) => event.currentTarget.select()}
              />
            </label>
            <button className="button secondary" onClick={copyLink}>
              <Copy size={15} />
              {t(copyStatus === 'copied' ? 'Copied demo link' : 'Copy demo link')}
            </button>
            <button
              className="button primary"
              onClick={() => setPreview(!preview)}
              aria-expanded={preview}
              aria-controls="meeting-preview"
            >
              {t(preview ? 'Hide meeting preview' : 'Preview meeting')}
            </button>
          </div>
          {copyStatus === 'failed' && (
            <p className="meeting-copy-message" role="status">
              {t('Clipboard unavailable. Select the link and copy it manually.')}
            </p>
          )}
          {preview && (
            <div id="meeting-preview" className="meeting-preview">
              <Video size={22} />
              <div>
                <h3>{t('Meeting preview — not a live call')}</h3>
                <p>
                  {t(
                    'This room is fictional. Previewing it stays inside Sorora; no video call starts and no data is sent to Google.',
                  )}
                </p>
                <strong>
                  {t(pod.name)} · {meeting.code}
                </strong>
              </div>
            </div>
          )}
          <details className="meeting-allowlist">
            <summary>
              <Mail size={15} />
              {t('Illustrative member allowlist · {count} emails', {
                count: meeting.participants.length,
              })}
            </summary>
            <ul>
              {meeting.participants.map((participant) => (
                <li key={participant.email}>
                  <span>{participant.name}</span>
                  <code>{participant.email}</code>
                  <span className="meeting-email-tag">{t('Fictional email')}</span>
                </li>
              ))}
            </ul>
            <p>
              {t(
                'These emails illustrate who would be allowed. They are not real addresses, no invitations are sent, and no access restrictions are enforced.',
              )}
            </p>
          </details>
        </>
      )}
      <div className="meeting-disclosure">
        <LockKeyhole size={15} />
        <p>
          {t(
            'Simulation only — not connected to Google Meet. A real integration needs Google authorization and supported host/access settings; an invitation list alone does not enforce access.',
          )}
        </p>
      </div>
    </section>
  )
}
