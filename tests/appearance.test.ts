import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import ts from 'typescript'
import { COURSES, DAYS, PODS, AGENDA } from '../src/data.ts'
import { studentTranslations, translateWithDictionary } from '../src/studentTranslations.ts'
import { dashboardTranslations } from '../src/dashboardTranslations.ts'

const dictionary = { ...dashboardTranslations, ...studentTranslations }
const t = (
  text: string,
  language: 'en' | 'pt-BR' = 'pt-BR',
  values?: Record<string, string | number>,
) => translateWithDictionary(text, language, dictionary, values)

test('English and Brazilian Portuguese translations preserve interpolation', () => {
  assert.equal(
    t('Welcome to the circle, {name}.', 'en', { name: 'Zoe' }),
    'Welcome to the circle, Zoe.',
  )
  assert.ok(t('Welcome to the circle, {name}.', 'pt-BR', { name: 'Zoe' }).includes('Zoe'))
  assert.equal(t('Saturday'), 'Sábado')
  assert.equal(t('Sunday'), 'Domingo')
  assert.equal(t('Week 1'), 'Semana 1')
  assert.equal(t('{count} pods', 'pt-BR', { count: 12 }), '12 grupos')
})
test('user-entered names, goals and reflections are not interpreted as translation keys', () => {
  assert.equal(t('Meu objetivo pessoal: fazer perguntas'), 'Meu objetivo pessoal: fazer perguntas')
  assert.equal(t('Zoe'), 'Zoe')
  assert.equal(t('Private note {custom}'), 'Private note {custom}')
})
test('all explicit UI translation keys exist in the combined dictionary', () => {
  const missing = new Set<string>()
  const invariantLabels = new Set(['Northbridge', 'f′(x)', 'f′(x) = 24x(3x² + 1)³'])
  for (const path of ['src/App.tsx', 'src/UniversityDashboard.tsx', 'src/MeetingCard.tsx']) {
    const source = ts.createSourceFile(
      path,
      readFileSync(path, 'utf8'),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    )
    const visit = (node: ts.Node) => {
      if (
        ts.isCallExpression(node) &&
        ts.isIdentifier(node.expression) &&
        node.expression.text === 't'
      ) {
        const key = node.arguments[0]
        if (
          key &&
          ts.isStringLiteral(key) &&
          !Object.hasOwn(dictionary, key.text) &&
          !invariantLabels.has(key.text)
        )
          missing.add(key.text)
      }
      ts.forEachChild(node, visit)
    }
    visit(source)
  }
  assert.deepEqual([...missing], [])
})
test('every canonical course, weekday, pod and guided agenda display string has a Portuguese label', () => {
  const strings: string[] = [...COURSES, ...DAYS, 'Beginner', 'Intermediate']
  for (const pod of PODS) {
    strings.push(pod.name, pod.description, pod.theme, pod.tag)
    for (const member of pod.members) strings.push(member.major)
  }
  for (const step of AGENDA)
    strings.push(step.title, step.label, step.description, step.prompt, ...step.options)
  for (const text of strings)
    assert.ok(Object.hasOwn(dictionary, text), `Missing translation for: ${text}`)
})
test('Portuguese together copy uses juntas rather than em companhia', () => {
  assert.equal(t('Study together.'), 'Estudem juntas.')
  assert.equal(t('Grow together.'), 'Cresçam juntas.')
  assert.ok(!Object.values(studentTranslations).some((value) => /em companhia/i.test(value)))
})
test('translations preserve all placeholder names', () => {
  const placeholders = (text: string) =>
    [...text.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort()
  for (const [key, value] of Object.entries(dictionary)) {
    assert.deepEqual(placeholders(value), placeholders(key), `Incorrect placeholders for: ${key}`)
  }
})
