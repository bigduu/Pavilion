import { useEffect, useMemo, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import type { Locale } from './types'
import { LANGUAGE_STORAGE_KEY } from './constants'
import { translations } from './i18n'
import { getInitialLocale } from './utils/locale'
import { HomePage } from './pages/HomePage'
import { FeaturesPage } from './pages/FeaturesPage'
import { DownloadPage } from './pages/DownloadPage'
import { DocsPage } from './pages/DocsPage'

function App() {
  const location = useLocation()
  const currentPath = location.pathname.replace(/\/+$/, '') || '/'
  const isDocsRoute = currentPath === '/docs' || currentPath.startsWith('/docs/')
  const isDownloadRoute = currentPath === '/download' || currentPath.startsWith('/download/')
  const isFeaturesRoute = currentPath === '/features' || currentPath.startsWith('/features/')
  const [locale, setLocale] = useState<Locale>(getInitialLocale)
  const content = useMemo(() => translations[locale], [locale])

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, locale)
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'

    const url = new URL(window.location.href)
    url.searchParams.set('lang', locale)
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`)
  }, [locale, location])

  useEffect(() => {
    document.title = isDocsRoute
      ? content.meta.docsTitle
      : isDownloadRoute
        ? content.download.page.metaTitle
        : isFeaturesRoute
          ? content.meta.featuresTitle
          : content.meta.homeTitle
  }, [content, isDocsRoute, isDownloadRoute, isFeaturesRoute, locale])

  const homeElement = <HomePage locale={locale} setLocale={setLocale} content={content} />

  return (
    <Routes>
      <Route
        path="/docs/*"
        element={<DocsPage locale={locale} setLocale={setLocale} content={content} />}
      />
      <Route
        path="/download/*"
        element={<DownloadPage locale={locale} setLocale={setLocale} content={content} />}
      />
      <Route
        path="/features/*"
        element={<FeaturesPage locale={locale} setLocale={setLocale} content={content} />}
      />
      <Route path="/" element={homeElement} />
      <Route path="*" element={homeElement} />
    </Routes>
  )
}

export default App
