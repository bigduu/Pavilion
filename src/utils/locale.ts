import type { Locale } from '../types'
import { LANGUAGE_STORAGE_KEY } from '../constants'

export function getInitialLocale(): Locale {
  const queryLocale = new URLSearchParams(window.location.search).get('lang')
  if (queryLocale === 'zh' || queryLocale === 'en') {
    return queryLocale
  }

  const storedLocale = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
  if (storedLocale === 'zh' || storedLocale === 'en') {
    return storedLocale
  }

  return window.navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

export function buildUrl(pathname: string, locale: Locale, hash?: string): string {
  const suffix = hash ? `#${hash}` : ''
  return `${pathname}?lang=${locale}${suffix}`
}
