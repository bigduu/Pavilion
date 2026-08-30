import type { Locale, Translation } from '../types'
import { BODHI_GITHUB_URL } from '../constants'
import { buildUrl } from '../utils/locale'
import { LanguageSwitch } from '../components/LanguageSwitch'
import { SmartLink } from '../components/SmartLink'
import { Icon } from '../components/Icon'
import { Reveal } from '../components/Reveal'
import '../apple.css'

// Real Bodhi UI captured from the live app (localhost:1420), one per panel.
const BAND_SHOTS = ['/shots/overview.png', '/shots/settings.png', '/shots/workflow.png']

function Frame({ src, alt, eager = false }: { src: string; alt: string; eager?: boolean }) {
  return (
    <div className="apple-frame">
      <div className="bar" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} />
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
        {/* HERO — full screen: headline + real workbench in a window + SVG chips */}
        <section className="apple-hero">
          <div>
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
          </div>

          <div className="apple-hero-stage">
            <div className="apple-hero-glow a-glow" aria-hidden="true" />
            <Frame
              src="/shots/workbench.png"
              alt={locale === 'zh' ? 'Bodhi 工作台：智能体正在执行任务' : 'Bodhi workbench — the agent executing a task'}
              eager
            />
            <span className="apple-chip a-float" style={{ top: '-16px', right: '5%', animationDelay: '0.2s' }}>
              <span className="dot" style={{ background: '#0071e3' }} />
              MCP
            </span>
            <span className="apple-chip a-float" style={{ bottom: '-14px', left: '5%', animationDelay: '1.2s' }}>
              <span className="dot a-pulse" style={{ background: '#34c759' }} />
              WebSocket
            </span>
          </div>
        </section>

        {/* STATEMENT — full-screen bold line */}
        <section className="apple-statement">
          <Reveal>
            <p className="apple-eyebrow">{content.highlights.kicker}</p>
            <h2>{content.highlights.title}</h2>
          </Reveal>
        </section>

        {/* FEATURE BANDS — one full screen each, real UI floats in on scroll */}
        {content.highlights.items.map((item, i) => (
          <section className={`apple-band ${i % 2 === 0 ? 'alt' : ''}`} key={item.title}>
            <Reveal>
              <h2>{item.title}</h2>
              <p className="sub">{item.description}</p>
              <div className="apple-cta-row">
                <SmartLink className="apple-link" href={featuresUrl}>
                  {learnMore}
                </SmartLink>
              </div>
            </Reveal>
            <Reveal delayMs={130}>
              <Frame src={BAND_SHOTS[i] ?? BAND_SHOTS[0]} alt={item.title} />
            </Reveal>
          </section>
        ))}

        {/* CAPABILITIES — full screen, staggered tiles */}
        <section className="apple-caps">
          <Reveal>
            <h2>{content.capabilities.title}</h2>
          </Reveal>
          <div className="apple-tiles">
            {content.capabilities.items.map((item, i) => (
              <Reveal className="apple-tile" delayMs={i * 90} key={item.title}>
                <Icon name={item.icon} className="ic" />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FINAL CTA — full screen */}
        <section className="apple-final">
          <Reveal>
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
          </Reveal>
        </section>
      </main>

      <footer className="apple-footer">
        <p>{content.footer.home}</p>
      </footer>
    </div>
  )
}
