import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Check,
  CircleHelp,
  GraduationCap,
  HeartHandshake,
  Layers3,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'
import { useAppearance } from './appearance'
import './dashboard.css'

const metrics = [
  { label: 'Active pods', value: '12', detail: 'Small circles, shared support', icon: Layers3 },
  { label: 'Participating students', value: '48', detail: 'Across four STEM courses', icon: Users },
  {
    label: 'Sessions completed',
    value: '36',
    detail: 'Over the six-week sample period',
    icon: CalendarDays,
  },
  {
    label: 'Weekly participation',
    value: '75%',
    detail: '36 of 48 students this week',
    icon: HeartHandshake,
  },
]

const weeks = [
  { label: 'Week 1', value: 46 },
  { label: 'Week 2', value: 54 },
  { label: 'Week 3', value: 58 },
  { label: 'Week 4', value: 67 },
  { label: 'Week 5', value: 71 },
  { label: 'Week 6', value: 75 },
]

const courses = [
  { name: 'Intro to Programming', students: 16, pods: 4, color: 'indigo' },
  { name: 'Calculus I', students: 12, pods: 3, color: 'sage' },
  { name: 'Organic Chemistry', students: 12, pods: 3, color: 'sand' },
  { name: 'Physics I', students: 8, pods: 2, color: 'lavender' },
]

