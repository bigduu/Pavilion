import { useState } from 'react'
import type { Locale, Translation } from '../types'
import {
  BODHI_GITHUB_URL,
  BODHI_INSTALL_COMMAND,
  BODHI_INSTALL_SCRIPT_URL,
  BODHI_LATEST_RELEASE_URL,
  BODHI_RELEASES_URL,
} from '../constants'
import { buildUrl } from '../utils/locale'
import { publicAsset } from '../utils/publicAsset'
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
  const [copyStatus, setCopyStatus] = useState<'copied' | 'copyFailed' | null>(null)

  async function copyInstallCommand() {
    try {
      await navigator.clipboard.writeText(BODHI_INSTALL_COMMAND)
      setCopyStatus('copied')
    } catch {
      setCopyStatus('copyFailed')
    }
  }

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

        <section className="panel section-card install-card" id="terminal-install">
          <h2>{copy.installer.title}</h2>
          <p className="download-note">{copy.installer.platforms}</p>
          <pre className="install-command" tabIndex={0}>
            <code>{BODHI_INSTALL_COMMAND}</code>
          </pre>
          <div className="hero-actions install-actions">
            <button className="button button-primary" type="button" onClick={copyInstallCommand}>
              {copy.installer.copy}
            </button>
            <a className="link-inline" href={BODHI_INSTALL_SCRIPT_URL} download="install.sh">
              {copy.installer.source}
            </a>
            <span className="download-note" role="status">
              {copyStatus && copy.installer[copyStatus]}
            </span>
          </div>
          <p className="download-note">{copy.installer.macos}</p>
          <p className="download-note">{copy.installer.linux}</p>
        </section>

        <section className="panel section-card" id="platforms">
          <h2>{copy.platformsTitle}</h2>
          <p className="download-note">{copy.platformsNote}</p>
          <table className="platform-table">
            <tbody>
              {copy.platforms.map((row) => (
                <tr key={row.platform}>
                  <th scope="row">{row.platform}</th>
                  <td>
                    <a href={BODHI_LATEST_RELEASE_URL} target="_blank" rel="noopener noreferrer">
                      {row.method}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                  <img className="screenshot-image" src={publicAsset(shot.src)} alt={shot.title} loading="lazy" />
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
