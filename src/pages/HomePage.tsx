import type { Locale, Translation } from '../types'
import { BODHI_GITHUB_URL, BODHI_LATEST_RELEASE_URL } from '../constants'
import { buildUrl } from '../utils/locale'
import { publicAsset } from '../utils/publicAsset'
import { LanguageSwitch } from '../components/LanguageSwitch'
import { SmartLink } from '../components/SmartLink'
import { Reveal } from '../components/Reveal'
import '../apple.css'

const HERO_SHOT = '/shots/workbench.png'

function Frame({ src, alt, eager = false }: { src: string; alt: string; eager?: boolean }) {
  return (
    <div className="apple-frame">
      <div className="bar" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <img src={publicAsset(src)} alt={alt} loading={eager ? 'eager' : 'lazy'} />
    </div>
  )
}

export function HomePage({
  locale,
  setLocale,
  content,
}: {
  locale: Locale
  setLocale: (locale: Locale) => void
  content: Translation
}) {
  const featuresUrl = buildUrl('/features', locale)
  const safetyUrl = buildUrl('/features', locale, 'safety')
  const downloadUrl = buildUrl('/download', locale)
  const docsUrl = buildUrl('/docs', locale)

  return (
    <div className="apple-page">
      <header className="apple-nav">
        <div className="nav-inner">
          <SmartLink className="apple-brand" href={buildUrl('/', locale)}>
            <span className="apple-logo">B</span>
            {content.nav.brand}
          </SmartLink>

          <nav className="apple-nav-links" aria-label="Primary navigation">
            <SmartLink href={featuresUrl}>{content.nav.features}</SmartLink>
            <SmartLink href={safetyUrl}>{content.nav.safety}</SmartLink>
            <SmartLink href={downloadUrl}>{content.nav.download}</SmartLink>
            <SmartLink href={docsUrl}>{content.nav.docs}</SmartLink>
            <a href={BODHI_GITHUB_URL} target="_blank" rel="noopener noreferrer">
              {content.nav.github}
            </a>
          </nav>

          <LanguageSwitch locale={locale} onChange={setLocale} label={content.nav.language} />
        </div>
      </header>

      <main>
        <section className="apple-hero">
          <div className="apple-hero-copy">
            <h1>{content.hero.title}</h1>
            <p className="sub">{content.hero.subtitle}</p>
            <div className="apple-cta-row">
              <a
                className="apple-btn"
                href={BODHI_LATEST_RELEASE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content.hero.primaryCta}
              </a>
              <p className="apple-beside">{content.hero.besideCta}</p>
            </div>
            <p className="apple-fineprint">{content.hero.disclaimer}</p>
          </div>

          <div className="apple-hero-stage">
            <Frame src={HERO_SHOT} alt={content.home.heroImageAlt} eager />
          </div>
        </section>

        <section className="apple-home-block" aria-labelledby="home-doing">
          <h2 id="home-doing">{content.home.cardsTitle}</h2>
          <div className="apple-card-grid">
            {content.home.cards.map((card, index) => {
              const approval = card.approval ?? []
              return (
                <Reveal className="apple-shot-card" delayMs={index * 80} key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  {card.imageSrc ? (
                    <Frame src={card.imageSrc} alt={card.imageAlt || card.title} />
                  ) : null}
                  {approval.length > 0 ? (
                    <div className="apple-approval" aria-label={card.title}>
                      {approval.map((choice, choiceIndex) => (
                        <span className={choiceIndex === approval.length - 1 ? 'is-primary' : ''} key={choice}>
                          {choice}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </Reveal>
              )
            })}
          </div>
        </section>

        <section className="apple-home-block alt" aria-labelledby="home-contrast">
          <h2 id="home-contrast">{content.home.contrastTitle}</h2>
          <div className="apple-contrast-grid">
            {content.home.contrast.map((column) => (
              <article
                className={column.highlight ? 'apple-contrast-col is-highlight' : 'apple-contrast-col'}
                key={column.title}
              >
                <h3>{column.title}</h3>
                <ul>
                  {column.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="apple-download-band">
          <h2>{content.home.downloadTitle}</h2>
          <a
            className="apple-btn"
            href={BODHI_LATEST_RELEASE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.home.downloadCta}
          </a>
        </section>
      </main>

      <footer className="apple-footer">
        <p>{content.footer.home}</p>
      </footer>
    </div>
  )
}
