import type { Locale, Translation } from '../types'
import {
  BODHI_GITHUB_URL,
  BODHI_LATEST_RELEASE_URL,
  BODHI_RELEASES_URL,
} from '../constants'
import { buildUrl } from '../utils/locale'
import { LanguageSwitch } from '../components/LanguageSwitch'
import { SectionIntro } from '../components/SectionIntro'
import { SmartLink } from '../components/SmartLink'

export function DownloadPage({
  locale,
  setLocale,
  content,
}: {
  locale: Locale
  setLocale: (locale: Locale) => void
  content: Translation
}) {
  const homeUrl = buildUrl('/', locale)
  const downloadUrl = buildUrl('/download', locale)
  const docsOverviewUrl = buildUrl('/docs', locale, 'overview')
  const docsFirstRunUrl = buildUrl('/docs', locale, 'first-run')

  const copy = content.download.page

  return (
    <div className="page-shell download-shell">
      <div className="ambient ambient-a" aria-hidden="true" />
      <div className="ambient ambient-b" aria-hidden="true" />
      <div className="ambient ambient-c" aria-hidden="true" />

      <header className="top-nav panel">
        <SmartLink className="brand-lockup" href={homeUrl}>
          <span className="brand-mark">B</span>
          <span className="brand-copy">
            <strong>{content.nav.brand}</strong>
            <small>{content.nav.brandTagline}</small>
          </span>
        </SmartLink>

        <nav className="nav-links" aria-label="Download navigation">
          <SmartLink href={homeUrl}>{content.nav.home}</SmartLink>
          <SmartLink href={downloadUrl}>{content.nav.download}</SmartLink>
          <SmartLink href={docsOverviewUrl}>{content.nav.docs}</SmartLink>
          <a href={BODHI_GITHUB_URL} target="_blank" rel="noopener noreferrer">
            {content.nav.github}
          </a>
        </nav>

        <LanguageSwitch locale={locale} onChange={setLocale} label={content.nav.language} />
      </header>

      <main className="download-main">
        <section className="panel section-card download-hero">
          <SectionIntro kicker={copy.kicker} title={copy.title} description={copy.description} />

          <div className="download-hero-grid">
            <article className="panel-subtle download-latest-card">
              <p className="card-kicker">{copy.latestKicker}</p>
              <h3>{copy.latestTitle}</h3>
              <p>{copy.latestDescription}</p>
              <div className="download-route-note">
                <span>{copy.routeNote}</span>
                <code>{BODHI_LATEST_RELEASE_URL}</code>
              </div>
              <div className="hero-actions release-actions">
                <a
                  className="button button-primary"
                  href={BODHI_LATEST_RELEASE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {copy.primaryCta}
                </a>
                <a
                  className="button button-secondary"
                  href={BODHI_RELEASES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {copy.secondaryCta}
                </a>
                <SmartLink className="button button-secondary" href={docsFirstRunUrl}>
                  {copy.tertiaryCta}
                </SmartLink>
              </div>
            </article>

            <article className="panel-subtle download-side-card">
              <p className="card-kicker">{copy.sideKicker}</p>
              <h3>{copy.sideTitle}</h3>
              <ul className="download-side-list">
                {copy.sidePoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="panel section-card screenshot-section">
          <SectionIntro
            kicker={copy.screenshotKicker}
            title={copy.screenshotTitle}
            description={copy.screenshotDescription}
          />

          <div className="screenshot-grid">
            {copy.screenshots.map((shot, index) => (
              <article
                className={`screenshot-placeholder screenshot-card ${index === 0 ? 'placeholder-wide' : ''}`}
                key={shot.title}
                aria-label={shot.title}
              >
                <div className="screenshot-image-wrap">
                  <img className="screenshot-image" src={shot.src} alt={shot.title} loading="lazy" />
                </div>
                <span className="placeholder-index">{String(index + 1).padStart(2, '0')}</span>
                <strong>{shot.title}</strong>
                <p>{shot.description}</p>
              </article>
            ))}
          </div>

          <p className="download-note screenshot-note">{copy.screenshotNote}</p>
        </section>
      </main>

      <footer className="footer-line">
        <p>{content.footer.home}</p>
      </footer>
    </div>
  )
}
