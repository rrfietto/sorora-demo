// Optional local browser validation. Install Playwright into .tools (see README).
import { chromium } from '../.tools/node_modules/playwright/index.mjs'
import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import assert from 'node:assert/strict'

const server = spawn(
  process.execPath,
  [
    'node_modules/vite/bin/vite.js',
    'preview',
    '--host',
    '127.0.0.1',
    '--port',
    '4173',
    '--strictPort',
  ],
  { stdio: 'pipe' },
)
let browser
const timeout = setTimeout(() => {
  server.kill()
  process.exit(1)
}, 90000)
try {
  await mkdir('artifacts', { recursive: true })
  for (let attempt = 0; attempt < 60; attempt++) {
    try {
      if ((await fetch('http://127.0.0.1:4173')).ok) break
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250))
  }
  browser = await chromium.launch({ channel: 'msedge', headless: true })
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  })
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  const screenshot = async (name) => {
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.screenshot({ path: `artifacts/${name}.png` })
  }
  const noOverflow = async () =>
    assert.ok(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      'page must not overflow horizontally',
    )
  await page.goto('http://127.0.0.1:4173')
  await page.getByRole('heading', { name: 'Study together. Belong together.' }).waitFor()
  await screenshot('01-welcome')
  await noOverflow()
  await page.getByRole('button', { name: 'Find my study pod', exact: true }).click()
  await page.getByRole('button', { name: 'Continue with Northbridge (Demo)' }).click()
  await page.getByRole('button', { name: 'Find a group', exact: true }).click()
  assert.equal(await page.locator('article.match-card').count(), 3)
  await screenshot('02-matches')
  const joinButton = await page.getByRole('button', { name: 'Join pod', exact: true }).first().boundingBox()
  assert.ok(joinButton && joinButton.y + joinButton.height <= 900, 'primary join action fits the desktop capture')
  await noOverflow()
  await page
    .locator('article.match-card')
    .filter({ has: page.getByRole('heading', { name: 'Calculus Circle', exact: true }) })
    .getByRole('button', { name: 'Join pod', exact: true })
    .click()
  await page.getByText('You’re a member · 5/5').waitFor()
  assert.equal(await page.locator('.member-row').count(), 5)
  await screenshot('03-pod')
  await noOverflow()
  await page.getByRole('button', { name: 'Start guided session', exact: true }).click()
  for (let step = 0; step < 4; step++) {
    await page.locator('.session-options input').first().check()
    if (step === 2) {
      await page.getByRole('button', { name: 'Reveal a worked example' }).click()
      await page.getByText('f′(x) = 24x(3x² + 1)³', { exact: true }).waitFor()
      await screenshot('04-guided-session')
    }
    if (step === 3)
      await page.getByRole('textbox').fill('I asked for help instead of staying stuck.')
    await page.getByRole('button', { name: 'Complete this step', exact: true }).click()
  }
  await page.getByRole('button', { name: 'Finish session', exact: true }).click()
  await page.getByRole('heading', { name: 'You made progress. Together.' }).waitFor()
  await screenshot('05-progress')
  assert.equal(await page.locator('.progress-stats strong').first().innerText(), '1')
  await page.reload()
  await page.getByRole('heading', { name: 'You made progress. Together.' }).waitFor()
  assert.equal(await page.locator('.progress-stats strong').first().innerText(), '1')
  await page.getByRole('button', { name: 'University view', exact: true }).click()
  await page.getByRole('heading', { name: /A small circle.*A wider impact\./ }).waitFor()
  assert.equal(
    await page.getByText('I asked for help instead of staying stuck.', { exact: false }).count(),
    0,
  )
  await screenshot('06-university')
  await noOverflow()
  await page.getByRole('button', { name: 'Student view', exact: true }).click()
  await page.setViewportSize({ width: 390, height: 844 })
  await screenshot('07-mobile-pod')
  await noOverflow()
  await page.getByRole('button', { name: 'University view', exact: true }).click()
  await screenshot('08-mobile-university')
  await noOverflow()
  await page.getByRole('button', { name: 'Reset demo', exact: true }).click()
  await page.getByRole('dialog').getByRole('button', { name: 'Reset demo', exact: true }).click()
  await page.getByRole('button', { name: 'Find my study pod', exact: true }).click()
  await page.getByRole('button', { name: 'Continue with Northbridge (Demo)' }).click()
  await page.getByLabel('Preferred day').selectOption('Monday')
  await page.getByRole('button', { name: 'Find a group', exact: true }).click()
  await page.getByRole('heading', { name: 'No match doesn’t mean no place for you.' }).waitFor()
  await screenshot('09-no-match')
  await noOverflow()
  await page.getByRole('button', { name: 'Change availability', exact: true }).click()
  await page.getByLabel('Preferred day').selectOption('Wednesday')
  await page.getByRole('button', { name: 'Find a group', exact: true }).click()
  assert.equal(await page.locator('article.match-card').count(), 3)
  await page.getByRole('button', { name: 'Reset demo', exact: true }).click()
  await page.getByRole('dialog').getByRole('button', { name: 'Reset demo', exact: true }).click()
  await page.getByRole('heading', { name: 'Study together. Belong together.' }).waitFor()
  await noOverflow()
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('sorora-demo-v1')))
  assert.equal(stored.joinedPodId, null)
  assert.equal(stored.completed, false)
  assert.equal(stored.preferences.name, 'Zoe')
  assert.deepEqual(errors, [])
  console.log(
    'PASS: institution entry, matching, capacity, guided session, progress, reload, admin privacy, no-match, reset, desktop/mobile overflow. Screenshots saved to artifacts/.',
  )
} finally {
  clearTimeout(timeout)
  await browser?.close()
  server.kill()
}
