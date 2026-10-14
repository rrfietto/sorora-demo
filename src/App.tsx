import { useEffect, useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  GraduationCap,
  Heart,
  LayoutDashboard,
  Leaf,
  LockKeyhole,
  MapPin,
  Moon,
  Sun,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Sprout,
  Users,
  X,
} from 'lucide-react'
import {
  AGENDA,
  COURSES,
  DAYS,
  DEFAULT_PREFERENCES,
  INSTITUTION,
  PODS,
  canJoin,
  findMatches,
  findNearbyMatches,
  timeDifferenceMinutes,
} from './data'
import { useAppearance } from './appearance'
import type { Member, Preferences, Pod } from './data'
import { freshState, loadState, STORAGE_KEY } from './store'
import type { DemoState } from './store'
import UniversityDashboard from './UniversityDashboard'
import MeetingCard from './MeetingCard'

type Route = 'welcome' | 'preferences' | 'matches' | 'pod' | 'session' | 'progress' | 'university'
const ROUTES: Route[] = [
  'welcome',
  'preferences',
  'matches',
  'pod',
  'session',
  'progress',
  'university',
]
function currentRoute(): Route {
  const hash = window.location.hash.slice(2)
  return ROUTES.includes(hash as Route) ? (hash as Route) : 'welcome'
}
function Brand({ small = false }: { small?: boolean }) {
  return (
    <span className={`brand ${small ? 'brand-small' : ''}`}>
      <span className="brand-mark">
        <Sprout size={small ? 21 : 26} strokeWidth={1.6} />
      </span>
      sorora<span className="brand-dot">.</span>
    </span>
  )
}
function Avatar({ member, size = '' }: { member: Member; size?: string }) {
  return (
    <span title={member.name} className={`avatar ${member.color} ${size}`}>
      {member.initials}
    </span>
  )
}
function Avatars({ members }: { members: Member[] }) {
  return (
    <div className="avatar-stack">
      {members.map((m) => (
        <Avatar key={m.name} member={m} />
      ))}
    </div>
  )
}
function Badge({ children, tone = '' }: { children: ReactNode; tone?: string }) {
  return <span className={`badge ${tone}`}>{children}</span>
}
function StudyIllustration() {
  const { t } = useAppearance()
  return (
    <div
      className="study-illustration"
      aria-label={t('Illustration of a shared study table, notebooks, and a growing plant')}
      role="img"
    >
      <svg viewBox="0 0 580 410" aria-hidden="true">
        <defs>
          <pattern id="grid" width="23" height="23" patternUnits="userSpaceOnUse">
            <path
              d="M 23 0 L 0 0 0 23"
              fill="none"
              stroke="#a3a0bc"
              strokeWidth=".6"
              opacity=".22"
            />
          </pattern>
        </defs>
        <rect x="0" y="0" width="580" height="410" fill="url(#grid)" />
        <ellipse cx="290" cy="258" rx="200" ry="120" fill="#e0dccf" />
        <ellipse
          cx="290"
          cy="230"
          rx="200"
          ry="120"
          fill="#eee9de"
          stroke="#d8d1c4"
          strokeWidth="2"
        />
        <g transform="translate(129 133) rotate(-16)">
          <rect width="122" height="153" rx="8" fill="#aaa5ca" />
          <path d="M16 0v153" stroke="#817ba6" strokeWidth="2" />
          <rect x="30" y="28" width="70" height="43" rx="3" fill="#f7f5ed" />
          <text x="65" y="47" textAnchor="middle" fill="#514d72" fontFamily="Georgia" fontSize="12">
            {t('small steps,')}
          </text>
          <text x="65" y="62" textAnchor="middle" fill="#514d72" fontFamily="Georgia" fontSize="12">
            {t('big ideas.')}
          </text>
        </g>
        <g transform="translate(269 168) rotate(12)">
          <rect width="155" height="104" rx="4" fill="#faf8f0" stroke="#d8d1c4" />
          <path d="M77 0v104" stroke="#d8d1c4" />
          <path
            d="M12 24h51m-51 11h43m-43 11h51m-51 11h33M91 24h49m-49 11h43"
            stroke="#bab6ac"
            strokeWidth="2"
          />
          <text x="96" y="76" fill="#696490" fontFamily="Georgia" fontSize="20">
            {t('f′(x)')}
          </text>
        </g>
        <g transform="translate(402 131)">
          <ellipse cx="20" cy="30" rx="27" ry="14" fill="#6c7861" />
          <path d="M-7 30l6 42q20 15 42 0l6-42" fill="#a2b197" />
          <ellipse cx="20" cy="30" rx="22" ry="10" fill="#454f3d" />
          <path
            d="M20 30V-34m0 26q-37-6-31-34 32-2 31 34m0-10q28-27 37-8-7 27-37 27"
            stroke="#63795c"
            strokeWidth="3"
            fill="#8ea583"
          />
        </g>
        <g transform="translate(225 298) rotate(-18)">
          <rect width="94" height="8" rx="4" fill="#c37f64" />
          <path d="M94 0l13 4-13 4" fill="#dcc4a5" />
        </g>
        <g transform="translate(99 246)">
          <circle r="24" fill="#faf6ef" stroke="#d6cdbc" strokeWidth="3" />
          <circle r="16" fill="#a4755a" />
          <path d="M23-9c27-3 27 25 0 20" fill="none" stroke="#d6cdbc" strokeWidth="7" />
        </g>
        <path
          d="M66 103l6-17m-1 29-16-6m444 179 14 7m-23 6 4 15"
          stroke="#a7a184"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <div className="illustration-note">
        <Heart size={14} />
        {t('There’s room for you here.')}
      </div>
    </div>
  )
}

