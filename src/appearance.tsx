import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { studentTranslations, translateWithDictionary } from './studentTranslations'
import type { Language, TranslationValues } from './studentTranslations'
import { dashboardTranslations } from './dashboardTranslations'

export type { Language } from './studentTranslations'
export type Theme = 'light' | 'dark'
export const APPEARANCE_STORAGE_KEY = 'sorora-appearance-v1'
const translations = { ...dashboardTranslations, ...studentTranslations }
interface Appearance {
  language: Language
  setLanguage: (language: Language) => void
  theme: Theme
  setTheme: (theme: Theme) => void
  t: (text: string, values?: TranslationValues) => string
}
const AppearanceContext = createContext<Appearance | null>(null)
function loadAppearance(): { language: Language; theme: Theme } {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(APPEARANCE_STORAGE_KEY) || 'null')
    if (saved && typeof saved === 'object') {
      const value = saved as Record<string, unknown>
      return {
        language: value.language === 'pt-BR' ? 'pt-BR' : 'en',
        theme: value.theme === 'dark' ? 'dark' : 'light',
      }
    }
  } catch {
    // Appearance remains usable when browser storage is blocked or malformed.
  }
  return { language: 'en', theme: 'light' }
}
export function AppearanceProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState(loadAppearance)
  const { language, theme } = settings
  const setLanguage = useCallback((next: Language) => {
    if (next === 'en' || next === 'pt-BR') setSettings((value) => ({ ...value, language: next }))
  }, [])
  const setTheme = useCallback((next: Theme) => {
    if (next === 'light' || next === 'dark') setSettings((value) => ({ ...value, theme: next }))
  }, [])
  useEffect(() => {
    const root = document.documentElement
    root.lang = language
    root.dataset.theme = theme
    root.style.colorScheme = theme
    let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'theme-color'
      document.head.appendChild(meta)
    }
    meta.content = theme === 'dark' ? '#191c22' : '#faf8f3'
    try {
      localStorage.setItem(APPEARANCE_STORAGE_KEY, JSON.stringify(settings))
    } catch {
      // Do not block the demo when settings cannot be persisted.
    }
  }, [language, theme, settings])
  const t = useCallback(
    (text: string, values?: TranslationValues) =>
      translateWithDictionary(text, language, translations, values),
    [language],
  )
  const value = useMemo(
    () => ({ language, setLanguage, theme, setTheme, t }),
    [language, setLanguage, theme, setTheme, t],
  )
  return <AppearanceContext.Provider value={value}>{children}</AppearanceContext.Provider>
}
export function useAppearance(): Appearance {
  const context = useContext(AppearanceContext)
  if (!context) throw new Error('useAppearance must be used within AppearanceProvider')
  return context
}
