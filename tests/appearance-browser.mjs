// Optional screenshot-free checks; uses the same local Playwright setup as browser-smoke.mjs.
import { chromium } from '../.tools/node_modules/playwright/index.mjs'
import { spawn } from 'node:child_process'
import assert from 'node:assert/strict'

const server = spawn(
  process.execPath,
  [
    'node_modules/vite/bin/vite.js',
    'preview',
    '--host',
    '127.0.0.1',
    '--port',
    '4174',
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
  let ready = false
  for (let attempt = 0; attempt < 60; attempt++) {
    try {
      if ((await fetch('http://127.0.0.1:4174')).ok) {
        ready = true
        break
      }
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250))
  }
  assert.ok(ready, 'preview server starts')
  browser = await chromium.launch({ channel: 'msedge', headless: true })
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  })
  const page = await context.newPage()
  const errors = []
  const externalRequests = []
  page.on('request', (request) => {
    if (new URL(request.url()).hostname !== '127.0.0.1') externalRequests.push(request.url())
  })
  page.on('pageerror', (error) => errors.push(error.message))
  const noOverflow = async () =>
    assert.ok(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      'no horizontal overflow',
    )
  const textFitsButtons = async () => {
    const overflowing = await page.evaluate(() => {
      const failures = []
      for (const button of document.querySelectorAll('button')) {
        const bounds = button.getBoundingClientRect()
        if (!bounds.width || !bounds.height) continue
        const walker = document.createTreeWalker(button, NodeFilter.SHOW_TEXT)
        let node
        while ((node = walker.nextNode())) {
          if (!node.textContent.trim()) continue
          const range = document.createRange()
          range.selectNodeContents(node)
          for (const rect of range.getClientRects()) {
            if (
              rect.width &&
              (rect.left < bounds.left - 1 ||
                rect.right > bounds.right + 1 ||
                rect.top < bounds.top - 1 ||
                rect.bottom > bounds.bottom + 1)
            )
              failures.push(button.textContent.trim())
          }
        }
      }
      return [...new Set(failures)]
    })
    assert.deepEqual(overflowing, [], 'all visible button text stays inside its button')
  }
  const savedDemo = () => page.evaluate(() => JSON.parse(localStorage.getItem('sorora-demo-v1')))
  const language = page.locator('select.language-control')
  const theme = page.locator('button.theme-toggle')
  const pickLanguage = async (value) => {
    await language.selectOption(value)
    await page.waitForFunction((expected) => document.documentElement.lang === expected, value)
  }
  await page.goto('http://127.0.0.1:4174')
  await page.getByRole('heading', { name: 'Study together. Belong together.' }).waitFor()
  await theme.click()
  await page.waitForFunction(() => document.documentElement.dataset.theme === 'dark')
  assert.equal(
    await page.locator('body').evaluate((node) => getComputedStyle(node).backgroundColor),
    'rgb(28, 30, 35)',
  )
  await pickLanguage('pt-BR')
  assert.ok(!(await page.locator('h1').innerText()).includes('Study together'))
  await noOverflow()
  await textFitsButtons()
  await page.locator('.hero-cta').click()
  await textFitsButtons()
  await page.locator('.modal .button.primary').click()
  const day = page.locator('.form-grid select').nth(2)
  assert.equal(await day.locator('option').count(), 7)
  assert.equal(await day.locator('option[value="Saturday"]').innerText(), 'Sábado')
  assert.equal(await day.locator('option[value="Sunday"]').innerText(), 'Domingo')
  await page.locator('.form-grid input').fill('Ana')
  await page.locator('.goal-field input').fill('Quero entender melhor minhas dúvidas')
  await day.selectOption('Saturday')
  await page.locator('.form-bottom button').click()
  await page.locator('.empty-state').waitFor()
  assert.equal((await savedDemo()).preferences.day, 'Saturday')
  await page.reload()
  await page.locator('.empty-state').waitFor()
  assert.equal((await savedDemo()).preferences.day, 'Saturday')
  assert.equal(await language.inputValue(), 'pt-BR')
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark')
  await page.locator('.empty-state button').click()
  await page.locator('.form-grid select').nth(2).selectOption('Sunday')
  await page.locator('.form-bottom button').click()
  await page.locator('.empty-state').waitFor()
  await page.reload()
  await page.locator('.empty-state').waitFor()
  assert.equal((await savedDemo()).preferences.day, 'Sunday')
  await page.locator('.empty-state button').click()
  await pickLanguage('en')
  assert.equal(await page.locator('.form-grid input').inputValue(), 'Ana')
  assert.equal(
    await page.locator('.goal-field input').inputValue(),
    'Quero entender melhor minhas dúvidas',
  )
  await page.locator('.form-grid select').nth(2).selectOption('Wednesday')
  await page.locator('.form-grid select').nth(3).selectOption('19:00')
  await page.locator('.form-bottom button').click()
  assert.equal(await page.locator('.match-card').count(), 3)
  assert.ok((await page.locator('.page-heading h1').innerText()).includes('No exact match'))
  assert.ok(
    (await page.locator('.nearby-time-note').first().innerText()).includes('60 min earlier'),
  )
  assert.equal((await savedDemo()).preferences.time, '19:00')
  await pickLanguage('pt-BR')
  await textFitsButtons()
  await page.locator('.match-card').first().locator('button').click()
  await page.getByRole('dialog').waitFor()
  await textFitsButtons()
  assert.ok((await page.locator('.modal p').innerText()).includes('19:00'))
  assert.ok((await page.locator('.modal p').innerText()).includes('18:00'))
  await page.locator('.modal .button.secondary').click()
  assert.equal((await savedDemo()).joinedPodId, null)
  assert.equal((await savedDemo()).preferences.time, '19:00')
  await page.locator('.match-card').first().locator('button').click()
  await page.locator('.modal .button.primary').click()
  await page.locator('.members-list').waitFor()
  assert.equal((await savedDemo()).preferences.time, '18:00')
  assert.equal((await savedDemo()).joinedPodId, 'calculus-circle')
  await page.reload()
  await page.locator('.members-list').waitFor()
  assert.equal((await savedDemo()).preferences.time, '18:00')
  for (const width of [1440, 1024, 800]) {
    await page.setViewportSize({ width, height: 900 })
    await textFitsButtons()
    await noOverflow()
  }
  await page.setViewportSize({ width: 1440, height: 900 })
  assert.equal(await page.locator('.member-row').count(), 5)
  await page.locator('.session-bottom button').click()
  await page.locator('.meeting-generate').click()
  await page.locator('.meeting-generated').waitFor()
  const meetingUrl = await page.locator('.meeting-link-field input').inputValue()
  assert.equal(new URL(meetingUrl).hostname, 'meet.sorora.example')
  assert.equal((await savedDemo()).meetingGenerated, true)
  await page.locator('.meeting-allowlist summary').click()
  assert.equal(await page.locator('.meeting-allowlist li').count(), 5)
  const fictionalEmails = await page.locator('.meeting-allowlist code').allTextContents()
  assert.ok(fictionalEmails.every((email) => email.endsWith('@northbridge.example')))
  assert.ok(fictionalEmails.includes('ana.demo@northbridge.example'))
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async (text) => {
          window.demoCopiedText = text
        },
      },
    })
  })
  await page.locator('.meeting-link-row .button.secondary').click()
  assert.equal(await page.evaluate(() => window.demoCopiedText), meetingUrl)
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async () => {
          throw new Error('Clipboard blocked for test')
        },
      },
    })
  })
  await page.locator('.meeting-link-row .button.secondary').click()
  await page.locator('.meeting-copy-message').waitFor()
  await page.locator('.meeting-link-row .button.primary').click()
  await page.locator('.meeting-preview').waitFor()
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 })
    await noOverflow()
    await textFitsButtons()
  }
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.reload()
  await page.locator('.meeting-generated').waitFor()
  assert.equal(await page.locator('.meeting-link-field input').inputValue(), meetingUrl)
  assert.equal((await savedDemo()).meetingGenerated, true)
  for (let step = 0; step < 4; step++) {
    await page.locator('.session-options input').first().check()
    if (step === 1) {
      const stored = (await savedDemo()).answers[1]
      await pickLanguage('en')
      assert.equal((await savedDemo()).answers[1], stored)
      assert.equal(await page.locator('.session-options input:checked').count(), 1)
      await pickLanguage('pt-BR')
    }
    if (step === 3) await page.locator('textarea').fill('Consegui pedir ajuda hoje.')
    await textFitsButtons()
    await page.locator('.guided-bottom button').click()
  }
  await page.locator('.finish-session button').click()
  await page.locator('.progress-stats').waitFor()
  assert.equal(await page.locator('.progress-stats strong').first().innerText(), '1')
  const completed = await savedDemo()
  await pickLanguage('en')
  assert.equal((await savedDemo()).reflection, 'Consegui pedir ajuda hoje.')
  await page.locator('.view-switch button').nth(1).click()
  await page.locator('.uni-dashboard').waitFor()
  assert.equal(await page.locator('.meeting-card').count(), 0)
  assert.ok(!(await page.locator('.uni-dashboard').innerText()).includes('@northbridge.example'))
  assert.equal(await page.locator('.sidebar-profile .university-avatar svg').count(), 1)
  assert.equal(
    await page.locator('.sidebar-profile').innerText(),
    'Program showcase\nRead-only · Sample data',
  )
  await pickLanguage('pt-BR')
  assert.equal(await page.locator('.uni-sample-label').innerText(), 'Dados de exemplo')
  assert.equal(await page.locator('.uni-chart-label').first().innerText(), 'Semana 1')
  assert.ok(
    !(await page.locator('.uni-dashboard').innerText()).includes('Consegui pedir ajuda hoje.'),
  )
  assert.equal(
    await page
      .locator('.uni-card')
      .first()
      .evaluate((node) => getComputedStyle(node).backgroundColor),
    'rgb(37, 39, 46)',
  )
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 })
    await noOverflow()
    await page.locator('.view-switch button').first().click()
    await page.locator('.members-list').waitFor()
    await noOverflow()
    await textFitsButtons()
    await theme.click()
    await page.waitForFunction(() => document.documentElement.dataset.theme === 'light')
    await noOverflow()
    await theme.click()
    await page.waitForFunction(() => document.documentElement.dataset.theme === 'dark')
    await page.locator('.view-switch button').nth(1).click()
    await noOverflow()
    await textFitsButtons()
  }
  assert.equal((await savedDemo()).completed, completed.completed)
  await page.locator('.reset-button').click()
  await page.locator('.modal .button.primary').click()
  await page.locator('.hero-cta').waitFor()
  await textFitsButtons()
  assert.equal(await language.inputValue(), 'pt-BR')
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark')
  assert.equal((await savedDemo()).joinedPodId, null)
  assert.equal((await savedDemo()).meetingGenerated, false)
  assert.deepEqual(errors, [])
  assert.deepEqual(externalRequests, [], 'no meeting service or email network calls')
  console.log(
    'PASS: fictional meeting generation, five-member email allowlist, copy/fallback, in-app preview, persistence and reset with no external requests; nearby matching; localized full journey; themes and contained desktop/mobile buttons. No screenshots or videos created.',
  )
} finally {
  clearTimeout(timeout)
  await browser?.close()
  server.kill()
}
