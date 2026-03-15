import { useEffect, useMemo, useRef, useState } from 'react'

type Locale = 'zh' | 'en'

type Feature = {
  kicker: string
  title: string
  description: string
  points: string[]
  metric: string
  caption: string
}

type DocSection = {
  id: string
  title: string
  paragraphs: string[]
  bullets?: string[]
  code?: string
}

type Translation = {
  meta: {
    homeTitle: string
    docsTitle: string
  }
  nav: {
    brand: string
    features: string
    docs: string
    github: string
    home: string
    language: string
    overview: string
    userGuide: string
    developerGuide: string
    references: string
  }
  hero: {
    kicker: string
    title: string
    subtitle: string
    primaryCta: string
    secondaryCta: string
    scrollHint: string
  }
  featureIntro: {
    kicker: string
    title: string
    description: string
  }
  features: Feature[]
  docs: {
    kicker: string
    title: string
    description: string
    updatedLabel: string
    tocTitle: string
    sections: DocSection[]
  }
  footer: {
    home: string
    docs: string
  }
}

const LANGUAGE_STORAGE_KEY = 'pavilion-locale'

const translations: Record<Locale, Translation> = {
  zh: {
    meta: {
      homeTitle: 'Zenith Pavilion',
      docsTitle: 'Zenith 文档中心 - Pavilion',
    },
    nav: {
      brand: 'Zenith Pavilion',
      features: '功能',
      docs: '文档',
      github: 'GitHub',
      home: '首页',
      language: '语言',
      overview: '概览',
      userGuide: '用户指南',
      developerGuide: '开发者指南',
      references: '参考',
    },
    hero: {
      kicker: 'ZENITH · 你的 AI 工作搭档',
      title: '把想法说出来，Zenith 帮你把事情做完。',
      subtitle:
        '不用懂命令、不用懂模型，像聊天一样描述目标，Zenith 会一步步帮你推进。',
      primaryCta: '开始使用',
      secondaryCta: '查看 GitHub',
      scrollHint: '向下滑动，看看 Zenith 如何帮你完成工作',
    },
    featureIntro: {
      kicker: 'Why Zenith',
      title: '从“不会用”到“真上手”',
      description:
        '我们把复杂能力藏在后面，给你的是简单、清晰、可持续的使用体验。',
    },
    features: [
      {
        kicker: '01 · Easy Start',
        title: '第一次打开就能开始，不需要学习成本',
        description:
          '桌面端提供引导式设置流程，你可以先快速进入，再按需完善配置。',
        points: [
          '有引导，不迷路',
          '支持常见网络环境',
          '从打开到开始只需几步',
        ],
        metric: 'Start Fast',
        caption: 'Welcome -> Setup -> Start',
      },
      {
        kicker: '02 · Just Talk',
        title: '像聊天一样提出需求',
        description:
          '直接告诉 Zenith 你要做什么，它会持续反馈进度、结果和下一步建议。',
        points: [
          '实时看到回复增长',
          '每一步都可追踪',
          '复杂任务也不会丢上下文',
        ],
        metric: 'Live',
        caption: 'Speak -> Progress -> Result',
      },
      {
        kicker: '03 · Work Smarter',
        title: '重复工作自动化，把时间留给更重要的事',
        description:
          '常做任务可以沉淀为流程和计划，让系统按你的节奏自动执行。',
        points: [
          '可保存工作流模板',
          '支持定时自动运行',
          '结果可回看可复用',
        ],
        metric: 'Auto',
        caption: 'Template + Schedule',
      },
      {
        kicker: '04 · Everywhere',
        title: '网页、桌面、文档一体化',
        description:
          '无论你在浏览器还是桌面应用，体验都一致；需要深入时，文档也能快速找到答案。',
        points: ['网页与桌面体验一致', '多人协作更顺畅', '文档支持中英双语'],
        metric: 'All-in-one',
        caption: 'Web + Desktop + Docs',
      },
    ],
    docs: {
      kicker: 'Documentation',
      title: 'Zenith 文档中心（基于当前代码）',
      description:
        '本页用于完整文字说明。首页讲价值，文档讲实现细节、API、运行方式与协作规范。',
      updatedLabel: '最近更新',
      tocTitle: '目录',
      sections: [
        {
          id: 'overview',
          title: '概览',
          paragraphs: [
            'Zenith 由 4 个模块组成：Bamboo（Rust 后端与 Agent runtime）、Lotus（React + Vite Web 客户端）、Bodhi（Tauri 桌面壳）、Pavilion（官网与文档）。',
            '核心交互链路是：Lotus/Bodhi 调用 Bamboo `/api/v1/*`，并通过 `/api/v1/events/{session_id}` 订阅流式事件。Pavilion 不参与执行面，专注对外介绍和知识沉淀。',
            '文档结构坚持“短首页 + 长文档”：首页只传达价值与入口，细节统一收敛到文档页。',
          ],
          bullets: ['首页：口号 + 入口', '功能区：滚动动画分段介绍', '文档页：用户与开发者完整手册'],
        },
        {
          id: 'user-guide',
          title: '用户指南',
          paragraphs: [
            '首次启动 Bodhi 时会进入 SetupPage，可检测网络环境并配置代理；完成后进入主界面。',
            '创建会话后，执行由 `/api/v1/execute/{session_id}` 启动，界面通过 SSE 实时显示 token、tool 调用、Todo 进度和 sub-session 状态。',
            '如果要扩展能力，优先在 System Settings 配置 Provider、MCP Server、Workflows 与 Schedules。',
          ],
          bullets: ['先跑通 Setup + Provider', '再连接 MCP 与工具', '最后用 Schedule 做自动执行'],
        },
        {
          id: 'developer-guide',
          title: '开发者指南',
          paragraphs: [
            '仓库采用 monorepo + submodule。功能改动应先在对应子模块提交，再在根仓更新 submodule pointer。',
            'Bamboo 路由主要在 `src/server/routes`；Lotus 的流式事件订阅与多窗格在 `useAgentEventSubscription.ts` 和 `MultiPaneChatView`；Bodhi 的嵌入式服务与快捷键在 `src-tauri/src/lib.rs`。',
            '提交前至少运行受影响模块测试：后端跑 `cargo test`，前端跑 `npm run test:run`，UI 跨页流程补充 e2e。',
          ],
          bullets: ['先改子模块再改根仓指针', 'Conventional Commits', 'PR 附带测试与截图证据'],
        },
        {
          id: 'architecture',
          title: '架构与模块',
          paragraphs: [
            'Bamboo `/api/v1` 暴露 chat、execute、events、sessions、schedules、metrics 与 mcp 管理端点。',
            'Provider 兼容前缀在 `provider.rs`：`/openai/v1/*`、`/anthropic/v1/*`、`/gemini/v1beta/*`。',
            '工具层含 21 个内置工具；服务端叠加 `Task`（spawn child session）、`schedule_tasks`、`sub_session_manager` 等 server-only 能力。',
          ],
          bullets: ['Bamboo: 执行内核与 API', 'Lotus: 会话 UI 与设置中心', 'Bodhi: 桌面集成与本地服务', 'Pavilion: 对外网站与文档'],
        },
        {
          id: 'api',
          title: '关键 API',
          paragraphs: [
            '下面是当前实现中最常用的接口分组，便于前端、桌面端和自动化脚本快速对齐。',
          ],
          code: `# core session runtime
POST /api/v1/chat
POST /api/v1/execute/{session_id}
GET  /api/v1/events/{session_id}
POST /api/v1/stop/{session_id}
GET  /api/v1/history/{session_id}

# sessions and schedules
GET|POST          /api/v1/sessions
PATCH|DELETE      /api/v1/sessions/{session_id}
GET|POST          /api/v1/schedules
PATCH|DELETE      /api/v1/schedules/{schedule_id}
POST              /api/v1/schedules/{schedule_id}/run
GET               /api/v1/schedules/{schedule_id}/sessions

# mcp
GET|POST          /api/v1/mcp/servers
POST              /api/v1/mcp/servers/import
POST              /api/v1/mcp/servers/{id}/connect
POST              /api/v1/mcp/servers/{id}/disconnect
POST              /api/v1/mcp/servers/{id}/refresh
GET               /api/v1/mcp/tools

# provider-compatible prefixes
POST /openai/v1/chat/completions
POST /openai/v1/responses
POST /anthropic/v1/messages
POST /gemini/v1beta/models/{model}:generateContent`,
        },
        {
          id: 'references',
          title: '命令参考',
          paragraphs: [
            '下方命令覆盖仓库初始化、各模块开发和提交前检查，建议保持为可复制即运行。',
          ],
          code: `git clone --recursive https://github.com/bigduu/Zenith.git
cd Zenith

git submodule update --init --recursive
git submodule status

# bamboo
cd bamboo
cargo build
cargo test

# lotus
cd ../lotus
npm run dev
npm run type-check
npm run test:run

# bodhi
cd ../bodhi
npm run tauri:dev

# pavilion
cd ../pavilion
npm run dev
npm run lint
npm run build

# root pointer update
cd ..
git add bamboo lotus bodhi pavilion
git commit -m "chore: bump submodule pointers"`,
        },
      ],
    },
    footer: {
      home: 'Zenith Pavilion · Product Story Surface',
      docs: 'Zenith Pavilion Docs · User & Developer Handbook',
    },
  },
  en: {
    meta: {
      homeTitle: 'Zenith Pavilion',
      docsTitle: 'Zenith Docs - Pavilion',
    },
    nav: {
      brand: 'Zenith Pavilion',
      features: 'Features',
      docs: 'Docs',
      github: 'GitHub',
      home: 'Home',
      language: 'Language',
      overview: 'Overview',
      userGuide: 'User Guide',
      developerGuide: 'Developer Guide',
      references: 'References',
    },
    hero: {
      kicker: 'ZENITH · AI ENGINEERING WORKBENCH',
      title: 'Tell Zenith what you want, and watch it move work forward.',
      subtitle:
        'No complex setup language, no steep learning curve. Just describe your goal and Zenith guides you step by step.',
      primaryCta: 'Get Started',
      secondaryCta: 'View GitHub',
      scrollHint: 'Scroll to see how Zenith helps in daily work',
    },
    featureIntro: {
      kicker: 'Why Zenith',
      title: 'Built for people who just want to get things done',
      description:
        'Powerful internals stay under the hood, so your experience stays clear and simple.',
    },
    features: [
      {
        kicker: '01 · Easy Start',
        title: 'Start quickly, even on your first day',
        description:
          'A guided setup gets you in fast, and you can refine settings later as your needs grow.',
        points: [
          'Guided onboarding flow',
          'Works in common network setups',
          'From open to productive in minutes',
        ],
        metric: 'Start Fast',
        caption: 'Welcome -> Setup -> Start',
      },
      {
        kicker: '02 · Just Talk',
        title: 'Describe your goal in plain language',
        description:
          'Zenith keeps the conversation moving with visible progress, clear outcomes, and practical next steps.',
        points: [
          'Live progress while it works',
          'Clear, traceable steps',
          'Stays consistent on complex tasks',
        ],
        metric: 'Live',
        caption: 'Speak -> Progress -> Result',
      },
      {
        kicker: '03 · Work Smarter',
        title: 'Automate repeatable work',
        description:
          'Turn recurring routines into reusable workflows and schedules, then let Zenith run them for you.',
        points: [
          'Save reusable workflow templates',
          'Run tasks on a schedule',
          'Review results anytime',
        ],
        metric: 'Auto',
        caption: 'Template + Schedule',
      },
      {
        kicker: '04 · Everywhere',
        title: 'One experience across web, desktop, and docs',
        description:
          'Use Zenith where you work: browser or desktop, with docs that are ready when you need deeper guidance.',
        points: [
          'Consistent web and desktop experience',
          'Smooth team collaboration',
          'Bilingual docs (EN / 中文)',
        ],
        metric: 'All-in-one',
        caption: 'Web + Desktop + Docs',
      },
    ],
    docs: {
      kicker: 'Documentation',
      title: 'Zenith Documentation Hub (Code-grounded)',
      description:
        'Home is for value framing and momentum. Docs are for implementation detail, APIs, runtime behavior, and contributor workflows.',
      updatedLabel: 'Last updated',
      tocTitle: 'Table of contents',
      sections: [
        {
          id: 'overview',
          title: 'Overview',
          paragraphs: [
            'Zenith has four modules: Bamboo (Rust backend + agent runtime), Lotus (React + Vite web client), Bodhi (Tauri desktop shell), and Pavilion (website + documentation).',
            'Core runtime flow is Lotus or Bodhi calling Bamboo `/api/v1/*` and subscribing to `/api/v1/events/{session_id}` for streaming updates.',
            'Pavilion is intentionally split into a short home and long-form docs so first-time and advanced users both get the right depth quickly.',
          ],
          bullets: ['Home: slogan + action', 'Feature area: staged scroll narrative', 'Docs: full user and developer handbook'],
        },
        {
          id: 'user-guide',
          title: 'User Guide',
          paragraphs: [
            'On first launch, Bodhi opens SetupPage to detect network requirements and configure proxy settings before entering the main app.',
            'When a session runs, execution starts via `/api/v1/execute/{session_id}` and progress streams over SSE with token, tool, todo, and sub-session events.',
            'To expand capabilities, configure provider, MCP servers, workflows, and schedules from the System Settings center in Lotus.',
          ],
          bullets: ['Setup and provider first', 'Connect MCP when needed', 'Use schedules for repeatable automation'],
        },
        {
          id: 'developer-guide',
          title: 'Developer Guide',
          paragraphs: [
            'The repository uses monorepo plus Git submodules. Commit changes inside each submodule first, then update pointers in root.',
            'Bamboo routes are under `src/server/routes`. Lotus streaming and multi-pane behavior lives in `useAgentEventSubscription.ts` and `MultiPaneChatView`. Bodhi desktop orchestration lives in `src-tauri/src/lib.rs`.',
            'Before PRs, run impacted test suites: `cargo test` for backend and `npm run test:run` plus e2e where relevant for UI flows.',
          ],
          bullets: ['Submodule-first commit order', 'Conventional Commit messages', 'Attach tests and screenshots in PR'],
        },
        {
          id: 'architecture',
          title: 'Architecture and Modules',
          paragraphs: [
            'Bamboo `/api/v1` includes chat, execute, events, sessions, schedules, metrics, and MCP management endpoints.',
            'Provider-compatible prefixes are defined in `provider.rs`: `/openai/v1/*`, `/anthropic/v1/*`, and `/gemini/v1beta/*`.',
            'Tooling includes 21 built-ins, plus server-only overlays such as `Task` (spawn child session), `schedule_tasks`, and `sub_session_manager`.',
          ],
          bullets: ['Bamboo: execution core and APIs', 'Lotus: chat UX and settings center', 'Bodhi: desktop integration and embedded backend', 'Pavilion: public website and docs'],
        },
        {
          id: 'api',
          title: 'Key APIs',
          paragraphs: [
            'Use this quick index to align web, desktop, and automation clients with the current backend surface.',
          ],
          code: `# core runtime
POST /api/v1/chat
POST /api/v1/execute/{session_id}
GET  /api/v1/events/{session_id}
POST /api/v1/stop/{session_id}
GET  /api/v1/history/{session_id}

# sessions and schedules
GET|POST          /api/v1/sessions
PATCH|DELETE      /api/v1/sessions/{session_id}
GET|POST          /api/v1/schedules
PATCH|DELETE      /api/v1/schedules/{schedule_id}
POST              /api/v1/schedules/{schedule_id}/run
GET               /api/v1/schedules/{schedule_id}/sessions

# mcp
GET|POST          /api/v1/mcp/servers
POST              /api/v1/mcp/servers/import
POST              /api/v1/mcp/servers/{id}/connect
POST              /api/v1/mcp/servers/{id}/disconnect
POST              /api/v1/mcp/servers/{id}/refresh
GET               /api/v1/mcp/tools

# provider-compatible prefixes
POST /openai/v1/chat/completions
POST /openai/v1/responses
POST /anthropic/v1/messages
POST /gemini/v1beta/models/{model}:generateContent`,
        },
        {
          id: 'references',
          title: 'Command References',
          paragraphs: [
            'Keep this list copy-paste ready. It covers bootstrap, per-module development, and pre-PR checks.',
          ],
          code: `git clone --recursive https://github.com/bigduu/Zenith.git
cd Zenith

git submodule update --init --recursive
git submodule status

# bamboo
cd bamboo
cargo build
cargo test

# lotus
cd ../lotus
npm run dev
npm run type-check
npm run test:run

# bodhi
cd ../bodhi
npm run tauri:dev

# pavilion
cd ../pavilion
npm run dev
npm run lint
npm run build

# root pointer update
cd ..
git add bamboo lotus bodhi pavilion
git commit -m "chore: bump submodule pointers"`,
        },
      ],
    },
    footer: {
      home: 'Zenith Pavilion · Product Story Surface',
      docs: 'Zenith Pavilion Docs · User & Developer Handbook',
    },
  },
}

