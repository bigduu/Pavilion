import type { Translation } from '../types'
import { apiCode, quickstartCode, repoGuideCode } from '../constants'

export const en: Translation = {
  meta: {
    homeTitle: 'Bodhi AI · Desktop AI agent workbench',
    docsTitle: 'Bodhi AI Docs · Setup, automation, and developer paths',
    featuresTitle: 'Bodhi AI Features · Desktop workbench, runtime, and automation',
  },
  nav: {
    brand: 'Bodhi AI',
    brandTagline: 'AI that actually works',
    highlights: 'Why Bodhi',
    features: 'Features',
    download: 'Download',
    faq: 'FAQ',
    docs: 'Docs',
    github: 'GitHub',
    home: 'Home',
    overview: 'Overview',
    firstRun: 'First run',
    powerUsers: 'Power users',
    developers: 'Developers',
    api: 'API',
    bodhiServer: 'Bodhi Server',
    cicd: 'CI/CD',
    multiAgent: 'Multi-Agent',
    security: 'Security',
    language: 'Language',
  },
  hero: {
    kicker: 'BODHI AI',
    title: 'Desktop AI that does more than chat',
    subtitle:
      'Bodhi combines structured execution, visible processes, and long-term automation into a desktop AI product that actually keeps work moving — it breaks down tasks, calls tools, and compounds successful runs into repeatable systems.',
    primaryCta: 'Download Bodhi',
    secondaryCta: 'Quick start',
    chips: ['Actually works', 'Visible by default', 'Compounds over time'],
    stats: [
      { value: 'Rust Runtime', label: 'Structured local execution powered by Bamboo' },
      { value: 'Visible', label: 'Tasks, tools, and event streams stay legible' },
      { value: 'Compounds', label: 'Successful runs become workflows and schedules' },
    ],
    liveLabel: 'Live task stream',
    liveTitle: 'AI that moves tasks, not just replies',
    liveSummary:
      'Bodhi gives AI a product surface, Lotus makes the process visible, and Bamboo gives execution a spine. What you see is not chat — it is a working desktop AI system.',
    liveBadges: ['Bodhi Desktop', 'Lotus UI', 'Bamboo Runtime', 'MCP Tools'],
    liveTimeline: [
      { time: '00:00', title: 'Goal received: prepare weekly summary and draft report', state: 'done' },
      { time: '00:03', title: 'Task plan created and streamed back', state: 'done' },
      { time: '00:08', title: 'MCP connected and execution keeps moving', state: 'live' },
      { time: '00:14', title: 'Result prepared, next run handed to automation', state: 'queued' },
    ],
  },
  highlights: {
    kicker: 'WHY BODHI',
    title: 'More than another chat AI',
    items: [
      {
        title: 'Actually executes',
        description: 'Not just generating answers — it breaks tasks into steps, calls tools, and keeps pushing work forward until the goal is met.',
        points: ['Breaks goals into executable steps', 'Calls built-in tools and MCP extensions', 'Maintains task state through completion'],
      },
      {
        title: 'Visible by default',
        description: 'Task status, tool calls, and event streams are visible in real time. You always know what the AI is doing and where things stand.',
        points: ['SSE-driven live event stream', 'Full visibility into tasks and tools', 'State changes stay trackable'],
      },
      {
        title: 'Compounds over time',
        description: 'Successful runs become Workflows and Schedules. The more you use Bodhi, the more it understands your work patterns.',
        points: ['Workflows preserve successful patterns', 'Schedules create automation rhythm', 'Long-term use creates lasting leverage'],
      },
    ],
  },
  showcase: {
    kicker: 'PRODUCT',
    title: 'Real product surfaces, not concept art',
    panels: [
      {
        kicker: 'System Settings',
        title: 'Unified settings center',
        badge: 'Settings',
        imageSrc: '/screenshots/bodhi-system-settings-provider.png',
        imageAlt: 'Bodhi System Settings screenshot',
      },
      {
        kicker: 'MCP',
        title: 'MCP extensibility',
        badge: 'MCP',
        imageSrc: '/screenshots/bodhi-mcp.png',
        imageAlt: 'Bodhi MCP screenshot',
      },
      {
        kicker: 'Metrics',
        title: 'Usage analytics',
        badge: 'Metrics',
        imageSrc: '/screenshots/bodhi-metrics.png',
        imageAlt: 'Bodhi Metrics screenshot',
      },
    ],
  },
  capabilities: {
    kicker: 'CAPABILITIES',
    title: 'Four core capabilities',
    items: [
      {
        kicker: '01',
        title: 'Desktop workbench',
        description: 'Install, setup, providers, env vars, skills, and metrics — all in one desktop interface.',
        points: ['Desktop-first entry point', 'Guided first-run setup', 'Complete product experience'],
        featureId: 'desktop',
      },
      {
        kicker: '02',
        title: 'Structured runtime',
        description: 'Bamboo provides a local Rust runtime that organizes tasks, tools, memory, and scheduling into an execution core.',
        points: ['Local Rust execution core', 'Context and memory integrated', 'Full HTTP API coverage'],
        featureId: 'runtime',
      },
      {
        kicker: '03',
        title: 'Visible execution',
        description: 'Tasks, tool calls, event streams, and state changes stay visible — even long-running work stays legible.',
        points: ['SSE live feedback', 'Task progress visualization', 'Transparent tool invocations'],
        featureId: 'visible',
      },
      {
        kicker: '04',
        title: 'Automation system',
        description: 'MCP extends capability boundaries, Workflows preserve successful runs, Schedules create long-term automation rhythm.',
        points: ['MCP Server extensibility', 'Workflow reuse', 'Schedule recurring execution'],
        featureId: 'automation',
      },
    ],
  },
  faq: {
    kicker: 'FAQ',
    title: 'Common questions',
    items: [
      {
        question: 'How do Bodhi, Bamboo, and Lotus relate?',
        answer:
          'Bodhi is the desktop product, Lotus is the UI interaction layer, and Bamboo is the local Agent runtime. Together they form a complete desktop AI system.',
      },
      {
        question: 'Is Bodhi just a chat interface?',
        answer:
          'No. It executes tasks, shows live progress, calls tools, connects MCP servers, saves workflows, and automates repeatable work with schedules.',
      },
      {
        question: 'Where should I start?',
        answer:
          'Start with the Bodhi desktop app. Or read the First run section in docs to understand setup before installing.',
      },
      {
        question: 'Where should developers begin?',
        answer:
          'Desktop shell → Bodhi, frontend interactions → Lotus, execution engine → Bamboo. The docs page is organized around these three layers.',
      },
      {
        question: 'What makes Bodhi different from other agent products?',
        answer:
          'Bodhi is not just a UI layer around a model. It is built on Bamboo, a local Rust runtime with its own execution path, context memory, tool system, and automation capabilities — all wrapped in a real desktop product.',
      },
    ],
  },
  download: {
    primaryCta: 'Download Bodhi',
    secondaryCta: 'Quick start',
    githubCta: 'GitHub',
    page: {
      kicker: 'DOWNLOAD BODHI',
      title: 'Download Bodhi AI and start with a desktop agent that actually keeps work moving.',
      description:
        'The stable download entry for Bodhi AI. The primary button always points to the latest GitHub release. You are downloading a desktop workbench built on Bamboo\'s structured Rust runtime.',
      latestKicker: 'Latest release mapping',
      latestTitle: 'Stable download entry: always points to the latest release',
      latestDescription:
        'This route stays fixed even as versions ship. The primary CTA hands users off to the current latest GitHub release automatically.',
      primaryCta: 'Download latest release',
      secondaryCta: 'View all releases',
      tertiaryCta: 'Open quick start',
      routeNote: 'Current mapped URL',
      sideKicker: 'Why Bodhi AI',
      sideTitle: 'You are downloading an AI product that actually works',
      sidePoints: [
        'Breaks work into steps and keeps execution moving',
        'Process stays visible, not a black box',
        'Workflows and schedules add value over time',
      ],
      screenshotKicker: 'REAL BODHI UI',
      screenshotTitle: 'Real Bodhi screens instead of concept art',
      screenshotDescription:
        'These images come from a real Bodhi instance. Real product screens prove the product is already working.',
      screenshotNote:
        'This set focuses on deeper surfaces: settings, env vars, metrics, MCP, and skills.',
      metaTitle: 'Download Bodhi · Latest release and real product surfaces',
      screenshots: [
        {
          title: 'System Settings overview',
          description: 'A real settings center, not just a chat entry point.',
          src: '/screenshots/bodhi-system-settings-provider.png',
        },
        {
          title: 'Env Vars',
          description: 'Environment variable management and secret handling.',
          src: '/screenshots/bodhi-env-vars.png',
        },
        {
          title: 'Metrics',
          description: 'Usage analytics and efficiency summaries.',
          src: '/screenshots/bodhi-metrics.png',
        },
        {
          title: 'MCP',
          description: 'External extensibility configuration surface.',
          src: '/screenshots/bodhi-mcp.png',
        },
        {
          title: 'Skills',
          description: 'Browsable, searchable capability layer.',
          src: '/screenshots/bodhi-skills.png',
        },
      ],
    },
  },
  features: {
    kicker: 'FEATURES',
    title: 'Feature guide',
    description: 'Explore every core capability of Bodhi — from the desktop product experience to the execution engine underneath.',
    updatedLabel: 'Last updated',
    tocTitle: 'Feature map',
    sections: [
      {
        id: 'desktop',
        title: 'Desktop workbench',
        paragraphs: [
          'Bodhi is the desktop product entry point. After installation, you get a real desktop application — not a CLI loop, not a web chat wrapper, but a product with a settings center, skill management, environment variable configuration, and usage analytics.',
          'On first launch, Bodhi guides you through provider configuration, network detection, and basic setup to minimize friction.',
        ],
        bullets: [
          'Guided first-run setup: network checks, provider config, basic options',
          'Unified settings center: providers, capabilities, and runtime boundaries',
          'Environment variable management: injection, secret handling, and local execution context',
          'Skill system: browsable, searchable capability layer',
          'Usage metrics: historical summaries and efficiency signals',
        ],
        imageSrc: '/screenshots/bodhi-system-settings-provider.png',
        imageAlt: 'Bodhi desktop settings center',
      },
      {
        id: 'runtime',
        title: 'Structured runtime (Bamboo)',
        paragraphs: [
          'Bamboo is Bodhi\'s execution engine — a local Rust runtime that organizes task scheduling, tool systems, context memory, and extensibility into a real execution core.',
          'It does not rely on third-party agent frameworks. Instead, it owns its execution path: from receiving a goal, creating tasks, calling tools, to producing results, saving context, and triggering follow-up automation.',
        ],
        bullets: [
          'Local Rust runtime: high performance, low latency, fully local execution',
          'Task system: goal decomposition, step management, state tracking',
          'Tool system: built-in tools (file ops, command execution, HTTP requests, etc.)',
          'Context and memory: long tasks preserve context, cross-session memory',
          'HTTP API: complete RESTful interface for frontend, desktop, and automation scripts',
          'SSE event stream: real-time execution progress, tool calls, and state changes',
        ],
        code: apiCode,
      },
      {
        id: 'visible',
        title: 'Visible execution (Lotus)',
        paragraphs: [
          'Lotus is Bodhi\'s UI interaction layer, making the agent\'s execution process truly visible. You do not wait for a black box to return — task progress, tool calls, and state changes are all rendered in real time.',
          'Built on SSE (Server-Sent Events), every execution step is trackable as it happens.',
        ],
        bullets: [
          'Live event stream: SSE-driven real-time task progress',
          'Task state visualization: each step\'s status (queued, running, done) is clear',
          'Transparent tool calls: see what tools the AI called, with what parameters, and what results',
          'Multi-pane interaction: view conversation, tool output, and task state simultaneously',
          'Session management: historical sessions are traceable and reusable',
        ],
        imageSrc: '/screenshots/bodhi-workbench.png',
        imageAlt: 'Bodhi workbench interface',
      },
      {
        id: 'mcp',
        title: 'MCP and extensions',
        paragraphs: [
          'MCP (Model Context Protocol) lets Bodhi\'s capability boundary grow continuously. By connecting MCP servers, you can integrate external tools, data sources, and systems into the execution path.',
          'Bodhi provides visual MCP server management: add, configure, connect, and refresh — all from the settings center.',
        ],
        bullets: [
          'MCP server management: add, configure, connect, disconnect, refresh',
          'MCP server import: batch import MCP configurations',
          'Tool discovery: automatically discover tools from connected MCP servers',
          'Provider-compatible endpoints: supports OpenAI, Anthropic, Gemini prefixes',
        ],
        imageSrc: '/screenshots/bodhi-mcp.png',
        imageAlt: 'Bodhi MCP management interface',
      },
      {
        id: 'automation',
        title: 'Workflows and schedules',
        paragraphs: [
          'Bodhi\'s long-term value is not just one successful run — it is turning repeated work into durable system behavior. Workflows save multi-step execution patterns. Schedules make those patterns run on cadence.',
          'Best path: prove one task works → save as Workflow → add Schedule for recurring execution.',
        ],
        bullets: [
          'Workflows: save successful multi-step patterns for one-click reuse',
          'Schedules: run Workflows automatically on a cadence',
          'Session management: view history, trace back, and reuse past executions',
          'Execution history: complete run records and result tracking',
        ],
        imageSrc: '/screenshots/bodhi-overview.png',
        imageAlt: 'Bodhi automation overview',
      },
      {
        id: 'skills',
        title: 'Skill system',
        paragraphs: [
          'The skill system presents Bodhi\'s capabilities as a browsable, searchable catalog. Each skill represents a concrete product capability — from file operations to code execution, from HTTP requests to data analysis.',
        ],
        bullets: [
          'Browsable skill catalog',
          'Searchable capability index',
          'Skill execution state tracking',
        ],
        imageSrc: '/screenshots/bodhi-skills.png',
        imageAlt: 'Bodhi skill system',
      },
      {
        id: 'architecture',
        title: 'Technical architecture',
        paragraphs: [
          'Bodhi uses a three-layer architecture: Bodhi (desktop shell) handles product entry and native integration; Lotus (React + Vite) handles the UI interaction layer; Bamboo (Rust) handles local execution and API services.',
          'The frontend communicates with the runtime through Bamboo\'s `/api/v1/*` endpoints and receives live event streams via `/api/v1/events/{session_id}`.',
        ],
        bullets: [
          'Bodhi: desktop install, guided setup, native integration, release delivery',
          'Lotus: React + Vite interaction layer, SSE live rendering, settings center',
          'Bamboo: Rust runtime, HTTP API, built-in tools, MCP, workflows, schedules',
          'Bodhi Server: Go backend service, authentication, data persistence, Docker deployment',
          'Pavilion: website and documentation entry point',
        ],
        code: repoGuideCode,
      },
      {
        id: 'bodhi-server',
        title: 'Bodhi Server Backend',
        paragraphs: [
          'Bodhi Server is the server-side component of the Zenith stack, implemented in Go. It provides complementary server-side capabilities to the Bamboo runtime, handling user authentication, data persistence, and centralized business logic.',
          'Unlike Bamboo\'s local execution, Bodhi Server is designed as an independently deployable service. It exposes capabilities via RESTful APIs, uses PostgreSQL for data storage, JWT for authentication, and fully supports containerized deployment.',
        ],
        bullets: [
          'Go implementation: high performance, compiled, low resource usage',
          'JWT authentication: secure auth based on golang-jwt/jwt/v5',
          'PostgreSQL: database access via jackc/pgx/v5',
          'Docker support: Dockerfile + docker-compose.yml for one-command deployment',
          'Test coverage: internal/config package has complete unit tests',
        ],
      },
      {
        id: 'cicd',
        title: 'Release & Automation',
        paragraphs: [
          'Zenith\'s release system is driven by GitHub Actions, centered around two workflows: Release Train (manual trigger) and Nightly Release (automatic scheduling). Release Train chains releases in the order Bamboo → Lotus → Bodhi, verifying upstream dependencies are available before continuing.',
          'Version management is centralized in release-train.config.json, uniformly controlling versions for Bamboo, Lotus, and Bodhi. Nightly Release automatically calculates new versions (YYYY.M.N format) daily at UTC 04:00, updates the config, and triggers Release Train.',
        ],
        bullets: [
          'Release Train: chained release Bamboo → Lotus → Bodhi with dependency validation',
          'Nightly Release: automatic version calculation (YYYY.M.N format) and daily publishing',
          'Release gates: cargo test, type-check, clippy, lint must all pass',
          'Unified versions: release-train.config.json centrally manages three-repository versions',
          'Failure handling: supports manual retry, test skipping, and version rollback',
        ],
      },
    ],
  },
  docs: {
    kicker: 'BODHI DOCUMENTATION',
    title: 'Bodhi documentation hub',
    description:
      'Start from the Bodhi experience, then move deeper into Bamboo, Lotus, workflows, schedules, and developer boundaries. This page keeps the product story and technical path aligned.',
    updatedLabel: 'Last updated',
    tocTitle: 'Documentation map',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        paragraphs: [
          'Bodhi is the product surface. Lotus is the interaction layer. Bamboo is the local runtime and execution engine. This separation makes the product, its capabilities, and its architecture easier to understand.',
          'If you are new, start with first run. If Bodhi is already part of your workflow, continue into automation and developer sections.',
        ],
        bullets: ['Home: positioning and conversion', 'Docs: setup, automation, integration', 'Bodhi → Bamboo → Lotus'],
      },
      {
        id: 'first-run',
        title: 'First run',
        paragraphs: [
          'The first Bodhi experience focuses on closing one loop from launch to a completed task. The desktop app leads with guided setup: network checks, provider configuration, and a minimal path into the main interface.',
          'Start with the smallest useful path. Once one task works, add MCP, workflows, and schedules incrementally.',
        ],
        bullets: ['Finish desktop onboarding first', 'Validate one useful task before deep configuration', 'Optimize for a low-friction first experience'],
        code: quickstartCode,
      },
      {
        id: 'power-users',
        title: 'Power-user path',
        paragraphs: [
          'When Bodhi becomes part of daily work, real leverage comes from structure, extensibility, and reuse. Providers expand model access. MCP extends capability boundaries. Workflows preserve successful executions. Schedules add cadence.',
          'Best progression: prove one task → turn it into a workflow → add schedules when stable.',
        ],
        bullets: ['Providers widen model access', 'MCP connects outside systems', 'Workflows + schedules turn success into repeatable automation'],
      },
      {
        id: 'architecture',
        title: 'Architecture and boundaries',
        paragraphs: [
          'Bodhi owns desktop packaging and native integration. Lotus owns the React + Vite interaction layer. Bamboo owns execution, APIs, built-in tools, and automation.',
          'Lotus or Bodhi call Bamboo `/api/v1/*` endpoints and subscribe to `/api/v1/events/{session_id}` for live events.',
        ],
        bullets: ['Bodhi: product entry point', 'Lotus: visible UI layer', 'Bamboo: local agent runtime', 'Pavilion: website and knowledge surface'],
      },
      {
        id: 'automation',
        title: 'Automation mindset',
        paragraphs: [
          'Long-term value is not one successful run. It is turning repeated work into durable system behavior. Workflows save multi-step patterns. Schedules run them on cadence. Together, they move Bodhi from session tool to continuing collaborator.',
        ],
        bullets: ['Prove a task first', 'Save it as a workflow', 'Add a schedule when the pattern is stable'],
      },
      {
        id: 'developers',
        title: 'Developer entry',
        paragraphs: [
          'First priority: understand the ownership boundary. Bodhi is the desktop shell, Lotus is the UI source, Bamboo is the runtime plus API core. Enter the layer you need directly.',
          'Frontend work centers on Lotus streaming, multi-pane behavior, and settings. Backend work centers on Bamboo routes, tools, memory, scheduling, and MCP. Desktop packaging lives in Bodhi.',
        ],
        bullets: ['Bodhi for desktop, Lotus for UI, Bamboo for runtime', 'Use public boundaries as the main mental model', 'Keep website messaging aligned with the real product'],
        code: repoGuideCode,
      },
      {
        id: 'api',
        title: 'Key APIs',
        paragraphs: [
          'For frontend clients, desktop behavior, and automation scripts, the most important surfaces are runtime execution, event streaming, MCP management, and schedules.',
        ],
        code: apiCode,
      },
      {
        id: 'bodhi-server',
        title: 'Bodhi Server (Backend Service)',
        paragraphs: [
          'Bodhi Server is the backend API service layer of the Zenith stack, written in Go. It handles authentication, data persistence, and cross-platform server-side capabilities. It complements the Bamboo runtime with centralized data management and user authentication.',
          'Bodhi Server runs independently from the desktop client, communicating via RESTful APIs. It uses PostgreSQL for data storage, JWT for authentication, and supports Docker deployment with docker-compose.',
        ],
        bullets: [
          'Go backend service: high performance, low memory footprint, easy to deploy',
          'JWT authentication: secure user authentication and session management',
          'PostgreSQL persistence: reliable data storage and querying',
          'Docker support: one-command startup with docker-compose',
          'Independent deployment: can serve multiple clients as a centralized service',
        ],
      },
      {
        id: 'cicd',
        title: 'CI/CD & Release System',
        paragraphs: [
          'Zenith uses a fully automated CI/CD pipeline to manage coordinated releases across Bamboo, Lotus, and Bodhi repositories. The Release Train workflow orchestrates releases in the order Bamboo → Lotus → Bodhi, ensuring dependency relationships are handled correctly.',
          'Nightly Release automatically calculates and publishes new versions daily. Version numbers follow the YYYY.M.N format (e.g., 2026.4.29), with N resetting to 1 when the month changes. The Release Train validates package availability on crates.io and npm before proceeding to the next step.',
        ],
        bullets: [
          'Release Train: one-click chained release of Bamboo → Lotus → Bodhi',
          'Nightly Release: automatic version calculation and daily release scheduling',
          'Unified version management: release-train.config.json centrally manages versions for all three repositories',
          'Pre-release validation: automatic checks for crates.io and npm package availability',
          'Rollback support: manual workflow_dispatch triggers for specific versions',
        ],
      },
      {
        id: 'multi-agent',
        title: 'Multi-Agent Collaboration',
        paragraphs: [
          'Zenith uses GitHub Projects "Zenith Roadmap" to coordinate multiple agents working in parallel without conflicts. Each agent participates by claiming tasks, updating board status, and submitting PRs.',
          'The workflow follows a kanban process: Backlog → Triaged → Ready → In Progress → In Review → Done. A maximum of 2 agents can work on the same module simultaneously, while cross-module tasks must be serialized.',
        ],
        bullets: [
          'GitHub Projects board: visual task status and priority management',
          'Task claiming: mark tasks with "claimed by <agent-id>" comments',
          'Branch naming convention: <module>/<type>/<issue-number>-<short-desc>',
          'Parallel constraints: max 2 agents per module, cross-module tasks serialized',
          'Code review: agents can cross-review across modules, human merges required',
        ],
      },
      {
        id: 'security',
        title: 'Security & Testing',
        paragraphs: [
          'The Zenith stack prioritizes engineering security and code quality. Bamboo uses rustls-webpki for TLS certificate verification, with security vulnerabilities promptly patched. Bodhi Server includes comprehensive unit test coverage (internal/config package).',
          'The release process includes security review checkpoints. All code changes must pass cargo clippy, unit tests, and type checks before becoming release candidates.',
        ],
        bullets: [
          'TLS security: rustls-webpki for secure TLS connections',
          'Unit tests: Bodhi Server internal/config package has test coverage',
          'Code quality: cargo fmt, clippy, Prettier enforced formatting',
          'Release gates: tests pass, version validated, security checks cleared before release',
          'Dependency auditing: regular submodule updates to include security fixes',
        ],
      },
    ],
  },
  footer: {
    home: 'Bodhi · Local AI agent powered by Bamboo and Lotus',
    docs: 'Bodhi Docs · Setup, extension paths, and developer entry points',
  },
}
