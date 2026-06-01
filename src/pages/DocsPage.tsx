import type { Locale, Translation } from '../types'
import { buildUrl } from '../utils/locale'
import { LanguageSwitch } from '../components/LanguageSwitch'
import { SmartLink } from '../components/SmartLink'

export function DocsPage({
  locale,
  setLocale,
  content,
}: {
  locale: Locale
  setLocale: (locale: Locale) => void
  content: Translation
}) {
  const updatedAt = new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date())

  return (
    <div className="page-shell docs-shell">
      <div className="ambient ambient-a" aria-hidden="true" />
      <div className="ambient ambient-b" aria-hidden="true" />
      <div className="ambient ambient-c" aria-hidden="true" />

      <header className="top-nav panel">
        <SmartLink className="brand-lockup" href={buildUrl('/', locale)}>
          <span className="brand-mark">B</span>
          <span className="brand-copy">
            <strong>{content.nav.brand}</strong>
            <small>{content.nav.brandTagline}</small>
          </span>
        </SmartLink>

        <nav className="nav-links" aria-label="Documentation navigation">
          <SmartLink href={buildUrl('/', locale)}>{content.nav.home}</SmartLink>
          <SmartLink href={buildUrl('/download', locale)}>{content.nav.download}</SmartLink>
          <a href="#overview">{content.nav.overview}</a>
          <a href="#first-run">{content.nav.firstRun}</a>
          <a href="#power-users">{content.nav.powerUsers}</a>
          <a href="#developers">{content.nav.developers}</a>
          <a href="#api">{content.nav.api}</a>
          <a href="#bodhi-server">{content.nav.bodhiServer}</a>
          <a href="#cicd">{content.nav.cicd}</a>
          <a href="#multi-agent">{content.nav.multiAgent}</a>
          <a href="#security">{content.nav.security}</a>
        </nav>

        <LanguageSwitch locale={locale} onChange={setLocale} label={content.nav.language} />
      </header>

      <main className="docs-main">
        <section className="panel docs-hero">
          <p className="section-kicker">{content.docs.kicker}</p>
          <h1>{content.docs.title}</h1>
          <p className="docs-description">{content.docs.description}</p>
          <small>
            {content.docs.updatedLabel}: {updatedAt}
          </small>
        </section>

        <div className="docs-layout">
          <aside className="panel docs-toc" aria-label={content.docs.tocTitle}>
            <h2>{content.docs.tocTitle}</h2>
            <ul>
              {content.docs.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.title}</a>
                </li>
              ))}
            </ul>
          </aside>

          <article className="panel docs-content">
            {content.docs.sections.map((section) => (
              <section className="doc-section" id={section.id} key={section.id}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={`${section.id}-p-${paragraphIndex}`}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((bullet, bulletIndex) => (
                      <li key={`${section.id}-b-${bulletIndex}`}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
                {section.code ? (
                  <pre>
                    <code>{section.code}</code>
                  </pre>
                ) : null}
              </section>
            ))}
          </article>
        </div>
      </main>

      <footer className="footer-line">
        <p>{content.footer.docs}</p>
      </footer>
    </div>
  )
}