function getInitialLocale(): Locale {
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

function buildUrl(pathname: string, locale: Locale, hash?: string): string {
  const suffix = hash ? `#${hash}` : ''
  return `${pathname}?lang=${locale}${suffix}`
}

function useReveal<T extends HTMLElement>(startVisible = false) {
  const elementRef = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(startVisible)

  useEffect(() => {
    if (startVisible) {
      return
    }

    const node = elementRef.current
    if (!node) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.34 },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [startVisible])

  return { elementRef, isVisible }
}

function LanguageSwitch({
  locale,
  onChange,
  label,
}: {
  locale: Locale
  onChange: (locale: Locale) => void
  label: string
}) {
  return (
    <div className="locale-switch" role="group" aria-label={label}>
      <button
        className={locale === 'zh' ? 'locale-button active' : 'locale-button'}
        type="button"
        onClick={() => onChange('zh')}
      >
        中文
      </button>
      <button
        className={locale === 'en' ? 'locale-button active' : 'locale-button'}
        type="button"
        onClick={() => onChange('en')}
      >
        EN
      </button>
    </div>
  )
}

function FeatureStep({ feature, index }: { feature: Feature; index: number }) {
  const { elementRef, isVisible } = useReveal<HTMLElement>(index === 0)
  const reverse = index % 2 === 1

  return (
    <article
      ref={elementRef}
      className={`feature-step ${reverse ? 'reverse' : ''} ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="panel feature-copy">
        <p className="feature-kicker">{feature.kicker}</p>
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
        <ul>
          {feature.points.map((point, pointIndex) => (
            <li key={`${feature.title}-${pointIndex}`}>{point}</li>
          ))}
        </ul>
      </div>

      <div className="panel feature-visual" aria-hidden="true">
        <span className="feature-index">{String(index + 1).padStart(2, '0')}</span>
        <strong className="feature-metric">{feature.metric}</strong>
        <p>{feature.caption}</p>
        <div className={`motion-ring ring-${(index % 4) + 1}`} />
      </div>
    </article>
  )
}

function HomePage({
  locale,
  setLocale,
  content,
}: {
  locale: Locale
  setLocale: (locale: Locale) => void
  content: Translation
}) {
  const docsUrl = buildUrl('/docs', locale, 'overview')

  return (
    <div className="page-shell">
      <div className="ambient ambient-a" aria-hidden="true" />
      <div className="ambient ambient-b" aria-hidden="true" />

      <header className="top-nav panel">
        <a className="brand" href={buildUrl('/', locale)}>
          {content.nav.brand}
        </a>

        <nav className="nav-links" aria-label="Primary">
          <a href="#features">{content.nav.features}</a>
          <a href={docsUrl}>{content.nav.docs}</a>
          <a href="https://github.com/bigduu/Zenith" target="_blank" rel="noopener noreferrer">
            {content.nav.github}
          </a>
        </nav>

        <LanguageSwitch locale={locale} onChange={setLocale} label={content.nav.language} />
      </header>

      <main>
        <section className="hero-minimal panel">
          <p className="hero-kicker">{content.hero.kicker}</p>
          <h1>{content.hero.title}</h1>
          <p className="hero-subtitle">{content.hero.subtitle}</p>

          <div className="hero-actions">
            <a className="button button-primary" href={docsUrl}>
              {content.hero.primaryCta}
            </a>
            <a
              className="button button-ghost"
              href="https://github.com/bigduu/Pavilion"
              target="_blank"
              rel="noopener noreferrer"
            >
              {content.hero.secondaryCta}
            </a>
          </div>

          <p className="scroll-cue">{content.hero.scrollHint}</p>
        </section>

        <section className="feature-intro" id="features">
          <p>{content.featureIntro.kicker}</p>
          <h2>{content.featureIntro.title}</h2>
          <span>{content.featureIntro.description}</span>
        </section>

        <section className="feature-story">
          {content.features.map((feature, index) => (
            <FeatureStep key={`${feature.title}-${index}`} feature={feature} index={index} />
          ))}
        </section>
      </main>

      <footer className="footer-line">
        <p>{content.footer.home}</p>
      </footer>
    </div>
  )
}

function DocsPage({
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

      <header className="top-nav panel">
        <a className="brand" href={buildUrl('/', locale)}>
          {content.nav.brand}
        </a>

        <nav className="nav-links" aria-label="Documentation navigation">
          <a href={buildUrl('/', locale)}>{content.nav.home}</a>
          <a href="#overview">{content.nav.overview}</a>
          <a href="#user-guide">{content.nav.userGuide}</a>
          <a href="#developer-guide">{content.nav.developerGuide}</a>
          <a href="#references">{content.nav.references}</a>
        </nav>

        <LanguageSwitch locale={locale} onChange={setLocale} label={content.nav.language} />
      </header>

      <main className="docs-main">
        <section className="docs-hero panel">
          <p>{content.docs.kicker}</p>
          <h1>{content.docs.title}</h1>
          <p>{content.docs.description}</p>
          <small>
            {content.docs.updatedLabel}: {updatedAt}
          </small>
        </section>

        <div className="docs-layout">
          <aside className="docs-toc panel" aria-label={content.docs.tocTitle}>
            <h2>{content.docs.tocTitle}</h2>
            <ul>
              {content.docs.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.title}</a>
                </li>
              ))}
            </ul>
          </aside>

          <article className="docs-content panel">
            {content.docs.sections.map((section) => (
              <section className="doc-section" id={section.id} key={section.id}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={`${section.id}-p-${paragraphIndex}`}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((item, itemIndex) => (
                      <li key={`${section.id}-b-${itemIndex}`}>{item}</li>
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

function App() {
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'
  const isDocsRoute = currentPath === '/docs' || currentPath.startsWith('/docs/')
  const [locale, setLocale] = useState<Locale>(getInitialLocale)
  const content = useMemo(() => translations[locale], [locale])

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, locale)
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'

    const url = new URL(window.location.href)
    url.searchParams.set('lang', locale)
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`)
  }, [locale])

  useEffect(() => {
    document.title = isDocsRoute ? content.meta.docsTitle : content.meta.homeTitle
  }, [content, isDocsRoute])

  return isDocsRoute ? (
    <DocsPage locale={locale} setLocale={setLocale} content={content} />
  ) : (
    <HomePage locale={locale} setLocale={setLocale} content={content} />
  )
}

export default App
