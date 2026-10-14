// Prefer a supported system Node; a project-local runtime keeps this demo usable on older machines.
const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')
const root = path.resolve(__dirname, '..')
const localNode = path.join(
  root,
  '.tools',
  'node_modules',
  'node',
  'bin',
  process.platform === 'win32' ? 'node.exe' : 'node',
)
const major = Number(process.versions.node.split('.')[0])
const runtime = major >= 22 ? process.execPath : fs.existsSync(localNode) ? localNode : null
if (!runtime) {
  console.error(
    'Sorora requires Node 22+. Upgrade Node, or install a local runtime: npm install --prefix .tools node@22 --cache .npm-cache',
  )
  process.exit(1)
}
const commands = {
  dev: [['node_modules/vite/bin/vite.js', '--host', '0.0.0.0']],
  build: [
    ['node_modules/typescript/bin/tsc', '-b'],
    ['node_modules/vite/bin/vite.js', 'build'],
  ],
  preview: [['node_modules/vite/bin/vite.js', 'preview', '--host', '0.0.0.0']],
  test: [['--experimental-strip-types', '--test', 'tests/matching.test.ts', 'tests/appearance.test.ts']],
  browser: [['tests/browser-smoke.mjs']],
    appearance: [['tests/appearance-browser.mjs']],
}
const jobs = commands[process.argv[2]]
if (!jobs) {
  console.error('Unknown command')
  process.exit(1)
}
for (const job of jobs) {
  const result = spawnSync(runtime, [...job, ...process.argv.slice(3)], {
    cwd: root,
    stdio: 'inherit',
  })
  if (result.error) {
    console.error(result.error.message)
    process.exit(1)
  }
  if (result.status !== 0) process.exit(result.status || 1)
}