export default function UniversityDashboard() {
  const { t } = useAppearance()

  return (
    <section className="uni-dashboard" aria-labelledby="uni-dashboard-title">
      <div className="uni-container">
        <header className="uni-heading">
          <div className="uni-eyebrow">{t('Illustrative university dashboard')}</div>
          <div className="uni-heading-row">
            <div>
              <h1 id="uni-dashboard-title" className="uni-title">
                {t('A small circle.')} <br />{t('A wider impact.')}
              </h1>
              <p className="uni-subtitle">
                {t('One institutional subscription. Sponsored student access, recurring peer-support pods, and privacy-respecting aggregate insights.')}
              </p>
            </div>
            <div className="uni-partner">
              <span className="uni-partner-icon">
                <GraduationCap size={25} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <div>
                <p className="uni-partner-name">{t('Northbridge University')}</p>
                <p className="uni-partner-detail">{t('Sorora university partner · Fictional program')}</p>
                <span className="uni-sponsored">
                  <span className="uni-status-dot" />
                  {t('Sponsored student access')}
                </span>
              </div>
            </div>
          </div>
        </header>

        <aside className="uni-sample" aria-label={t('Sample data notice')}>
          <span className="uni-sample-label">
            <Sparkles size={15} aria-hidden="true" /> {t('Sample data')}
          </span>
          <p>
            {t('Illustrative figures, not a live report. Coordinators see aggregate participation, never private reflections.')}
          </p>
          <span className="uni-period">{t('Six-week program snapshot')}</span>
        </aside>

        <section className="uni-metrics" aria-label={t('Program at a glance')}>
          {metrics.map(({ label, value, detail, icon: Icon }) => (
            <article className="uni-card uni-metric" key={label}>
              <div className="uni-metric-top">
                <h2>{t(label)}</h2>
                <Icon size={19} strokeWidth={1.6} aria-hidden="true" />
              </div>
              <p className="uni-metric-value">{value}</p>
              <p className="uni-metric-detail">{t(detail)}</p>
            </article>
          ))}
        </section>

        <div className="uni-charts">
          <section className="uni-card uni-participation" aria-labelledby="uni-participation-title">
            <div className="uni-section-heading">
              <div>
                <p className="uni-kicker">{t('Showing up, together')}</p>
                <h2 id="uni-participation-title">{t('A weekly rhythm of connection')}</h2>
              </div>
              <span className="uni-tag">{t('Last 6 weeks')}</span>
            </div>
            <p className="uni-section-description">
              {t('Students attending at least one pod session each week.')}
            </p>
            <figure className="uni-chart-figure">
              <div
                className="uni-chart"
                role="img"
                aria-label={t('Sample weekly participation: Week 1, 46 percent; Week 2, 54 percent; Week 3, 58 percent; Week 4, 67 percent; Week 5, 71 percent; Week 6, 75 percent.')}
              >
                <div className="uni-chart-axis" aria-hidden="true">
                  <span>100%</span>
                  <span>75%</span>
                  <span>50%</span>
                  <span>25%</span>
                  <span>0%</span>
                </div>
                <div className="uni-chart-plot" aria-hidden="true">
                  <div className="uni-chart-grid">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="uni-chart-bars">
                    {weeks.map((week, index) => (
                      <div className="uni-chart-column" key={week.label}>
                        <div
                          className={`uni-chart-bar${index === weeks.length - 1 ? ' uni-chart-bar-current' : ''}`}
                          style={{ height: `${week.value}%` }}
                        >
                          <span className="uni-chart-value">{week.value}%</span>
                        </div>
                        <span className="uni-chart-label">{t(week.label)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <figcaption className="uni-chart-caption">
                <span className="uni-chart-legend" />
                {t('Weekly participation')}{' '}
                <span className="uni-caption-note">{t('Percentage of 48 participating students')}</span>
              </figcaption>
            </figure>
          </section>

          <section className="uni-card uni-courses" aria-labelledby="uni-courses-title">
            <div className="uni-section-heading">
              <div>
                <p className="uni-kicker">{t('Different paths, shared space')}</p>
                <h2 id="uni-courses-title">{t('Our student community')}</h2>
              </div>
              <BookOpen size={20} strokeWidth={1.5} aria-hidden="true" />
            </div>
            <p className="uni-section-description">{t('48 students. Four courses. Room to belong.')}</p>
            <div className="uni-course-stack" aria-hidden="true">
              {courses.map((course) => (
                <span
                  key={course.name}
                  className={`uni-course-segment uni-color-${course.color}`}
                  style={{ flex: course.students }}
                />
              ))}
            </div>
            <ul className="uni-course-list">
              {courses.map((course) => (
                <li key={course.name}>
                  <span className={`uni-course-dot uni-color-${course.color}`} aria-hidden="true" />
                  <div className="uni-course-name">
                    {t(course.name)}
                    <span>{t('{count} pods', { count: course.pods })}</span>
                  </div>
                  <span className="uni-course-count">
                    {course.students}
                    <span>{t('students')}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="uni-bottom-grid">
          <section className="uni-card uni-highlights" aria-labelledby="uni-highlights-title">
            <div className="uni-section-heading">
              <div>
                <p className="uni-kicker">{t('Beyond the numbers')}</p>
                <h2 id="uni-highlights-title">{t('Small moments worth noticing')}</h2>
              </div>
              <Sparkles size={20} strokeWidth={1.5} aria-hidden="true" />
            </div>
            <ul className="uni-highlight-list">
              <li>
                <span className="uni-highlight-icon">
                  <Users size={18} aria-hidden="true" />
                </span>
                <div>
                  <h3>{t('Small enough to be familiar')}</h3>
                  <p>{t('12 pods of four students make space for recurring peer connection.')}</p>
                </div>
              </li>
              <li>
                <span className="uni-highlight-icon">
                  <CalendarDays size={18} aria-hidden="true" />
                </span>
                <div>
                  <h3>{t('A shared time to check in')}</h3>
                  <p>
                    {t('36 completed sessions across the sample period create a regular place to pause and connect.')}
                  </p>
                </div>
              </li>
              <li>
                <span className="uni-highlight-icon">
                  <ArrowUpRight size={18} aria-hidden="true" />
                </span>
                <div>
                  <h3>{t('A view of participation, not private lives')}</h3>
                  <p>
                    {t('Course-level totals help coordinators understand where the program is reaching students.')}
                  </p>
                </div>
              </li>
            </ul>
          </section>

          <section className="uni-subscription" aria-labelledby="uni-subscription-title">
            <span className="uni-subscription-icon">
              <HeartHandshake size={24} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <p className="uni-kicker">{t('University-supported. Student-centered.')}</p>
            <h2 id="uni-subscription-title">
              {t('You make the space.')}
              <br />
              {t('They make the connection.')}
            </h2>
            <p className="uni-subscription-description">
              {t('One institutional subscription helps bring recurring peer support into everyday university life.')}
            </p>
            <ul className="uni-benefits">
              <li>
                <Check size={16} aria-hidden="true" />
                {t('Coordination for recurring peer-support pods')}
              </li>
              <li>
                <Check size={16} aria-hidden="true" />
                {t('Free student access through university sponsorship')}
              </li>
              <li>
                <Check size={16} aria-hidden="true" />
                {t('Aggregate insights for program coordinators')}
              </li>
            </ul>
            <div className="uni-subscription-footnote">
              <ShieldCheck size={16} aria-hidden="true" />
              {t('Built around connection, with privacy in mind.')}
            </div>
          </section>
        </div>

        <aside className="uni-privacy" aria-labelledby="uni-privacy-title">
          <LockKeyhole
            className="uni-privacy-icon"
            size={21}
            strokeWidth={1.6}
            aria-hidden="true"
          />
          <div>
            <h2 id="uni-privacy-title">{t('A shared overview. A private personal space.')}</h2>
            <p>
              {t('Program coordinators see aggregate participation, not students’ private reflections. No individual reflections are shown or made available in this dashboard.')}
            </p>
          </div>
          <span className="uni-privacy-badge">
            <ShieldCheck size={15} aria-hidden="true" />
            {t('Aggregate insights only')}
          </span>
        </aside>
        <footer className="uni-footer">
          <span>Sorora · {t('Northbridge University')}</span>
          <span>
            <CircleHelp size={13} aria-hidden="true" />
            {t('Read-only demo · No live student data')}
          </span>
        </footer>
      </div>
    </section>
  )
}
