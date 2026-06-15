import type { Locale, Translation } from '../types'
import { BODHI_GITHUB_URL } from '../constants'
import { buildUrl } from '../utils/locale'
import { LanguageSwitch } from '../components/LanguageSwitch'
import { SmartLink } from '../components/SmartLink'
import { Icon } from '../components/Icon'
import { HeroArt, ExecutesArt, VisibleArt, CompoundsArt } from '../components/illustrations'
import '../apple.css'

const BAND_ARTS = [ExecutesArt, VisibleArt, CompoundsArt]

export function HomePage({
  locale,
  setLocale,
  content,
}: {
  locale: Locale
  setLocale: (locale: Locale) => void
  content: Translation
}) {
  const downloadUrl = buildUrl('/download', locale)
  const docsFirstRunUrl = buildUrl('/docs', locale, 'first-run')
  const docsUrl = buildUrl('/docs', locale, 'overview')
  const featuresUrl = buildUrl('/features', locale)
  const learnMore = locale === 'zh' ? '了解更多' : 'Learn more'

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
        {/* HERO */}
        <section className="apple-hero">
          <p className="apple-eyebrow">{content.hero.kicker}</p>
          <h1>{content.hero.title}</h1>
          <p className="sub">{content.hero.subtitle}</p>
          <div className="apple-cta-row">
            <SmartLink className="apple-btn" href={downloadUrl}>
              {content.download.primaryCta}
            </SmartLink>
            <SmartLink className="apple-link" href={docsFirstRunUrl}>
              {content.download.secondaryCta}
            </SmartLink>
          </div>
          <div className="apple-hero-art">
            <HeroArt />
          </div>
        </section>

        {/* HIGHLIGHTS — alternating feature bands with SVG art */}
        <div className="apple-section-head">
          <p className="apple-eyebrow">{content.highlights.kicker}</p>
          <h2>{content.highlights.title}</h2>
        </div>

        {content.highlights.items.map((item, i) => {
          const Art = BAND_ARTS[i] ?? ExecutesArt
          return (
            <section className={`apple-band ${i % 2 === 0 ? 'alt' : ''}`} key={item.title}>
              <h2>{item.title}</h2>
              <p className="sub">{item.description}</p>
              <div className="apple-cta-row">
                <SmartLink className="apple-link" href={featuresUrl}>
                  {learnMore}
                </SmartLink>
              </div>
              <div className="apple-art">
                <Art />
              </div>
            </section>
          )
        })}

        {/* CAPABILITIES — tile grid */}
        <div className="apple-section-head">
          <h2>{content.capabilities.title}</h2>
        </div>

        <section className="apple-tiles">
          {content.capabilities.items.map((item) => (
            <article className="apple-tile" key={item.title}>
              <Icon name={item.icon} className="ic" />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </section>

        {/* FINAL CTA */}
        <section className="apple-final">
          <h2>
            {locale === 'zh'
              ? '从 Bodhi 开始，让 AI 真正替你推进工作'
              : 'Start with Bodhi. Let AI actually move your work forward.'}
          </h2>
          <div className="apple-cta-row">
            <SmartLink className="apple-btn" href={downloadUrl}>
              {content.download.primaryCta}
            </SmartLink>
            <SmartLink className="apple-link" href={docsUrl}>
              {content.download.secondaryCta}
            </SmartLink>
          </div>
        </section>
      </main>

      <footer className="apple-footer">
        <p>{content.footer.home}</p>
      </footer>
    </div>
  )
}
