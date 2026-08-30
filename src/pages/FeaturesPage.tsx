import type { Locale, Translation } from '../types'
import { BODHI_GITHUB_URL } from '../constants'
import { buildUrl } from '../utils/locale'
import { LanguageSwitch } from '../components/LanguageSwitch'
import { SmartLink } from '../components/SmartLink'

export function FeaturesPage({
  locale,
  setLocale,
  content,
}: {
  locale: Locale
  setLocale: (locale: Locale) => void
  content: Translation
}) {
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

        <nav className="nav-links" aria-label="Features navigation">
          <SmartLink href={buildUrl('/', locale)}>{content.nav.home}</SmartLink>
          <SmartLink href={buildUrl('/download', locale)}>{content.nav.download}</SmartLink>
          <SmartLink href={buildUrl('/docs', locale)}>{content.nav.docs}</SmartLink>
          <a href={BODHI_GITHUB_URL} target="_blank" rel="noopener noreferrer">
            {content.nav.github}
          </a>
        </nav>

        <LanguageSwitch locale={locale} onChange={setLocale} label={content.nav.language} />
      </header>

      <main className="docs-main">
        <section className="panel docs-hero">
          <p className="section-kicker">{content.features.kicker}</p>
          <h1>{content.features.title}</h1>
          <p className="docs-description">{content.features.description}</p>
        </section>

        <div className="docs-layout">
          <aside className="panel docs-toc" aria-label={content.features.tocTitle}>
            <h2>{content.features.tocTitle}</h2>
            <ul>
              {content.features.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.title}</a>
                </li>
              ))}
            </ul>
          </aside>

          <article className="panel docs-content">
            {content.features.sections.map((section) => (
              <section className="doc-section" id={section.id} key={section.id}>
                <h2>{section.title}</h2>
                {section.imageSrc ? (
                  <div className="feature-image-wrap">
                    <img
                      className="feature-image"
                      src={section.imageSrc}
                      alt={section.imageAlt || section.title}
                      loading="lazy"
                    />
                  </div>
                ) : null}
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
        <p>{content.footer.home}</p>
      </footer>
    </div>
  )
}
