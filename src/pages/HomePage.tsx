import type { Locale, Translation } from '../types'
import { BODHI_GITHUB_URL, techStack } from '../constants'
import { buildUrl } from '../utils/locale'
import { LanguageSwitch } from '../components/LanguageSwitch'
import { SectionIntro } from '../components/SectionIntro'
import { RevealSection } from '../components/RevealSection'
import { SmartLink } from '../components/SmartLink'
import { Icon } from '../components/Icon'
import { CountUp } from '../components/CountUp'

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

  return (
    <div className="page-shell">
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

        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#why-bodhi">{content.nav.highlights}</a>
          <SmartLink href={featuresUrl}>{content.nav.features}</SmartLink>
          <SmartLink href={downloadUrl}>{content.nav.download}</SmartLink>
          <a href="#faq">{content.nav.faq}</a>
          <SmartLink href={docsUrl}>{content.nav.docs}</SmartLink>
          <a href={BODHI_GITHUB_URL} target="_blank" rel="noopener noreferrer">
            {content.nav.github}
          </a>
        </nav>

        <LanguageSwitch locale={locale} onChange={setLocale} label={content.nav.language} />
      </header>

      <main className="home-main">
        <RevealSection className="panel hero-panel" startVisible>
          <div className="hero-copy">
            <p className="hero-kicker">{content.hero.kicker}</p>
            <h1>{content.hero.title}</h1>
            <p className="hero-subtitle">{content.hero.subtitle}</p>

            <div className="chip-row" aria-label="Product highlights">
              {content.hero.chips.map((chip) => (
                <span className="chip" key={chip}>
                  {chip}
                </span>
              ))}
            </div>

            <div className="hero-actions">
              <SmartLink className="button button-primary" href={downloadUrl}>
                {content.download.primaryCta}
              </SmartLink>
              <SmartLink className="button button-secondary" href={docsFirstRunUrl}>
                {content.download.secondaryCta}
              </SmartLink>
              <a
                className="link-inline hero-link-inline"
                href={BODHI_GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content.download.githubCta}
              </a>
            </div>

            <dl className="hero-stats">
              {content.hero.stats.map((stat) => (
                <div className="panel-subtle stat-card" key={stat.label}>
                  <dd>
                    <CountUp value={stat.value} />
                  </dd>
                  <dt>{stat.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <aside className="live-panel panel-subtle" aria-label={content.hero.liveLabel}>
            <div className="live-panel-head">
              <span className="live-pill">{content.hero.liveLabel}</span>
              <span className="live-signal">SSE</span>
            </div>

            <div className="hero-product-shot">
              <div className="hero-product-topbar">
                <span className="hero-product-chip">Bodhi Desktop</span>
                <span className="hero-product-chip hero-product-chip-live">Live execution</span>
              </div>
              <img
                className="hero-product-image"
                src="/screenshots/bodhi-system-settings-provider.png"
                alt={locale === 'zh' ? 'Bodhi System Settings 界面截图' : 'Bodhi System Settings screenshot'}
                loading="eager"
              />
              <div className="hero-product-inset">
                <img
                  className="hero-product-inset-image"
                  src="/screenshots/bodhi-skills.png"
                  alt={locale === 'zh' ? 'Bodhi Skills 界面截图' : 'Bodhi skills inset'}
                  loading="lazy"
                />
              </div>
              <div className="hero-product-caption">
                <strong>{locale === 'zh' ? '真实 Bodhi 功能中心' : 'Real Bodhi control surface'}</strong>
                <span>
                  {locale === 'zh'
                    ? '本地运行、设置中心与技能系统都已经是完整产品界面'
                    : 'Local-first, fully configurable, real product surfaces'}
                </span>
              </div>
            </div>

            <h2>{content.hero.liveTitle}</h2>
            <p className="live-summary">{content.hero.liveSummary}</p>

            <div className="badge-row" aria-label="Stack badges">
              {content.hero.liveBadges.map((badge) => (
                <span className="badge" key={badge}>
                  {badge}
                </span>
              ))}
            </div>

            <div className="timeline">
              {content.hero.liveTimeline.map((event) => (
                <div className="timeline-item" key={`${event.time}-${event.title}`}>
                  <span className={`status-dot status-${event.state}`} aria-hidden="true" />
                  <span className="timeline-time">{event.time}</span>
                  <p>{event.title}</p>
                </div>
              ))}
            </div>
          </aside>
        </RevealSection>

        <section className="panel marquee-panel" aria-hidden="true">
          <div className="marquee">
            <div className="marquee-track">
              {[...techStack, ...techStack].map((token, index) => (
                <span className="marquee-chip" key={`${token}-${index}`}>
                  {token}
                </span>
              ))}
            </div>
          </div>
        </section>

        <RevealSection id="why-bodhi" className="panel section-card highlights-section">
          <SectionIntro
            kicker={content.highlights.kicker}
            title={content.highlights.title}
          />

          <div className="highlights-grid">
            {content.highlights.items.map((item) => (
              <article className="panel-subtle highlight-card" key={item.title}>
                <span className="card-icon">
                  <Icon name={item.icon} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </RevealSection>

        <RevealSection className="panel section-card showcase-section">
          <SectionIntro
            kicker={content.showcase.kicker}
            title={content.showcase.title}
          />

          <div className="showcase-grid">
            {content.showcase.panels.map((panel, index) => (
              <article className={`panel-subtle showcase-card ${index === 0 ? 'featured' : ''}`} key={panel.title}>
                <div className="showcase-media">
                  <img className="showcase-image" src={panel.imageSrc} alt={panel.imageAlt} loading="lazy" />
                </div>
                <div className="showcase-head">
                  <p className="card-kicker">{panel.kicker}</p>
                  <span className="showcase-badge">{panel.badge}</span>
                </div>
                <h3>{panel.title}</h3>
              </article>
            ))}
          </div>
        </RevealSection>

        <RevealSection id="capabilities" className="panel section-card">
          <SectionIntro
            kicker={content.capabilities.kicker}
            title={content.capabilities.title}
          />

          <div className="capability-grid">
            {content.capabilities.items.map((item) => {
              const link = item.featureId
                ? buildUrl('/features', locale, item.featureId)
                : featuresUrl
              return (
                <article className="panel-subtle capability-card" key={item.title}>
                  <div className="capability-head">
                    <span className="card-icon">
                      <Icon name={item.icon} />
                    </span>
                    <p className="card-kicker">{item.kicker}</p>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <SmartLink className="link-inline" href={link}>
                    {locale === 'zh' ? '了解更多' : 'Learn more'}
                  </SmartLink>
                </article>
              )
            })}
          </div>
        </RevealSection>

        <RevealSection id="faq" className="panel section-card faq-section">
          <SectionIntro
            kicker={content.faq.kicker}
            title={content.faq.title}
          />

          <div className="faq-list">
            {content.faq.items.map((item) => (
              <details className="panel-subtle faq-item" key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </RevealSection>

        <RevealSection className="panel final-cta">
          <div>
            <p className="section-kicker">GET STARTED</p>
            <h2>
              {locale === 'zh'
                ? '从 Bodhi 开始，让 AI 真正替你推进工作'
                : 'Start with Bodhi. Let AI actually move your work forward.'}
            </h2>
          </div>

          <div className="hero-actions final-actions">
            <SmartLink className="button button-primary" href={downloadUrl}>
              {content.download.primaryCta}
            </SmartLink>
            <SmartLink className="button button-secondary" href={docsUrl}>
              {content.download.secondaryCta}
            </SmartLink>
          </div>
        </RevealSection>
      </main>

      <footer className="footer-line">
        <p>{content.footer.home}</p>
      </footer>
    </div>
  )
}