export default function App() {
  const { t, language, setLanguage, theme, setTheme } = useAppearance()
  const [state, setState] = useState<DemoState>(loadState)
  const [route, setRoute] = useState<Route>(currentRoute)
  const [accessOpen, setAccessOpen] = useState(false)
  const [resetOpen, setResetOpen] = useState(false)
  const [suggestedPod, setSuggestedPod] = useState<Pod | null>(null)
  const [notice, setNotice] = useState('')
  const [storageError, setStorageError] = useState(false)
  const headingRef = useRef<HTMLDivElement>(null)
  const pod = PODS.find((p) => p.id === state.joinedPodId)
  const student: Member = {
    name: state.preferences.name.trim() || 'Zoe',
    initials: (state.preferences.name.trim() || 'Zoe').slice(0, 1),
    color: 'indigo',
    major: 'Your study circle',
    note: state.preferences.goal,
  }
  const navigate = (next: Route) => {
    window.location.hash = `/${next}`
    setRoute(next)
    setSuggestedPod(null)
    setNotice('')
  }
  const update = (patch: Partial<DemoState>) => setState((s) => ({ ...s, ...patch }))
  useEffect(() => {
    const listener = () => setRoute(currentRoute())
    window.addEventListener('hashchange', listener)
    return () => window.removeEventListener('hashchange', listener)
  }, [])
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
      setStorageError(false)
    } catch {
      setStorageError(true)
    }
  }, [state])
  useEffect(() => {
    if (route !== 'welcome' && route !== 'university' && !state.accessed) navigate('welcome')
    else if (['pod', 'session'].includes(route) && !pod) navigate('preferences')
    headingRef.current?.focus({ preventScroll: true })
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [route, state.accessed, pod])
  useEffect(() => {
    if (!accessOpen && !resetOpen && !suggestedPod) return
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAccessOpen(false)
        setResetOpen(false)
        setSuggestedPod(null)
      }
    }
    window.addEventListener('keydown', listener)
    return () => window.removeEventListener('keydown', listener)
  }, [accessOpen, resetOpen, suggestedPod])
  const join = (candidate: Pod, acceptSuggestedTime = false) => {
    if (state.joinedPodId === candidate.id) {
      navigate('pod')
      return
    }
    const exact = findMatches(state.preferences, state.joinedPodId).some(
      (p) => p.id === candidate.id,
    )
    const nearby = findNearbyMatches(state.preferences, state.joinedPodId).some(
      (p) => p.id === candidate.id,
    )
    if (!canJoin(candidate, state.joinedPodId) || (!exact && !nearby)) {
      setNotice(
        'You already have a circle, or this pod is no longer available. Visit your pod to continue.',
      )
      return
    }
    if (nearby && !acceptSuggestedTime) {
      setSuggestedPod(candidate)
      return
    }
    update({
      joinedPodId: candidate.id,
      preferences: nearby ? { ...state.preferences, time: candidate.time } : state.preferences,
    })
    navigate('pod')
  }
  const reset = () => {
    setState(freshState())
    setResetOpen(false)
    navigate('welcome')
  }
  const isWelcome = route === 'welcome'
  const studentDestination: Route = state.accessed ? (pod ? 'pod' : 'preferences') : 'welcome'
  return (
    <div className={`app ${isWelcome ? 'welcome-app' : ''}`}>
      <div className="demo-bar">
        <span>
          <span className="live-dot" />
          {t('A little preview of a bigger possibility')}{' '}
          <span className="demo-bar-extra">{t('· Fictional university & students')}</span>
        </span>
        <div className="demo-actions">
          <div className="appearance-controls">
            <label>
              <span className="sr-only">{t('Language')}</span>
              <select
                className="language-control"
                value={language}
                onChange={(event) => setLanguage(event.target.value as 'en' | 'pt-BR')}
                title={t('Language')}
              >
                <option value="en" aria-label={t('English')}>
                  EN
                </option>
                <option value="pt-BR" aria-label={t('Português (Brasil)')}>
                  PT-BR
                </option>
              </select>
            </label>
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              aria-label={t(theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme')}
              title={t(theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme')}
            >
              {theme === 'light' ? (
                <Moon size={16} aria-hidden="true" />
              ) : (
                <Sun size={16} aria-hidden="true" />
              )}
            </button>
          </div>
          <div className="view-switch" aria-label={t('Demo view')}>
            <button
              className={route !== 'university' ? 'selected' : ''}
              onClick={() => navigate(studentDestination)}
            >
              {t('Student view')}
            </button>
            <button
              className={route === 'university' ? 'selected' : ''}
              onClick={() => navigate('university')}
            >
              {t('University view')}
            </button>
          </div>
          <button
            className="reset-button"
            aria-label={t('Reset demo')}
            onClick={() => setResetOpen(true)}
          >
            <RotateCcw size={13} />
            <span>{t('Reset demo')}</span>
          </button>
        </div>
      </div>
      {isWelcome ? (
        <header className="landing-header">
          <button
            className="brand-button"
            onClick={() => navigate('welcome')}
            aria-label={t('Sorora home')}
          >
            <Brand />
          </button>
          <span className="landing-tagline">{t('Grow together.')}</span>
          <div className="landing-header-right">
            <span>{t('For women in STEM')}</span>
            <button className="text-button" onClick={() => navigate('university')}>
              {t('For universities')} <ArrowUpRight size={15} />
            </button>
          </div>
        </header>
      ) : (
        <>
          <aside className="sidebar">
            <button
              className="brand-button"
              onClick={() => navigate('welcome')}
              aria-label={t('Sorora home')}
            >
              <Brand />
            </button>
            <div className="institution-label">
              <span className="institution-icon">
                <GraduationCap size={20} />
              </span>
              <div>
                <strong>{t('Northbridge')}</strong>
                <small>{t('University demo program')}</small>
              </div>
            </div>
            <div className="nav-label">
              {route === 'university' ? t('YOUR PROGRAM') : t('YOUR SPACE')}
            </div>
            <nav>
              {route === 'university' ? (
                <button className="nav-item active" onClick={() => navigate('university')}>
                  <LayoutDashboard size={18} />
                  {t('Program overview')}
                </button>
              ) : (
                <>
                  <button
                    className={`nav-item ${['preferences', 'matches'].includes(route) ? 'active' : ''}`}
                    onClick={() => navigate('preferences')}
                  >
                    <Sparkles size={18} />
                    {t('Find a study pod')}
                  </button>
                  <button
                    className={`nav-item ${['pod', 'session'].includes(route) ? 'active' : ''}`}
                    onClick={() => {
                      if (pod) navigate('pod')
                      else {
                        navigate('preferences')
                        setNotice('Find and join a circle to open your community.')
                      }
                    }}
                  >
                    <Users size={18} />
                    {t('My study pod')}
                    {pod && <span className="nav-dot" />}
                  </button>
                  <button
                    className={`nav-item ${route === 'progress' ? 'active' : ''}`}
                    onClick={() => navigate('progress')}
                  >
                    <Sprout size={18} />
                    {t('My progress')}
                  </button>
                </>
              )}
            </nav>
            <div className="sidebar-bottom">
              <div className="sidebar-quote">
                <Leaf size={22} />
                <p>
                  {t('Good things grow')}
                  <br />
                  {t('in good company.')}
                </p>
                <small>{t('One circle. One step at a time.')}</small>
              </div>
              <div className="sidebar-profile">
                {route === 'university' ? (
                  <span
                    className="university-avatar avatar"
                    role="img"
                    aria-label={t('University program')}
                  >
                    <GraduationCap size={22} aria-hidden="true" />
                  </span>
                ) : (
                  <Avatar member={student} />
                )}
                <div>
                  <strong>{route === 'university' ? t('Program showcase') : student.name}</strong>
                  <small>
                    {route === 'university'
                      ? t('Read-only · Sample data')
                      : t('Sponsored student access')}
                  </small>
                </div>
              </div>
            </div>
          </aside>
          <header className="workspace-header">
            <div className="mobile-brand">
              <Brand small />
            </div>
            <span className="workspace-breadcrumb">
              {route === 'university'
                ? t('University program')
                : t('Your university, your community.')}
            </span>
            <Badge tone="sage">
              <ShieldCheck size={13} />
              {t('University sponsored')}
            </Badge>
          </header>
          <nav className="mobile-nav">
            {route !== 'university' && (
              <>
                <button onClick={() => navigate('preferences')}>{t('Find a pod')}</button>
                <button onClick={() => navigate(pod ? 'pod' : 'preferences')}>{t('My pod')}</button>
                <button onClick={() => navigate('progress')}>{t('Progress')}</button>
              </>
            )}
          </nav>
        </>
      )}
      <main
        className={isWelcome ? 'landing-main' : 'workspace-main'}
        ref={headingRef}
        tabIndex={-1}
      >
        {storageError && (
          <div className="notice">
            {t(
              'Browser storage is unavailable. Your demo works, but changes won’t survive a reload.',
            )}
          </div>
        )}
        {notice && (
          <div className="notice" role="status">
            {t(notice)}
          </div>
        )}
        {route === 'welcome' && (
          <Landing
            onAccess={() => setAccessOpen(true)}
            onUniversity={() => navigate('university')}
          />
        )}
        {route === 'preferences' && (
          <PreferencesPage
            preferences={state.preferences}
            hasPod={!!pod}
            onSubmit={(preferences) => {
              update({ preferences })
              navigate('matches')
            }}
          />
        )}
        {route === 'matches' && (
          <MatchesPage
            state={state}
            onJoin={join}
            onEdit={() => navigate('preferences')}
            onPod={() => navigate('pod')}
          />
        )}
        {route === 'pod' && pod && (
          <PodPage
            pod={pod}
            student={student}
            completed={state.completed}
            onStart={() => navigate(state.completed ? 'progress' : 'session')}
          />
        )}
        {route === 'session' && pod && (
          <SessionPage
            state={state}
            pod={pod}
            onUpdate={update}
            onBack={() => navigate('pod')}
            onFinish={() => {
              if (state.checkedSteps.length === 4 && state.answers.every(Boolean)) {
                update({ completed: true })
                navigate('progress')
              }
            }}
          />
        )}
        {route === 'progress' && (
          <ProgressPage
            state={state}
            pod={pod}
            onPod={() => navigate(pod ? 'pod' : 'preferences')}
            onStart={() => navigate('session')}
          />
        )}
        {route === 'university' && <UniversityDashboard />}
      </main>
      {!isWelcome && (
        <footer className="workspace-footer">
          <span>{t('Sorora · Grow together.')}</span>
          <span>{t('Frontend demo · All people and programs are fictional')}</span>
        </footer>
      )}
      {accessOpen && (
        <Modal title={t('Your university, your community.')} onClose={() => setAccessOpen(false)}>
          <span className="eyebrow">{t('INSTITUTION-SPONSORED ACCESS')}</span>
          <h2 id="modal-title">{t('You’re in good company.')}</h2>
          <p>
            {t(
              'Enter your university’s sponsored study community. No personal registration. No student payment.',
            )}
          </p>
          <label className="field">
            {t('Participating institution')}
            <select defaultValue="northbridge">
              <option value="northbridge">{t('Northbridge University — Demo program')}</option>
            </select>
          </label>
          <div className="access-institution">
            <GraduationCap size={26} />
            <div>
              <strong>{t('Your place is sponsored.')}</strong>
              <span>{t('Fictional Women in STEM peer-support program')}</span>
            </div>
          </div>
          <button
            autoFocus
            className="button primary full"
            onClick={() => {
              update({ accessed: true })
              setAccessOpen(false)
              navigate(pod ? 'pod' : 'preferences')
            }}
          >
            {t('Continue with Northbridge (Demo)')} <ArrowRight size={17} />
          </button>
          <div className="simulation-note">
            <LockKeyhole size={15} />
            <span>
              {t(
                'Demo access — institution verification simulated. No real authentication, gender, or eligibility checks.',
              )}
            </span>
          </div>
        </Modal>
      )}
      {suggestedPod && (
        <Modal title={t('Confirm alternative time')} onClose={() => setSuggestedPod(null)}>
          <span className="eyebrow">{t('DOES THIS TIME WORK FOR YOU?')}</span>
          <h2>{t('A nearby time, your choice.')}</h2>
          <p>
            {t(
              'You requested {day} at {preferred}. {name} meets at {actual} on the same day ({timezone}). Joining updates your preferred time; the pod schedule does not change.',
              {
                day: t(state.preferences.day),
                preferred: state.preferences.time,
                name: t(suggestedPod.name),
                actual: suggestedPod.time,
                timezone: INSTITUTION.timezone,
              },
            )}
          </p>
          <div className="button-row">
            <button autoFocus className="button secondary" onClick={() => setSuggestedPod(null)}>
              {t('Keep my preferred time')}
            </button>
            <button className="button primary" onClick={() => join(suggestedPod, true)}>
              {t('Accept time and join')} <Check size={16} />
            </button>
          </div>
        </Modal>
      )}
      {resetOpen && (
        <Modal title={t('Reset demo')} onClose={() => setResetOpen(false)}>
          <span className="eyebrow">{t('A FRESH START')}</span>
          <h2 id="modal-title">{t('Ready for another take?')}</h2>
          <p>
            {t(
              'This resets Zoe’s preferences, pod membership, and session progress in this browser. The sample university dashboard stays the same.',
            )}
          </p>
          <div className="button-row">
            <button autoFocus className="button secondary" onClick={() => setResetOpen(false)}>
              {t('Keep exploring')}
            </button>
            <button className="button primary" onClick={reset}>
              <RotateCcw size={16} />
              {t('Reset demo')}
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

function Modal({
  children,
  onClose,
  title,
}: {
  children: ReactNode
  onClose: () => void
  title: string
}) {
  const { t } = useAppearance()
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    const trap = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return
      const items = ref.current?.querySelectorAll<HTMLElement>(
        'button, select, input, textarea, [tabindex="0"]',
      )
      if (!items?.length) return
      const first = items[0],
        last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', trap)
    return () => {
      document.removeEventListener('keydown', trap)
      previous?.focus()
    }
  }, [])
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        ref={ref}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close icon-button"
          onClick={onClose}
          aria-label={t('Close dialog')}
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  )
}
function Landing({ onAccess, onUniversity }: { onAccess: () => void; onUniversity: () => void }) {
  const { t } = useAppearance()
  return (
    <>
      <section className="landing-hero">
        <div className="hero-copy">
          <Badge tone="sage">
            <GraduationCap size={15} />
            {t('Your place, sponsored by your university')}
          </Badge>
          <h1>
            {t('Study together.')}
            <br />
            <span>{t('Belong together.')}</span>
          </h1>
          <p className="hero-description">
            {t('A study community for women in STEM,')}
            <br className="desktop-break" />
            {t('made accessible through your university.')}
          </p>
          <p className="hero-detail">
            {t(
              'Find your people in a small study pod. Work through the tough bits, build confidence, and grow together — week after week.',
            )}
          </p>
          <button className="button primary hero-cta" onClick={onAccess}>
            {t('Find my study pod')} <ArrowRight size={18} />
          </button>
          <div className="hero-assurance">
            <ShieldCheck size={14} />
            {t('Access provided by participating universities')}
          </div>
          <div className="hero-social">
            <Avatars members={PODS[0].members} />
            <div>
              <strong>{t('Small circles. Real connection.')}</strong>
              <small>{t('4–5 peers · One shared subject · A weekly rhythm')}</small>
            </div>
          </div>
        </div>
        <div className="hero-art">
          <div className="art-eyebrow">
            <span className="tiny-star">✳</span>
            {t('A SPACE TO FIGURE IT OUT, TOGETHER')}
          </div>
          <StudyIllustration />
          <div className="floating-pod">
            <div className="floating-pod-top">
              <span className="mini-icon">
                <BookOpen size={18} />
              </span>
              <Badge tone="sage">{t('Your kind of circle')}</Badge>
            </div>
            <h3>{t('Calculus Circle')}</h3>
            <p>{t('Different perspectives. Shared breakthroughs.')}</p>
            <div className="floating-pod-bottom">
              <Avatars members={PODS[0].members} />
              <span>
                {t('One seat for you')} <ArrowUpRight size={14} />
              </span>
            </div>
          </div>
          <div className="art-caption">
            <span>01 /</span>
            {t('You don’t have to do STEM alone.')}
          </div>
        </div>
      </section>
      <section className="landing-principles">
        <div className="principle-intro">
          <span className="eyebrow">
            {t('A LITTLE STRUCTURE.')}
            <br />
            {t('A LOT OF SUPPORT.')}
          </span>
        </div>
        <div className="principle">
          <span className="principle-number">01</span>
          <div>
            <h3>{t('Find your circle')}</h3>
            <p>
              {t('Your course, your availability.')}
              <br />
              {t('Peers facing the same challenges.')}
            </p>
          </div>
        </div>
        <div className="principle">
          <span className="principle-number">02</span>
          <div>
            <h3>{t('Make room for progress')}</h3>
            <p>
              {t('A guided weekly session.')}
              <br />
              {t('Small goals you can actually reach.')}
            </p>
          </div>
        </div>
        <div className="principle">
          <span className="principle-number">03</span>
          <div>
            <h3>{t('Grow a sense of belonging')}</h3>
            <p>
              {t('Show up for yourself.')}
              <br />
              {t('Find people who show up for you.')}
            </p>
          </div>
        </div>
      </section>
      <footer className="landing-footer">
        <span>
          <span className="live-dot" />
          {t('Northbridge University · Fictional partner program')}
        </span>
        <button className="text-button" onClick={onUniversity}>
          {t('See the university perspective')} <ArrowUpRight size={14} />
        </button>
        <span>{t('Demo only · No real verification')}</span>
      </footer>
    </>
  )
}
function PageHeading({
  eyebrow,
  title,
  description,
  aside,
}: {
  eyebrow: string
  title: string
  description: string
  aside?: ReactNode
}) {
  return (
    <div className="page-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {aside}
    </div>
  )
}
function PreferencesPage({
  preferences,
  onSubmit,
  hasPod,
}: {
  preferences: Preferences
  onSubmit: (p: Preferences) => void
  hasPod: boolean
}) {
  const { t } = useAppearance()
  const [form, setForm] = useState(preferences)
  const goalIsSeeded = form.goal === DEFAULT_PREFERENCES.goal
  const field = <K extends keyof Preferences>(key: K, value: Preferences[K]) =>
    setForm((f) => ({ ...f, [key]: value }))
  const submit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...form,
      name: form.name.trim() || 'Zoe',
      goal: form.goal.trim(),
    })
  }
  return (
    <>
      <PageHeading
        eyebrow={t('YOUR CIRCLE STARTS HERE')}
        title={t('Let’s find your people, {name}.', { name: preferences.name })}
        description={t('A shared subject. A time that works. A small circle to grow with.')}
      />
      <div className="onboarding-layout">
        <form className="card preferences-card" onSubmit={submit}>
          <div className="form-top">
            <span className="mini-icon">
              <Sparkles size={20} />
            </span>
            <div>
              <h2>{t('A little about your study rhythm')}</h2>
              <p>{t('We’ll match you with available pods at your university.')}</p>
            </div>
            <span className="step-pill">01 / 01</span>
          </div>
          <div className="institution-strip">
            <GraduationCap size={19} />
            <strong>{t('Northbridge University')}</strong>
            <Badge tone="sage">{t('Demo program')}</Badge>
          </div>
          <div className="form-grid">
            <label className="field">
              {t('First name')}
              <input
                value={form.name}
                required
                maxLength={24}
                onChange={(e) => field('name', e.target.value)}
                autoComplete="off"
              />
            </label>
            <label className="field">
              {t('Your subject')}
              <select
                value={form.course}
                onChange={(e) => field('course', e.target.value as Preferences['course'])}
              >
                {COURSES.map((c) => (
                  <option key={c} value={c}>
                    {t(c)}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              {t('Where are you starting?')}
              <select
                value={form.level}
                onChange={(e) => field('level', e.target.value as Preferences['level'])}
              >
                <option value="Beginner">{t('Beginner')}</option>
                <option value="Intermediate">{t('Intermediate')}</option>
              </select>
            </label>
            <div className="level-hint">
              <Heart size={16} />
              <span>
                {t('There’s no “behind” here.')}
                <br />
                {t('Just your next step.')}
              </span>
            </div>
            <label className="field">
              {t('Preferred day')}
              <select
                value={form.day}
                onChange={(e) => field('day', e.target.value as Preferences['day'])}
              >
                {DAYS.map((d) => (
                  <option key={d} value={d}>
                    {t(d)}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              {t('Preferred time')}
              <select value={form.time} onChange={(e) => field('time', e.target.value)}>
                {['16:00', '17:00', '18:00', '19:00'].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="timezone">
            <Clock3 size={13} />
            {t('All pod times in {timezone}', {
              timezone: INSTITUTION.timezone,
            })}
          </div>
          <label className="field goal-field">
            {t('One thing you’d like to work on')} <span>{t('(optional)')}</span>
            <input
              value={goalIsSeeded ? t(form.goal) : form.goal}
              maxLength={120}
              placeholder={t('e.g. Feel more confident with derivatives')}
              onChange={(e) => field('goal', e.target.value)}
            />
          </label>
          <div className="form-bottom">
            <span>
              <LockKeyhole size={14} />
              {t('Saved only in this browser')}
            </span>
            <button type="submit" className="button primary">
              {t('Find a group')} <ArrowRight size={17} />
            </button>
          </div>
          {hasPod && (
            <p className="subtle-note">
              {t('You’ve already joined a pod. Browsing won’t change your membership.')}
            </p>
          )}
        </form>
        <aside className="onboarding-aside">
          <div className="small-flower">✳</div>
          <h2>
            {t('Not another group.')}
            <br />
            <em>{t('Your group.')}</em>
          </h2>
          <p>{t('We look for the things that make showing up easier.')}</p>
          <ul>
            <li>
              <CheckCircle2 size={17} />
              <div>
                <strong>{t('The same subject')}</strong>
                <span>{t('Start with something in common.')}</span>
              </div>
            </li>
            <li>
              <CheckCircle2 size={17} />
              <div>
                <strong>{t('A compatible schedule')}</strong>
                <span>{t('Build a rhythm you can keep.')}</span>
              </div>
            </li>
            <li>
              <CheckCircle2 size={17} />
              <div>
                <strong>{t('Room at the table')}</strong>
                <span>{t('Small pods, with a seat for you.')}</span>
              </div>
            </li>
          </ul>
          <div className="aside-note">
            <ShieldCheck size={17} />
            <span>
              {t(
                'Institution verification is simulated. No gender or eligibility checks are performed.',
              )}
            </span>
          </div>
        </aside>
      </div>
    </>
  )
}
function MatchesPage({
  state,
  onJoin,
  onEdit,
  onPod,
}: {
  state: DemoState
  onJoin: (pod: Pod) => void
  onEdit: () => void
  onPod: () => void
}) {
  const { t } = useAppearance()
  const exactMatches = findMatches(state.preferences, state.joinedPodId)
  const nearby = findNearbyMatches(state.preferences, state.joinedPodId)
  const alternatives = exactMatches.length === 0 && nearby.length > 0
  const matches = alternatives ? nearby : exactMatches
  return (
    <>
      <PageHeading
        eyebrow={t('GOOD COMPANY, GOOD POSSIBILITIES')}
        title={
          alternatives
            ? t('No exact match, but a few nearby possibilities.')
            : matches.length
              ? t('Your next chapter starts with a circle.')
              : t('Your circle is still taking shape.')
        }
        description={
          alternatives
            ? t(
                'These pods meet on your preferred day, up to two hours earlier or later. Choose a time only if it works for you.',
              )
            : matches.length
              ? t(
                  '{count} compatible study pods. A shared starting point, not a one-size-fits-all match.',
                  { count: matches.length },
                )
              : t(
                  'No available pods match this exact course and time. Let’s try a different study rhythm.',
                )
        }
        aside={
          <button className="button secondary" onClick={onEdit}>
            {t('Edit preferences')} <ArrowLeft size={15} />
          </button>
        }
      />
      <div className="match-filter-bar">
        <span>
          <BookOpen size={16} />
          {t(state.preferences.course)}
        </span>
        <span>
          <CalendarDays size={16} />
          {t(state.preferences.day)}
        </span>
        <span>
          <Clock3 size={16} />
          {state.preferences.time} · {INSTITUTION.timezone}
        </span>
        <span>
          <GraduationCap size={16} />
          {t('Northbridge')}
        </span>
      </div>
      {state.joinedPodId && (
        <div className="notice">
          {t('You already belong to a circle.')}{' '}
          <button className="inline-link" onClick={onPod}>
            {t('Visit my pod')} <ArrowRight size={14} />
          </button>
        </div>
      )}
      {matches.length ? (
        <>
          <div className="results-heading">
            <h2>
              {t(alternatives ? 'Same subject, nearby times' : 'A few places you could belong')}
            </h2>
            <span>
              {t(
                alternatives
                  ? 'Alternative times · Not exact matches'
                  : 'Matching on course, schedule & available seats',
              )}
            </span>
          </div>
          <div className="match-grid">
            {matches.map((p, i) => {
              const joined = state.joinedPodId === p.id
              const difference = timeDifferenceMinutes(p.time, state.preferences.time)
              const members = joined
                ? [
                    ...p.members,
                    {
                      name: state.preferences.name,
                      initials: state.preferences.name[0],
                      color: 'indigo',
                      major: '',
                      note: '',
                    },
                  ]
                : p.members
              return (
                <article className={`card match-card ${i === 0 ? 'recommended' : ''}`} key={p.id}>
                  {i === 0 && (
                    <div className="recommended-label">
                      <Sparkles size={13} />{' '}
                      {alternatives
                        ? t('NEARBY TIME')
                        : p.level === state.preferences.level
                          ? t('YOUR CLOSEST FIT')
                          : t('A COMPATIBLE CIRCLE')}
                    </div>
                  )}
                  <div className="match-card-body">
                    <div className={`pod-symbol symbol-${i}`}>
                      <BookOpen size={25} strokeWidth={1.5} />
                    </div>
                    <Badge>{t(p.level)}</Badge>
                    <h2>{t(p.name)}</h2>
                    <p className="match-description">{t(p.description)}</p>
                    <div className="match-schedule">
                      <CalendarDays size={15} />
                      {t(p.day)} <span>·</span> {p.time}
                    </div>
                    <div className="match-members">
                      <Avatars members={members} />
                      <span>
                        <strong>
                          {members.length}/{p.capacity}
                        </strong>{' '}
                        {t('members')}
                        <br />
                        <small>
                          {joined
                            ? t('You’re in this circle')
                            : t(
                                p.capacity - members.length === 1
                                  ? '{count} seat open'
                                  : '{count} seats open',
                                { count: p.capacity - members.length },
                              )}
                        </small>
                      </span>
                    </div>
                    <div className="match-reasons">
                      <span className="eyebrow">{t('WHY THIS WORKS FOR YOU')}</span>
                      <span>
                        <Check size={14} />
                        {t('Your course: {course}', { course: t(p.course) })}
                      </span>
                      <span>
                        <Check size={14} />
                        {alternatives
                          ? t('Same preferred day')
                          : t('Fits your {day} rhythm', {
                              day: t(p.day).toLowerCase(),
                            })}
                      </span>
                      <span>
                        <Check size={14} />{' '}
                        {p.level === state.preferences.level
                          ? t('A shared starting level')
                          : t('A different level, a shared subject')}
                      </span>
                      {alternatives && (
                        <span className="nearby-time-note">
                          <Clock3 size={14} />
                          {t('Suggested time: {time} · {difference}', {
                            time: p.time,
                            difference: t(
                              difference < 0 ? '{count} min earlier' : '{count} min later',
                              { count: Math.abs(difference) },
                            ),
                          })}
                        </span>
                      )}
                    </div>
                    <button
                      className={`button full ${i === 0 ? 'primary' : 'secondary'}`}
                      disabled={!!state.joinedPodId && !joined}
                      onClick={() => onJoin(p)}
                    >
                      {joined
                        ? t('Open my pod')
                        : state.joinedPodId
                          ? t('Already in another pod')
                          : t(alternatives ? 'Choose this time' : 'Join pod')}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
          <div className="matching-footnote">
            <ShieldCheck size={16} />
            <p>
              {t(
                alternatives
                  ? 'Nearby suggestions keep your university, course, preferred day, and available seats. Times differ by up to two hours; you must accept the new time before joining.'
                  : 'Thoughtful matches, not magic. We only show pods at your university with the same course, exact day and time, and an open seat. Level helps order your options.',
              )}
            </p>
          </div>
        </>
      ) : (
        <div className="card empty-state">
          <span className="empty-symbol">
            <Sprout size={38} strokeWidth={1.3} />
          </span>
          <h2>{t('No match doesn’t mean no place for you.')}</h2>
          <p>
            {t('Try Calculus I on Wednesday at 18:00 to explore the seeded circles.')}
            <br />
            {t('We won’t suggest a full pod or a time that doesn’t work for you.')}
          </p>
          <button className="button primary" onClick={onEdit}>
            {t('Change availability')} <ArrowRight size={17} />
          </button>
        </div>
      )}
    </>
  )
}
function PodPage({
  pod,
  student,
  completed,
  onStart,
}: {
  pod: Pod
  student: Member
  completed: boolean
  onStart: () => void
}) {
  const { t } = useAppearance()
  const members = [...pod.members, student]
  return (
    <>
      <PageHeading
        eyebrow={t('YOUR SMALL CORNER OF CAMPUS')}
        title={t(pod.name)}
        description={t(
          'A recurring space to study, share, and grow. You’re part of the circle now.',
        )}
        aside={
          <Badge tone="sage">
            <Check size={14} />
            {t('You’re a member · {count}/{capacity}', {
              count: members.length,
              capacity: pod.capacity,
            })}
          </Badge>
        }
      />
      <div className="pod-meta">
        <span>
          <BookOpen size={15} />
          {t(pod.course)}
        </span>
        <span>
          <CalendarDays size={15} />
          {t('{day}s · {time}', { day: t(pod.day), time: pod.time })}
        </span>
        <span>
          <MapPin size={15} />
          {INSTITUTION.timezone}
        </span>
        <span>{t('Northbridge University')}</span>
      </div>
      <div className="pod-layout">
        <div className="pod-main">
          <section className="welcome-note">
            <div className="note-star">✳</div>
            <div>
              <span className="eyebrow">{t('A NOTE FOR YOUR FIRST DAY')}</span>
              <h2>{t('Welcome to the circle, {name}.', { name: student.name })}</h2>
              <p>
                {t(
                  'You don’t need to have every answer. Bring your questions, your perspective, and yourself. We’ll work through the rest together.',
                )}
              </p>
            </div>
            <Heart className="welcome-heart" size={29} strokeWidth={1.2} />
          </section>
          <section className="card next-session">
            <div className="section-topline">
              <span className="eyebrow">
                {completed ? t('KEEP YOUR RHYTHM') : t('YOUR NEXT STUDY SESSION')}
              </span>
              <Badge>{completed ? t('Next week') : t('45 minutes · Guided')}</Badge>
            </div>
            <h2>{t(pod.theme)}</h2>
            <p>{t('One shared challenge. A little structure. Plenty of space for questions.')}</p>
            <div className="session-schedule">
              <div className="date-tile">
                <CalendarDays size={24} />
              </div>
              <div>
                <strong>{t('{day} at {time}', { day: t(pod.day), time: pod.time })}</strong>
                <span>
                  {t('Weekly · {timezone} · Demo session', {
                    timezone: INSTITUTION.timezone,
                  })}
                </span>
              </div>
              <Avatars members={members} />
            </div>
            <div className="agenda-preview">
              {AGENDA.map((a, i) => (
                <div key={a.title}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <strong>
                    {t(['Check in', 'Share questions', 'Study together', 'Reflect & grow'][i])}
                  </strong>
                  <small>{t('{count} min', { count: a.minutes })}</small>
                </div>
              ))}
            </div>
            <div className="session-bottom">
              <span>
                <Leaf size={15} />
                {completed
                  ? t('A small win, a stronger connection.')
                  : t('Show up as you are. Learn as a circle.')}
              </span>
              <button className="button primary" onClick={onStart}>
                {completed ? t('View my progress') : t('Start guided session')}
                <ArrowRight size={17} />
              </button>
            </div>
          </section>
          <section className="connection-section">
            <div className="section-topline">
              <h2>{t('A little connection goes a long way.')}</h2>
              <span className="fictional-label">{t('Fictional peer notes')}</span>
            </div>
            <div className="connection-grid">
              <div className="connection-card">
                <span className="mini-icon peach">
                  <Heart size={17} />
                </span>
                <h3>{t('What do you need help with this week?')}</h3>
                <p>
                  {t('“I know the rules, but I get stuck choosing which one to use. Anyone else?”')}
                </p>
                <span className="note-author">
                  <Avatar member={pod.members[0]} size="tiny" />
                  {t('{name} · Sample prompt response', {
                    name: pod.members[0].name,
                  })}
                </span>
              </div>
              <div className="connection-card">
                <span className="mini-icon sage">
                  <Sprout size={18} />
                </span>
                <h3>{t('What can you help someone with?')}</h3>
                <p>
                  {t(
                    '“Happy to walk through an example slowly. Explaining it helps me learn too.”',
                  )}
                </p>
                <span className="note-author">
                  <Avatar member={pod.members[1]} size="tiny" />
                  {t('{name} · Sample prompt response', {
                    name: pod.members[1].name,
                  })}
                </span>
              </div>
            </div>
          </section>
        </div>
        <aside className="pod-aside">
          <section className="card members-card">
            <div className="section-topline">
              <h2>{t('Your people')}</h2>
              <span>
                {members.length}/{pod.capacity}
              </span>
            </div>
            <p className="subtle-note">{t('Different perspectives. Same team.')}</p>
            <div className="members-list">
              {members.map((m) => (
                <div className="member-row" key={m.name}>
                  <Avatar member={m} />
                  <div>
                    <strong>
                      {m.name} {m === student && <span className="you-label">{t('you')}</span>}
                    </strong>
                    <small>{t(m.major)}</small>
                  </div>
                </div>
              ))}
            </div>
            <div className="members-footnote">
              <ShieldCheck size={14} />
              {t('Fictional demo community')}
            </div>
          </section>
          <section className="goal-card">
            <span className="eyebrow">{t('YOUR SMALL, MEANINGFUL GOAL')}</span>
            <Sprout size={26} strokeWidth={1.3} />
            <h3>
              {student.note === DEFAULT_PREFERENCES.goal
                ? t(student.note)
                : student.note || t('Make progress, one question at a time.')}
            </h3>
            <p>
              {t('No need to do it all today.')}
              <br />
              {t('Just take your next step.')}
            </p>
            <div className="goal-progress">
              <CheckCircle2 size={17} />
              <strong>
                {completed ? t('1 session completed') : t('Your first session awaits')}
              </strong>
            </div>
          </section>
        </aside>
      </div>
    </>
  )
}
function SessionPage({
  state,
  pod,
  onUpdate,
  onBack,
  onFinish,
}: {
  state: DemoState
  pod: Pod
  onUpdate: (p: Partial<DemoState>) => void
  onBack: () => void
  onFinish: () => void
}) {
  const { t } = useAppearance()
  const [active, setActive] = useState(() => Math.min(state.checkedSteps.length, 3))
  const [showSolution, setShowSolution] = useState(false)
  const step = AGENDA[active]
  const answer = state.answers[active]
  const isCalculus = pod.course === 'Calculus I'
  const setAnswer = (value: string) => {
    const answers = [...state.answers]
    answers[active] = value
    onUpdate({ answers })
  }
  const complete = () => {
    if (!answer) return
    onUpdate({ checkedSteps: [...new Set([...state.checkedSteps, active])] })
    if (active < 3) {
      setActive(active + 1)
      setShowSolution(false)
    }
  }
  const allDone = state.checkedSteps.length === 4 && state.answers.every(Boolean)
  return (
    <>
      <button className="text-button back-link" onClick={onBack}>
        <ArrowLeft size={15} />
        {t('Back to {name}', { name: t(pod.name) })}
      </button>
      <PageHeading
        eyebrow={t('MAKE PROGRESS TOGETHER')}
        title={t('A little structure. A shared breakthrough.')}
        description={t('{name} · {course} · A 45-minute guided study session', {
          name: t(pod.name),
          course: t(pod.course),
        })}
        aside={
          <Badge tone="sage">
            <Clock3 size={14} />
            {t('Self-paced demo')}
          </Badge>
        }
      />
      <MeetingCard
        pod={pod}
        studentName={state.preferences.name}
        generated={state.meetingGenerated}
        onGenerate={() => onUpdate({ meetingGenerated: true })}
      />
      <div className="session-layout">
        <aside className="card session-agenda">
          <div className="section-topline">
            <h2>{t('Today’s rhythm')}</h2>
            <span>{t('45 min')}</span>
          </div>
          {AGENDA.map((a, i) => (
            <button
              className={`agenda-step ${active === i ? 'active' : ''} ${state.checkedSteps.includes(i) ? 'done' : ''}`}
              key={a.title}
              onClick={() => {
                setActive(i)
                setShowSolution(false)
              }}
            >
              <span className="step-circle">
                {state.checkedSteps.includes(i) ? <Check size={16} /> : i + 1}
              </span>
              <span>
                <strong>{t(a.title)}</strong>
                <small>
                  {t('{count} minutes · {label}', {
                    count: a.minutes,
                    label: t(a.label).toLowerCase(),
                  })}
                </small>
              </span>
              {active === i && <ChevronRight size={16} />}
            </button>
          ))}
          <div className="session-meter">
            <div>
              <span>
                {t('{count} of 4 steps complete', {
                  count: state.checkedSteps.length,
                })}
              </span>
              <strong>{state.checkedSteps.length * 25}%</strong>
            </div>
            <progress
              value={state.checkedSteps.length}
              max={4}
              aria-label={t('Session steps completed')}
            />
          </div>
          <div className="session-privacy">
            <LockKeyhole size={16} />
            <p>
              {t(
                'Your answers stay in this browser. University coordinators never see individual reflections.',
              )}
            </p>
          </div>
        </aside>
        <section className="card guided-card">
          <div className="section-topline">
            <Badge tone="lavender">
              {t('STEP {count} OF 4 · {label}', {
                count: active + 1,
                label: t(step.label),
              })}
            </Badge>
            <span className="guided-time">
              <Clock3 size={14} />
              {t('{count} min suggested', { count: step.minutes })}
            </span>
          </div>
          <h2>{t(step.title)}</h2>
          <p className="guided-description">{t(step.description)}</p>
          <div className="guided-prompt">
            <span className="eyebrow">
              {active === 2 ? t('YOUR SHARED CHALLENGE') : t('A MOMENT FOR YOU')}
            </span>
            <h3>
              {active === 2 && !isCalculus
                ? t(
                    'Choose one {course} problem you’d like to understand, and walk through it together.',
                    { course: t(pod.course) },
                  )
                : t(step.prompt)}
            </h3>
            {active === 2 && isCalculus && (
              <>
                <button className="text-button" onClick={() => setShowSolution(!showSolution)}>
                  {showSolution ? t('Hide worked example') : t('Reveal a worked example')}{' '}
                  <ChevronRight size={14} />
                </button>
                {showSolution && (
                  <div className="worked-example">
                    <strong>{t('f′(x) = 24x(3x² + 1)³')}</strong>
                    <p>
                      {t(
                        'Differentiate the outer power: 4(3x² + 1)³. Multiply by the derivative of the inside, 6x. What helped you decide to use the chain rule?',
                      )}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
          <fieldset className="session-options">
            <legend>
              {active === 3
                ? t('Choose a next-week goal, or write your own below')
                : t('Choose a response to make this step yours')}
            </legend>
            {step.options.map((option) => (
              <label className={`option ${answer === option ? 'selected' : ''}`} key={option}>
                <input
                  type="radio"
                  name={`step-${active}`}
                  checked={answer === option}
                  onChange={() => setAnswer(option)}
                />
                <span>{t(option)}</span>
                {answer === option && <Check size={15} />}
              </label>
            ))}
          </fieldset>
          {active === 3 && (
            <label className="field reflection-field">
              {t('A small win or a personal next step')} <span>{t('(optional)')}</span>
              <textarea
                rows={3}
                maxLength={400}
                value={state.reflection}
                onChange={(e) => {
                  onUpdate({ reflection: e.target.value })
                  if (e.target.value.trim()) setAnswer(e.target.value.trim())
                  else if (answer === state.reflection.trim()) setAnswer('')
                }}
                placeholder={t('I asked for help today instead of staying stuck…')}
              />
              <small>
                <LockKeyhole size={12} />
                {t('Private to this browser · {count}/400', {
                  count: state.reflection.length,
                })}
              </small>
            </label>
          )}
          <div className="guided-bottom">
            <span>
              {state.checkedSteps.includes(active) ? (
                <>
                  <CheckCircle2 size={16} />
                  {t('Step completed')}
                </>
              ) : (
                t('No timer. Go at your own pace.')
              )}
            </span>
            <button className="button primary" disabled={!answer} onClick={complete}>
              {state.checkedSteps.includes(active)
                ? active < 3
                  ? t('Continue')
                  : t('Step completed')
                : t('Complete this step')}
              {active === 3 ? <Check size={16} /> : <ArrowRight size={16} />}
            </button>
          </div>
          {allDone && (
            <div className="finish-session">
              <div>
                <Sparkles size={21} />
                <span>
                  <strong>{t('You showed up. That matters.')}</strong>
                  <small>{t('Save your session and see your progress.')}</small>
                </span>
              </div>
              <button className="button primary" onClick={onFinish}>
                {t('Finish session')} <CheckCircle2 size={17} />
              </button>
            </div>
          )}
        </section>
      </div>
      <div className="session-disclaimer">
        {t(
          'This is a guided personal walkthrough, not a live group call. No responses are sent to other people.',
        )}
      </div>
    </>
  )
}
function ProgressPage({
  state,
  pod,
  onPod,
  onStart,
}: {
  state: DemoState
  pod?: Pod
  onPod: () => void
  onStart: () => void
}) {
  const { t } = useAppearance()
  return (
    <>
      <PageHeading
        eyebrow={t('SMALL STEPS COUNT')}
        title={
          state.completed
            ? t('You made progress. Together.')
            : t('Every journey starts with showing up.')
        }
        description={
          state.completed
            ? t('One session, a little more clarity, and a circle to come back to.')
            : t('Your progress will grow here, one meaningful study session at a time.')
        }
      />
      <div className="progress-layout">
        <section className={`progress-hero ${state.completed ? 'completed' : ''}`}>
          <span className="progress-flower">✳</span>
          <Badge tone="sage">
            {state.completed ? (
              <>
                <CheckCircle2 size={14} />
                {t('Session complete')}
              </>
            ) : (
              t('Your next chapter')
            )}
          </Badge>
          <h2>
            {state.completed
              ? t('A small win worth noticing.')
              : t('Your first small win is ahead.')}
          </h2>
          <p>
            {state.completed
              ? t(
                  'You showed up for yourself and your circle, {name}. That’s a strong place to start.',
                  { name: state.preferences.name },
                )
              : t(
                  'A question asked. A concept understood. A little encouragement shared. That’s what progress looks like here.',
                )}
          </p>
          <div className="progress-stats">
            <div>
              <strong>{state.completed ? '1' : '0'}</strong>
              <span>{t('session completed')}</span>
            </div>
            <div>
              <strong>{state.completed ? '4' : '0'}</strong>
              <span>{t('guided steps taken')}</span>
            </div>
            <div>
              <strong>{pod ? '1' : '0'}</strong>
              <span>{t('supportive circle')}</span>
            </div>
          </div>
          <button className="button primary" onClick={onPod}>
            {pod ? t('Back to my circle') : t('Find my study pod')}
            <ArrowRight size={17} />
          </button>
        </section>
        <aside className="progress-aside">
          <section className="card reflection-summary">
            <span className="eyebrow">
              {state.completed ? t('YOUR NEXT-WEEK INTENTION') : t('ROOM TO GROW')}
            </span>
            <h2>
              {state.completed
                ? state.reflection.trim() && state.answers[3] === state.reflection.trim()
                  ? state.answers[3]
                  : AGENDA[3].options.some((option) => option === state.answers[3])
                    ? t(state.answers[3])
                    : state.answers[3]
                : t('Start where you are.')}
            </h2>
            {state.reflection && state.completed && (
              <p className="saved-reflection">“{state.reflection}”</p>
            )}
            <span className="private-label">
              <LockKeyhole size={13} />
              {t('Private to this browser, never in admin views')}
            </span>
          </section>
          <section className="card next-week">
            <CalendarDays size={23} />
            <h2>{t('Keep a little room for next week.')}</h2>
            <p>
              {pod
                ? t(
                    '{name} meets {day}s at {time} ({timezone}). Bring a question. Bring yourself.',
                    {
                      name: t(pod.name),
                      day: t(pod.day).toLowerCase(),
                      time: pod.time,
                      timezone: INSTITUTION.timezone,
                    },
                  )
                : t('Find a recurring study circle that fits your week.')}
            </p>
            {pod && !state.completed && (
              <button className="text-button" onClick={onStart}>
                {t('Start your first session')} <ArrowRight size={15} />
              </button>
            )}
            {state.completed && (
              <Badge tone="sage">
                <Heart size={13} />
                {t('Study support + human connection')}
              </Badge>
            )}
          </section>
        </aside>
      </div>
      <div className="progress-note">
        <Sprout size={20} />
        <span>
          {t('No leaderboards. No pressure to keep a streak.')}
          <br />
          <strong>{t('Just a little progress, with people on your side.')}</strong>
        </span>
      </div>
    </>
  )
}
