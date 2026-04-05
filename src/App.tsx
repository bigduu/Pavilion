import { useEffect, useMemo, useRef, useState } from 'react'

type Locale = 'zh' | 'en'
type TimelineState = 'done' | 'live' | 'queued'

type HeroStat = {
  value: string
  label: string
}

type TimelineEvent = {
  time: string
  title: string
  state: TimelineState
}

type ComparisonRow = {
  topic: string
  ordinary: string
  bodhi: string
}

type Capability = {
  kicker: string
  title: string
  description: string
  points: string[]
}

type StackLayer = {
  name: string
  role: string
  description: string
  bullets: string[]
  href?: string
  cta?: string
}

type JourneyStep = {
  step: string
  title: string
  description: string
}

type ShowcasePanel = {
  kicker: string
  title: string
  description: string
  badge: string
  lines: string[]
  imageSrc: string
  imageAlt: string
}

type DownloadCardKind = 'release' | 'guide' | 'source'

type DownloadCard = {
  kind: DownloadCardKind
  kicker: string
  title: string
  description: string
  bullets: string[]
  cta: string
}

type FAQItem = {
  question: string
  answer: string
}

type DocCard = {
  anchor: string
  title: string
  description: string
  bullets: string[]
  cta: string
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
    brandTagline: string
    why: string
    capabilities: string
    architecture: string
    download: string
    faq: string
    docs: string
    github: string
    home: string
    overview: string
    firstRun: string
    powerUsers: string
    developers: string
    api: string
    language: string
  }
  hero: {
    kicker: string
    title: string
    subtitle: string
    primaryCta: string
    secondaryCta: string
    chips: string[]
    stats: HeroStat[]
    liveLabel: string
    liveTitle: string
    liveSummary: string
    liveBadges: string[]
    liveTimeline: TimelineEvent[]
  }
  proof: {
    items: string[]
  }
  showcase: {
    kicker: string
    title: string
    description: string
    panels: ShowcasePanel[]
  }
  comparison: {
    kicker: string
    title: string
    description: string
    ordinaryLabel: string
    bodhiLabel: string
    rows: ComparisonRow[]
  }
  capabilities: {
    kicker: string
    title: string
    description: string
    items: Capability[]
  }
  download: {
    kicker: string
    title: string
    description: string
    cards: DownloadCard[]
    note: string
  }
  architecture: {
    kicker: string
    title: string
    description: string
    flowLabel: string
    flowTitle: string
    flowSteps: string[]
    layers: StackLayer[]
  }
  journey: {
    kicker: string
    title: string
    description: string
    steps: JourneyStep[]
  }
  docsEntry: {
    kicker: string
    title: string
    description: string
    cards: DocCard[]
  }
  faq: {
    kicker: string
    title: string
    description: string
    items: FAQItem[]
  }
  finalCta: {
    title: string
    description: string
    primaryCta: string
    secondaryCta: string
  }
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
const BODHI_GITHUB_URL = 'https://github.com/bigduu/Bodhi'
const LOTUS_GITHUB_URL = 'https://github.com/bigduu/Lotus'
const BAMBOO_GITHUB_URL = 'https://github.com/bigduu/Bamboo-agent'
const BODHI_RELEASES_URL = 'https://github.com/bigduu/Bodhi/releases'
const BODHI_LATEST_RELEASE_URL = 'https://github.com/bigduu/Bodhi/releases/latest'

const quickstartCode = String.raw`# clone the public stack side-by-side
mkdir bodhi-stack && cd bodhi-stack
git clone https://github.com/bigduu/Bamboo-agent.git bamboo
git clone https://github.com/bigduu/Lotus.git lotus
git clone https://github.com/bigduu/Bodhi.git bodhi

# terminal 1: bamboo runtime
cd bamboo
cargo run --bin bamboo -- serve --port 9562 --bind 127.0.0.1 --data-dir /tmp/bamboo-data

# terminal 2: lotus ui
cd ../lotus
npm install
npm run dev

# terminal 3: bodhi desktop shell
cd ../bodhi
npm install
npm run tauri:dev`

const repoGuideCode = String.raw`Bodhi   https://github.com/bigduu/Bodhi
Lotus   https://github.com/bigduu/Lotus
Bamboo  https://github.com/bigduu/Bamboo-agent`

const apiCode = String.raw`# core runtime
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
POST /gemini/v1beta/models/{model}:generateContent`

const translations: Record<Locale, Translation> = {
  zh: {
    meta: {
      homeTitle: 'Bodhi AI · 桌面 AI Agent 工作台',
      docsTitle: 'Bodhi AI 文档 · 上手、自动化与开发者路径',
    },
    nav: {
      brand: 'Bodhi AI',
      brandTagline: 'AI that actually works',
      why: '为什么是 Bodhi',
      capabilities: '能力',
      architecture: '架构',
      download: '下载',
      faq: 'FAQ',
      docs: '文档',
      github: 'GitHub',
      home: '首页',
      overview: '概览',
      firstRun: '第一次运行',
      powerUsers: '进阶玩法',
      developers: '开发者',
      api: 'API',
      language: '语言',
    },
    hero: {
      kicker: 'BODHI AI · THE AI THAT ACTUALLY WORKS',
      title: '这不是只会聊天的 AI。它是会替你把工作往前推的桌面 AI。',
      subtitle:
        'Bodhi AI 把 Bamboo 的结构化 Rust runtime、Lotus 的可视化交互层，以及任务、工具、记忆、MCP、workflow 和 schedule 收敛成一个真正可长期使用的 AI 产品。它不只会回答，它会执行、会展示过程、会把成功经验沉淀成自动化。',
      primaryCta: '下载 Bodhi AI',
      secondaryCta: '查看快速开始',
      chips: ['会执行', '会展示过程', '会记住上下文', '会沉淀成自动化'],
      stats: [
        {
          value: 'Actually works',
          label: '不是只给答案，而是持续把任务往前推进。',
        },
        {
          value: 'Visible by default',
          label: '任务、工具、事件流和状态变化尽量保持可见。',
        },
        {
          value: 'Compounds over time',
          label: '一次成功执行可以沉淀成 workflow 和 schedule。',
        },
      ],
      liveLabel: '实时任务流',
      liveTitle: '这不是 AI 在回你消息，而是 AI 在替你推进任务',
      liveSummary:
        'Bodhi 让 AI 有产品表面，Lotus 让过程可见，Bamboo 让执行有骨架。你看到的不是聊天，而是一套正在工作的桌面 AI 系统。',
      liveBadges: ['Bodhi Desktop', 'Lotus UI', 'Bamboo Runtime', 'MCP Tools'],
      liveTimeline: [
        {
          time: '00:00',
          title: '接收目标：整理本周事项并生成日报',
          state: 'done',
        },
        {
          time: '00:03',
          title: '创建任务清单并流式返回执行计划',
          state: 'done',
        },
        {
          time: '00:08',
          title: '连接 MCP、读取上下文并继续推进执行',
          state: 'live',
        },
        {
          time: '00:14',
          title: '写出结果，并把下一次运行交给自动化',
          state: 'queued',
        },
      ],
    },
    proof: {
      items: [
        '桌面优先的 Agent 工作台',
        'Bamboo 提供结构化本地 Rust runtime',
        '任务、工具、事件流与审批过程可见',
        '上下文、记忆与长任务能力不是附属功能',
        'MCP、workflow 与 schedule 可持续扩展',
        '把一次成功执行沉淀成长期工作系统',
      ],
    },
    showcase: {
      kicker: 'PRODUCT SURFACES',
      title: 'Bodhi 的差异化，不只存在于文案里，也直接体现在真实产品界面里。',
      description:
        '从设置中心到环境变量、指标汇总，这些界面共同说明 Bodhi 已经是一套完整的本地 agent 产品，而不是把模型临时放进聊天框里的演示。',
      panels: [
        {
          kicker: 'System control surface',
          title: '从第一眼开始，就像一套真正可配置的产品',
          description: 'System Settings 让 Provider、系统能力与运行边界都有清晰入口，帮助用户快速建立“这不是聊天壳”的认知。',
          badge: 'System Settings',
          lines: ['统一设置中心而不是零散配置', '更适合桌面端首次引导', '直接体现产品完整度'],
          imageSrc: '/screenshots/bodhi-system-settings-provider.png',
          imageAlt: 'Bodhi System Settings 真实界面截图',
        },
        {
          kicker: 'Local execution context',
          title: '把环境变量和本地执行控制交回给用户自己',
          description: 'Env Vars 页面把变量注入、secret 管理与 Bash 使用路径做成了可理解的产品能力，而不是隐藏在工程细节里。',
          badge: 'Env Vars',
          lines: ['支持本地执行上下文准备', '更清晰地管理 secret 与环境变量', '体现 local-first 的真实控制力'],
          imageSrc: '/screenshots/bodhi-env-vars.png',
          imageAlt: 'Bodhi Env Vars 真实界面截图',
        },
        {
          kicker: 'Product feedback loop',
          title: '通过 Metrics 看见长期使用，而不只是一次成功对话',
          description: 'Metrics 界面把历史使用、效率信号与产品反馈回路展示出来，让 Bodhi 更像一个可持续使用的工作系统。',
          badge: 'Metrics',
          lines: ['看到使用汇总和长期信号', '帮助用户理解产品不是一次性工具', '强化系统化与可持续使用心智'],
          imageSrc: '/screenshots/bodhi-metrics.png',
          imageAlt: 'Bodhi Metrics 真实界面截图',
        },
      ],
    },
    comparison: {
      kicker: 'WHY BODHI',
      title: '很多 agent 擅长展示“会不会回答”，Bodhi 更关心“能不能持续把工作推进下去”。',
      description:
        '差距不只是模型数量，而是产品是不是有自己的执行骨架、过程是不是可见、长任务是不是可持续，以及一次成功执行能不能沉淀成长期工作系统。',
      ordinaryLabel: '常见 agent 形态',
      bodhiLabel: 'Bodhi AI',
      rows: [
        {
          topic: '产品形态',
          ordinary: '更像聊天入口或能力拼装层',
          bodhi: '桌面优先的 agent workbench，有完整产品表面',
        },
        {
          topic: '执行方式',
          ordinary: '给出答案，很多收尾工作仍交给用户',
          bodhi: '发起任务、保持过程可见，并把工作继续往前推',
        },
        {
          topic: '过程透明度',
          ordinary: '执行偏黑箱，用户只能等待结果',
          bodhi: '任务、工具、事件流与状态变化持续可见',
        },
        {
          topic: '底层基础',
          ordinary: '常依赖第三方 agent 框架拼装核心链路',
          bodhi: 'Bamboo 提供结构化本地 Rust runtime 与自有执行路径',
        },
        {
          topic: '长任务能力',
          ordinary: '容易退化成更长的聊天记录',
          bodhi: '强调上下文、记忆、任务状态与自动化沉淀',
        },
        {
          topic: '长期价值',
          ordinary: '每次从头开始，难形成系统资产',
          bodhi: '把有效执行沉淀为 workflow 与 schedule',
        },
      ],
    },
    capabilities: {
      kicker: 'CAPABILITIES',
      title: '围绕真实工作构建的 4 个核心能力',
      description:
        'Bodhi 不是只解决“怎么调用模型”，而是把桌面产品体验、结构化运行时、可见执行和长期自动化组合成一条完整路径。',
      items: [
        {
          kicker: '01 · Desktop-first workbench',
          title: '不是只有 CLI，而是可长期使用的桌面产品入口',
          description:
            'Bodhi 先解决的是产品表面：安装、设置、Provider、环境变量、技能、指标与工作流都应该在一个真实可用的桌面界面里出现。',
          points: ['桌面优先入口', '更清晰的设置与控制表面', '更适合反复使用而不是一次体验'],
        },
        {
          kicker: '02 · Structured runtime powered by Bamboo',
          title: '底层不是聊天壳，而是结构化执行系统',
          description:
            'Bamboo 提供本地 Rust runtime，把任务、工具、记忆、上下文、调度和扩展能力组织成一个真正可演进的执行内核。',
          points: ['本地 Rust runtime', '上下文、记忆、工具、调度一体化', '适合长期产品化演进'],
        },
        {
          kicker: '03 · Visible execution',
          title: '看到 agent 如何工作，而不是只等结果',
          description:
            'Lotus 和 Bamboo 让任务、工具调用、事件流、状态变化与部分审批过程保持可见，让长任务和复杂任务也更可理解。',
          points: ['任务与工具过程可见', 'SSE 驱动的实时反馈', '更适合真实工作与协作'],
        },
        {
          kicker: '04 · Workflows, schedules, and MCP',
          title: '让一次成功执行沉淀成长期工作系统',
          description:
            'Provider、MCP、workflow 和 schedule 不是零散 feature，而是把一次有效执行逐步变成长期自动化系统的关键路径。',
          points: ['MCP 扩展能力边界', 'workflow 复用成功执行', 'schedule 建立长期自动化节奏'],
        },
      ],
    },
    download: {
      kicker: 'DOWNLOAD BODHI',
      title: '把“想试试”变成一个明确的下载动作',
      description:
        '下载区应该同时回答两件事：为什么 Bodhi 值得试，以及现在应该从哪里开始。这里把产品价值、稳定入口和深入路径放在同一个区域里。',
      cards: [
        {
          kind: 'release',
          kicker: 'Desktop release',
          title: '从桌面端开始使用 Bodhi',
          description: '优先给想直接体验产品的人一个最短路径。',
          bullets: ['跳转到 GitHub Releases', '适合最终用户体验完整产品形态', '把下载按钮放在官网中高曝光位置'],
          cta: '打开 Releases',
        },
        {
          kind: 'guide',
          kicker: 'Quick start docs',
          title: '先看上手文档再决定深入',
          description: '适合想先理解安装、Provider 和首次运行路径的用户。',
          bullets: ['文档页承接首次运行', '说明 Setup、Provider 和第一次任务', '减少不必要的安装疑问'],
          cta: '查看快速开始',
        },
        {
          kind: 'source',
          kicker: 'Developer path',
          title: '从 Bodhi、Lotus 与 Bamboo 的公开入口开始',
          description: '适合开发者或想立刻理解三层边界与产品实现方式的人。',
          bullets: ['Bodhi：桌面壳、发布与原生集成', 'Lotus：React / Vite 交互层与实时 UI', 'Bamboo：Rust runtime、API、MCP 与自动化'],
          cta: '打开开发者入口',
        },
      ],
      note: 'Bodhi 提供稳定的 release 入口；如果你想先理解设置路径与能力边界，也可以先从文档开始，再决定下载方式。',
    },
    architecture: {
      kicker: 'SYSTEM DESIGN',
      title: '一个完整的本地 Agent 系统，而不是一层聊天界面',
      description:
        'Bodhi 负责体验入口，Lotus 负责交互层，Bamboo 负责本地执行与扩展能力。Pavilion 则负责把价值、使用路径与文档讲清楚。',
      flowLabel: '用户路径与执行链路',
      flowTitle: '从目标输入，到 Bodhi / Lotus / Bamboo 协作完成一次执行',
      flowSteps: [
        '你描述一个要推进的目标',
        'Bodhi 作为桌面入口承接下载、首次运行与产品体验',
        'Lotus 把设置、会话与实时进度可视化呈现出来',
        'Bamboo 在本地调度任务、工具、MCP 与 Provider',
        '结果继续沉淀为 workflow 或 schedule，形成长期自动化',
      ],
      layers: [
        {
          name: 'Bodhi',
          role: 'Desktop shell',
          description: '桌面应用入口，负责首次启动、窗口行为、原生集成与发布交付。',
          bullets: ['桌面安装与启动', '引导式设置流程', '把 Web 体验收敛成产品形态'],
          href: BODHI_GITHUB_URL,
          cta: '查看 Bodhi 仓库',
        },
        {
          name: 'Lotus',
          role: 'UI layer',
          description: '聊天、多窗格、设置中心与实时状态展示，让 Agent 的执行过程真正可见。',
          bullets: ['聊天与多窗格交互', 'SSE 实时状态订阅', 'Provider / MCP / Schedule 设置中心'],
          href: LOTUS_GITHUB_URL,
          cta: '查看 Lotus 仓库',
        },
        {
          name: 'Bamboo',
          role: 'Local runtime',
          description: '本地 Rust 执行内核，提供 API、工具系统、事件流、工作流、调度与扩展能力。',
          bullets: ['本地 Agent runtime', '内置工具与 HTTP API', 'MCP、workflow、schedule 支撑'],
          href: BAMBOO_GITHUB_URL,
          cta: '查看 Bamboo 仓库',
        },
        {
          name: 'Extensions',
          role: 'Tools and systems',
          description: '把文件、命令、外部工具、模型 Provider 与自动化流程接进同一条执行链路。',
          bullets: ['Provider 兼容前缀', 'MCP Server 扩展', '任务复用与自动执行'],
        },
      ],
    },
    journey: {
      kicker: 'GET STARTED',
      title: '从第一次打开，到形成属于你的本地自动化系统',
      description:
        '首页负责吸引你开始，文档负责带你走深——整个路径应该简单、可控、可扩展。',
      steps: [
        {
          step: '01',
          title: '下载并打开 Bodhi',
          description: '先进入桌面端，从一个清晰的产品入口开始，而不是先研究一堆命令。',
        },
        {
          step: '02',
          title: '完成引导式设置',
          description: '配置 Provider、网络环境和基础能力，让第一次使用尽量无摩擦。',
        },
        {
          step: '03',
          title: '运行第一个任务',
          description: '用自然语言提出目标，并在实时事件流中观察它如何推进工作。',
        },
        {
          step: '04',
          title: '把高频任务变成自动化',
          description: '把有效会话沉淀成 workflow，并用 schedules 按你的节奏自动运行。',
        },
      ],
    },
    docsEntry: {
      kicker: 'DOCS ENTRY',
      title: '把首页留给价值，把深度留给文档',
      description:
        '首页负责帮助你建立对产品的判断；文档负责带你完成设置、扩展能力，并在需要时进入更深入的开发者资料。',
      cards: [
        {
          anchor: 'first-run',
          title: '第一次使用 Bodhi',
          description: '从安装、引导设置，到跑通第一个任务，先把体验闭环打通。',
          bullets: ['桌面引导与环境准备', 'Provider 配置', '第一次任务执行'],
          cta: '查看快速开始',
        },
        {
          anchor: 'power-users',
          title: '扩展你的 Agent 能力',
          description: '当你开始需要外部能力时，再进入 Provider、MCP、Workflow 与 Schedule。',
          bullets: ['Provider 管理', 'MCP Server 接入', 'Workflow 与 Schedule 自动化'],
          cta: '查看进阶玩法',
        },
        {
          anchor: 'developers',
          title: '进入 Bodhi / Lotus / Bamboo 开发者路径',
          description: '从三个公开仓库与 API 边界理解桌面壳、交互层和本地 runtime。',
          bullets: ['Bodhi：桌面壳与发布交付', 'Lotus：前端交互、设置与实时界面', 'Bamboo：Rust runtime、API、MCP 与自动化'],
          cta: '查看开发者指南',
        },
      ],
    },
    faq: {
      kicker: 'FAQ',
      title: '把第一次访问时最容易卡住的问题提前回答掉',
      description:
        '把最常见的疑问提前回答清楚，可以明显降低理解成本，也能让下载和文档路径更加顺畅。',
      items: [
        {
          question: 'Bodhi 和 Bamboo、Lotus 分别是什么关系？',
          answer:
            'Bodhi 是用户直接使用的桌面产品，Lotus 是它的 UI 层，Bamboo 是本地 Agent runtime 与执行引擎。Pavilion 负责把这套系统对外讲清楚。',
        },
        {
          question: 'Bodhi 是不是只是一个聊天界面？',
          answer:
            '不是。它的关键差异是能执行任务、展示实时进度、调用工具、接 MCP、保存 workflow，并通过 schedules 做自动化。',
        },
        {
          question: '我应该从哪里开始体验？',
          answer:
            '最推荐的入口是桌面端 Bodhi。你也可以先阅读文档里的 First run 章节，确认 Provider 和首次运行路径后再下载。',
        },
        {
          question: '如果我是开发者，应该从哪个模块开始看？',
          answer:
            '先按公开仓库边界进入：桌面壳与发布看 Bodhi，前端交互与实时界面看 Lotus，本地执行、API、MCP 与自动化看 Bamboo。Pavilion 文档页已经按这三层整理入口。',
        },
      ],
    },
    finalCta: {
      title: '从 Bodhi 开始；需要深入时，再进入 Bamboo、Lotus 与文档。',
      description:
        '把 Pavilion 作为你的第一站：先理解价值，再进入安装、能力扩展和开发者资料。',
      primaryCta: '下载 Bodhi',
      secondaryCta: '阅读文档',
    },
    docs: {
      kicker: 'BODHI DOCUMENTATION',
      title: 'Bodhi 文档中心',
      description:
        '先用 Bodhi 理解体验，再沿着 Bamboo / Lotus / workflow / schedule 逐步深入。本文档页聚焦上手路径、能力边界与开发者入口。',
      updatedLabel: '最近更新',
      tocTitle: '文档目录',
      sections: [
        {
          id: 'overview',
          title: '概览',
          paragraphs: [
            'Pavilion 现在被定义为 Bodhi 的官方宣传页与文档入口：首页负责建立第一印象，文档页负责承接安装、进阶使用与开发集成。',
            'Bodhi 是主产品形态；Lotus 是它的交互层；Bamboo 是本地 Agent runtime 与执行引擎。这个分工让产品、能力和架构都更容易被用户理解。',
            '如果你是第一次接触，建议先从“第一次运行”开始；如果你已经把 Bodhi 当成长期工具，再继续阅读进阶玩法和开发者章节。',
          ],
          bullets: ['首页：价值表达与转化入口', '文档：上手、扩展、集成', '主角：Bodhi；底层引擎：Bamboo；界面层：Lotus'],
        },
        {
          id: 'first-run',
          title: '第一次运行',
          paragraphs: [
            '第一次使用 Bodhi 的目标，不是立刻掌握所有能力，而是先跑通一个“从打开到完成任务”的闭环。',
            '桌面端应优先承担引导式设置：检测网络环境、配置 Provider、确认基础选项，然后进入主界面开始第一次任务。',
            '你可以先从最小可用路径开始，等确认流程有效后，再逐步启用 MCP、workflow 和 schedules。',
          ],
          bullets: ['先完成桌面引导', '先跑通一个任务，再考虑深度配置', '优先让第一次体验足够顺畅'],
          code: quickstartCode,
        },
        {
          id: 'power-users',
          title: '进阶玩法',
          paragraphs: [
            '当你开始把 Bodhi 当成日常工作的一部分时，真正的价值来自可扩展与可复用能力。',
            'Provider 负责模型接入；MCP Server 负责能力边界外扩；workflow 负责复用；schedule 负责把流程变成自动执行。',
            '最佳路径通常是：先把一个有效任务跑通，再把它提炼成稳定工作流，最后加入 schedule 形成长期自动化。',
          ],
          bullets: ['Provider：统一模型能力入口', 'MCP：把外部系统接进来', 'Workflow + Schedule：把一次成功经验沉淀成长期机制'],
        },
        {
          id: 'architecture',
          title: '架构与职责边界',
          paragraphs: [
            'Bodhi 负责桌面外壳、引导和交付；Lotus 负责 React + Vite 交互层；Bamboo 负责本地执行、API、工具系统与自动化能力。',
            'Lotus 或 Bodhi 会调用 Bamboo 的 `/api/v1/*` 端点，并通过 `/api/v1/events/{session_id}` 接收流式事件。',
            'Pavilion 不参与执行平面，而是负责把产品价值、使用路径和开发者文档组织清楚，让不同类型的用户都能迅速进入正确的深度。',
          ],
          bullets: ['Bodhi：产品入口', 'Lotus：实时 UI 层', 'Bamboo：本地 Agent runtime', 'Pavilion：官网与知识入口'],
        },
        {
          id: 'automation',
          title: '自动化思路',
          paragraphs: [
            'Bodhi 的长期价值不只是一次任务成功，而是把高频动作逐步沉淀成系统能力。',
            'workflow 适合保存多步骤流程；schedule 适合定时运行；两者结合后，Bodhi 才会从“会话型工具”变成“持续协作者”。',
            '在对外表达时，建议始终把自动化解释为“把重复工作留给系统”，而不是单纯强调调度接口或工程概念。',
          ],
          bullets: ['先验证单次任务有效', '再保存为 workflow', '最后用 schedule 建立固定节奏'],
        },
        {
          id: 'developers',
          title: '开发者入口',
          paragraphs: [
            '如果你是开发者，最重要的是先理解三层边界：Bodhi 是桌面壳，Lotus 是 UI 资产源，Bamboo 是运行时与 API 核心。',
            '现在最直接的公开入口不是一个抽象的根仓概念，而是这三个公开仓库本身。你可以按职责直接进入对应项目，而不是先理解内部协作方式。',
            '前端实时行为重点关注 Lotus 的事件订阅与多窗格结构；后端则关注 Bamboo 的路由、工具能力、调度与 MCP 管理；桌面发布与原生集成则在 Bodhi。',
          ],
          bullets: ['桌面壳看 Bodhi，前端交互看 Lotus，执行面看 Bamboo', '优先按公开职责边界理解项目，而不是先理解内部仓库组织', '把官网、文档与真实产品边界保持一致'],
          code: repoGuideCode,
        },
        {
          id: 'api',
          title: '关键 API',
          paragraphs: [
            '对于前端、桌面端和自动化脚本来说，最关键的是会话执行、事件流、MCP 管理以及 schedule 相关端点。',
            '下面这份清单可作为当前实现的快速对齐索引。',
          ],
          code: apiCode,
        },
      ],
    },
    footer: {
      home: 'Bodhi · Local AI agent powered by Bamboo and Lotus',
      docs: 'Bodhi Docs · Setup, extension paths, and developer entry points',
    },
  },
  en: {
    meta: {
      homeTitle: 'Bodhi AI · Desktop AI agent workbench',
      docsTitle: 'Bodhi AI Docs · Setup, automation, and developer paths',
    },
    nav: {
      brand: 'Bodhi AI',
      brandTagline: 'AI that actually works',
      why: 'Why Bodhi',
      capabilities: 'Capabilities',
      architecture: 'Architecture',
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
      language: 'Language',
    },
    hero: {
      kicker: 'BODHI AI · THE AI THAT ACTUALLY WORKS',
      title: 'This is not just AI that talks. It is AI that moves work.',
      subtitle:
        'Bodhi AI turns Bamboo’s structured Rust runtime, Lotus’s visible interaction layer, and real execution features—tasks, tools, memory, MCP, workflows, and schedules—into an AI product people can keep using. It does not only answer. It executes, shows its work, and compounds successful runs into automation.',
      primaryCta: 'Download Bodhi AI',
      secondaryCta: 'Open quick start',
      chips: ['Actually works', 'Visible by default', 'Context that lasts', 'Automation that compounds'],
      stats: [
        {
          value: 'Actually works',
          label: 'It does not only generate output. It keeps the task moving.',
        },
        {
          value: 'Visible by default',
          label: 'Tasks, tools, event flow, and state changes stay legible.',
        },
        {
          value: 'Compounds',
          label: 'Useful runs turn into workflows and scheduled execution.',
        },
      ],
      liveLabel: 'Live task stream',
      liveTitle: 'This is not AI replying. This is AI moving the task.',
      liveSummary:
        'Bodhi gives AI a product surface, Lotus makes the process visible, and Bamboo gives execution a real spine. What you are watching is not chat—it is a working desktop AI system.',
      liveBadges: ['Bodhi Desktop', 'Lotus UI', 'Bamboo Runtime', 'MCP Tools'],
      liveTimeline: [
        {
          time: '00:00',
          title: 'Goal received: prepare weekly summary and draft a report',
          state: 'done',
        },
        {
          time: '00:03',
          title: 'Task plan created and streamed back to the user',
          state: 'done',
        },
        {
          time: '00:08',
          title: 'MCP connected and execution keeps moving',
          state: 'live',
        },
        {
          time: '00:14',
          title: 'Result prepared and the next run handed to automation',
          state: 'queued',
        },
      ],
    },
    proof: {
      items: [
        'Desktop-first agent workbench',
        'Structured Rust runtime powered by Bamboo',
        'Visible tasks, tools, events, and approval flow',
        'Context and memory built for longer-running work',
        'MCP, workflows, and schedules for real extension',
        'Turns one successful run into a durable work system',
      ],
    },
    showcase: {
      kicker: 'PRODUCT SURFACES',
      title: 'Bodhi’s differentiation is visible in the product itself, not only in the copy.',
      description:
        'From system settings to environment control and usage metrics, these screens show that Bodhi is already a full local agent product rather than a temporary chat wrapper around a model.',
      panels: [
        {
          kicker: 'System control surface',
          title: 'It looks configurable because it already is',
          description: 'System Settings gives providers, system capabilities, and runtime boundaries a real product surface that quickly signals product depth.',
          badge: 'System Settings',
          lines: ['A unified control surface instead of scattered setup', 'Fits first-run onboarding well', 'Makes product completeness visible immediately'],
          imageSrc: '/screenshots/bodhi-system-settings-provider.png',
          imageAlt: 'Real Bodhi System Settings screenshot',
        },
        {
          kicker: 'Local execution context',
          title: 'Environment variables and execution context stay in your hands',
          description: 'The Env Vars surface turns variable injection, secret handling, and Bash context into a visible product capability instead of buried implementation detail.',
          badge: 'Env Vars',
          lines: ['Prepares real local execution context', 'Makes secret and variable handling clearer', 'Shows what local-first control actually means'],
          imageSrc: '/screenshots/bodhi-env-vars.png',
          imageAlt: 'Real Bodhi Env Vars screenshot',
        },
        {
          kicker: 'Product feedback loop',
          title: 'Metrics make long-term use visible, not just one successful chat',
          description: 'The Metrics view exposes historical signals and product feedback loops that make Bodhi feel like a durable system instead of a one-off experiment.',
          badge: 'Metrics',
          lines: ['Shows usage summaries and long-term signals', 'Helps users see the system beyond one run', 'Reinforces durability and product maturity'],
          imageSrc: '/screenshots/bodhi-metrics.png',
          imageAlt: 'Real Bodhi Metrics screenshot',
        },
      ],
    },
    comparison: {
      kicker: 'WHY BODHI',
      title: 'Many agent products optimize for “chatting well.” Bodhi is built to keep real work moving.',
      description:
        'The gap is not only about model choice. It is about whether the product owns its execution spine, whether the process stays visible, whether longer-running work remains structured, and whether one successful run compounds into a durable system.',
      ordinaryLabel: 'Common agent pattern',
      bodhiLabel: 'Bodhi AI',
      rows: [
        {
          topic: 'Product shape',
          ordinary: 'Feels like a chat shell or a capability mashup',
          bodhi: 'A desktop-first agent workbench with a real product surface',
        },
        {
          topic: 'Execution model',
          ordinary: 'Gives an answer and leaves much of the follow-through to the user',
          bodhi: 'Starts real tasks, keeps the process visible, and pushes work forward',
        },
        {
          topic: 'Visibility',
          ordinary: 'Execution is mostly opaque once the prompt is sent',
          bodhi: 'Tasks, tools, event flow, and state changes stay visible',
        },
        {
          topic: 'Foundation',
          ordinary: 'Often assembled around third-party agent frameworks',
          bodhi: 'Bamboo provides a structured local Rust runtime and owned execution path',
        },
        {
          topic: 'Long-running work',
          ordinary: 'Can collapse into a longer chat transcript',
          bodhi: 'Treats context, memory, task state, and automation as first-class system layers',
        },
        {
          topic: 'Compounding value',
          ordinary: 'Starts from scratch every time',
          bodhi: 'Turns useful runs into workflows and schedules',
        },
      ],
    },
    capabilities: {
      kicker: 'CAPABILITIES',
      title: 'Four core capabilities built around real work',
      description:
        'Bodhi is not only about model access. It combines desktop product experience, a structured runtime, visible execution, and long-term automation into one coherent system.',
      items: [
        {
          kicker: '01 · Desktop-first workbench',
          title: 'More than a CLI loop, built as a repeatable product surface',
          description:
            'Bodhi starts by solving the product layer: install flow, settings, providers, environment variables, skills, metrics, and workflows should all live inside a desktop interface people can keep using.',
          points: [
            'Desktop-first entry point',
            'Clearer settings and control surfaces',
            'Better suited to repeated use than one-off demos',
          ],
        },
        {
          kicker: '02 · Structured runtime powered by Bamboo',
          title: 'The foundation is a runtime system, not a chat wrapper',
          description:
            'Bamboo brings a local Rust runtime that organizes tasks, tools, memory, context, scheduling, and extensibility into a real execution core.',
          points: [
            'Local Rust runtime',
            'Context, memory, tools, and scheduling in one backbone',
            'Built for long-term product evolution',
          ],
        },
        {
          kicker: '03 · Visible execution',
          title: 'See how the agent works instead of waiting for a final answer',
          description:
            'Lotus and Bamboo keep tasks, tool calls, event streams, state changes, and parts of the approval flow visible so longer-running work stays legible.',
          points: [
            'Visible tasks and tool flow',
            'SSE-driven live feedback',
            'Better fit for real work and collaboration',
          ],
        },
        {
          kicker: '04 · Workflows, schedules, and MCP',
          title: 'Turn one successful run into a lasting work system',
          description:
            'Providers, MCP, workflows, and schedules are not scattered features. They are the path that turns one good execution into a reusable and automated system.',
          points: [
            'MCP expands the capability boundary',
            'Workflows preserve successful execution patterns',
            'Schedules create a long-term automation rhythm',
          ],
        },
      ],
    },
    download: {
      kicker: 'DOWNLOAD BODHI',
      title: 'Turn interest into a real install step',
      description:
        'This section answers two questions clearly: why Bodhi is worth trying, and where to start right now. Product value, stable entry points, and deeper paths live together here.',
      cards: [
        {
          kind: 'release',
          kicker: 'Desktop release',
          title: 'Start with the Bodhi desktop product',
          description: 'The shortest path for users who want to try the real product surface first.',
          bullets: ['Jump to GitHub Releases', 'Best for end-user evaluation', 'Keeps the CTA near the highest-intent sections'],
          cta: 'Open releases',
        },
        {
          kind: 'guide',
          kicker: 'Quick start docs',
          title: 'Read the first-run path before installing',
          description: 'Good for users who want to understand setup, providers, and the first task loop first.',
          bullets: ['Docs carry the first-run flow', 'Clarifies setup and provider expectations', 'Reduces avoidable install confusion'],
          cta: 'Open quick start',
        },
        {
          kind: 'source',
          kicker: 'Developer path',
          title: 'Start from the public Bodhi, Lotus, and Bamboo entry points',
          description: 'Best for developers or anyone who wants to understand the product through its three real layers.',
          bullets: ['Bodhi: desktop shell, release surface, and native integration', 'Lotus: React / Vite interaction layer and live UI', 'Bamboo: Rust runtime, APIs, MCP, and automation'],
          cta: 'Open developer path',
        },
      ],
      note: 'Bodhi gives you a stable release entry. If you want more context first, start from the docs and then move into installation when you are ready.',
    },
    architecture: {
      kicker: 'SYSTEM DESIGN',
      title: 'A complete local agent system, not just a chat layer',
      description:
        'Bodhi is the product surface. Lotus is the interaction layer. Bamboo is the local runtime and execution engine. Pavilion explains the value, path, and documentation clearly.',
      flowLabel: 'User path and execution chain',
      flowTitle: 'From user intent to one coordinated run across Bodhi, Lotus, and Bamboo',
      flowSteps: [
        'You describe a goal worth moving forward',
        'Bodhi provides the desktop entry, onboarding, and product surface',
        'Lotus renders settings, conversation state, and live progress visibly',
        'Bamboo orchestrates tasks, tools, MCP servers, and providers locally',
        'Successful runs compound into workflows or schedules for repeatable automation',
      ],
      layers: [
        {
          name: 'Bodhi',
          role: 'Desktop shell',
          description:
            'The product entry point for onboarding, packaging, native integration, and the desktop experience.',
          bullets: ['Desktop install and launch', 'Guided first-run setup', 'Turns the stack into a coherent product'],
          href: BODHI_GITHUB_URL,
          cta: 'Open Bodhi repo',
        },
        {
          name: 'Lotus',
          role: 'UI layer',
          description:
            'The React + Vite interaction layer for chat, multi-pane workflows, settings, and visible progress.',
          bullets: ['Chat and multi-pane UX', 'SSE-based progress rendering', 'Provider, MCP, and schedule settings'],
          href: LOTUS_GITHUB_URL,
          cta: 'Open Lotus repo',
        },
        {
          name: 'Bamboo',
          role: 'Local runtime',
          description:
            'The Rust execution core that exposes APIs, built-in tools, streaming events, workflows, schedules, and extension points.',
          bullets: ['Local agent runtime', 'Built-in tools and HTTP API', 'MCP, workflows, and schedules'],
          href: BAMBOO_GITHUB_URL,
          cta: 'Open Bamboo repo',
        },
        {
          name: 'Extensions',
          role: 'Tools and systems',
          description:
            'Files, commands, providers, MCP servers, and automation layers all connect into the same execution path.',
          bullets: ['Provider-compatible endpoints', 'MCP server extensibility', 'Reusable and automated execution'],
        },
      ],
    },
    journey: {
      kicker: 'GET STARTED',
      title: 'From the first launch to a local automation system of your own',
      description:
        'Home should pull people in. Docs should take them deeper. The whole path should feel simple, controlled, and expandable.',
      steps: [
        {
          step: '01',
          title: 'Install and open Bodhi',
          description: 'Start from a clear product surface instead of from scattered commands and setup fragments.',
        },
        {
          step: '02',
          title: 'Finish guided setup',
          description: 'Handle providers, network settings, and first-run configuration with less friction.',
        },
        {
          step: '03',
          title: 'Run the first task',
          description: 'Describe your goal in plain language and watch the execution unfold through live events.',
        },
        {
          step: '04',
          title: 'Save it as automation',
          description: 'Turn effective runs into workflows, then add schedules to make them part of your regular system.',
        },
      ],
    },
    docsEntry: {
      kicker: 'DOCS ENTRY',
      title: 'Keep the home page for value. Keep the depth in docs.',
      description:
        'The home page helps people judge the product quickly. Docs carry the deeper setup, extension paths, and developer-facing material when users want to go further.',
      cards: [
        {
          anchor: 'first-run',
          title: 'First-time Bodhi setup',
          description: 'Go from install to guided setup to the first successful task execution.',
          bullets: ['Desktop onboarding', 'Provider setup', 'First task flow'],
          cta: 'Open quick start',
        },
        {
          anchor: 'power-users',
          title: 'Expand your agent system',
          description: 'Once the basics work, move into providers, MCP, workflows, and schedules.',
          bullets: ['Provider management', 'MCP servers', 'Workflow and schedule automation'],
          cta: 'Open power-user guide',
        },
        {
          anchor: 'developers',
          title: 'Follow the Bodhi / Lotus / Bamboo developer path',
          description: 'Understand the desktop shell, UI layer, and local runtime through their real public boundaries.',
          bullets: ['Bodhi: desktop shell and release surface', 'Lotus: frontend interactions, settings, and live UI', 'Bamboo: Rust runtime, APIs, MCP, and automation'],
          cta: 'Open developer guide',
        },
      ],
    },
    faq: {
      kicker: 'FAQ',
      title: 'Answer the first points of hesitation before people bounce',
      description:
        'Answering the most common questions up front reduces friction, clarifies the product boundary, and makes the path into download and docs smoother.',
      items: [
        {
          question: 'How do Bodhi, Bamboo, and Lotus relate to each other?',
          answer:
            'Bodhi is the desktop product people use directly. Lotus is the UI layer. Bamboo is the local agent runtime and execution engine. Pavilion explains the system publicly.',
        },
        {
          question: 'Is Bodhi just a chat interface?',
          answer:
            'No. The key difference is that it can execute tasks, show live progress, call tools, connect MCP servers, save workflows, and automate repeatable work with schedules.',
        },
        {
          question: 'Where should I start if I want to try it?',
          answer:
            'The best entry is usually the Bodhi desktop flow. If you want more context first, start from the First run section in the docs and then move into installation.',
        },
        {
          question: 'Where should developers begin?',
          answer:
            'Start from the public boundaries: Bodhi for desktop shell concerns, Lotus for frontend interaction and live UI, and Bamboo for runtime, APIs, MCP, and automation. The docs page is organized around those three layers already.',
        },
        {
          question: 'What makes Bodhi different from many other agent products?',
          answer:
            'A big part of the difference is structural ownership. Bodhi is not only a UI layer around a model. It sits on top of Bamboo, a local Rust runtime with context, memory, tools, tasks, schedules, and an owned execution path, then turns that runtime into a desktop product people can actually use repeatedly.',
        },
      ],
    },
    finalCta: {
      title: 'Start with Bodhi. Go deeper through Bamboo, Lotus, and the docs when you need more depth.',
      description:
        'Use Pavilion as the first stop: understand the product, choose your install path, and then move into automation and developer materials when you are ready.',
      primaryCta: 'Download Bodhi',
      secondaryCta: 'Read the docs',
    },
    docs: {
      kicker: 'BODHI DOCUMENTATION',
      title: 'Bodhi documentation hub',
      description:
        'Start from the Bodhi experience, then move deeper into Bamboo, Lotus, workflows, schedules, and developer boundaries. This page is designed to keep the product story and the technical path aligned.',
      updatedLabel: 'Last updated',
      tocTitle: 'Documentation map',
      sections: [
        {
          id: 'overview',
          title: 'Overview',
          paragraphs: [
            'Pavilion is the public marketing and documentation site for Bodhi. The home page explains why the product matters. The docs page explains how to install it, extend it, and understand the stack behind it.',
            'Bodhi is the product surface users should remember first. Lotus is the visible interaction layer. Bamboo is the local runtime that gives the product depth, execution structure, and extensibility.',
            'If you are new, start with first run. If Bodhi is already becoming part of your workflow, continue into automation and developer sections.',
          ],
          bullets: ['Home: positioning and conversion', 'Docs: setup, automation, and integration', 'Bodhi first, Bamboo as runtime, Lotus as UI layer'],
        },
        {
          id: 'first-run',
          title: 'First run',
          paragraphs: [
            'The first Bodhi experience should focus on closing one loop from launch to a completed task, not on exposing every advanced feature immediately.',
            'The desktop app should lead with guided setup: network checks, provider configuration, and a minimal path into the main interface.',
            'Once one useful task works, users can add MCP, workflows, and schedules incrementally instead of absorbing everything up front.',
          ],
          bullets: ['Finish the desktop onboarding first', 'Validate one useful task before deep configuration', 'Optimize for a low-friction first experience'],
          code: quickstartCode,
        },
        {
          id: 'power-users',
          title: 'Power-user path',
          paragraphs: [
            'Once Bodhi becomes part of daily work, the real leverage comes from structure, extensibility, and reuse.',
            'Providers expand model access. MCP servers extend the capability boundary. Workflows preserve successful execution. Schedules give that execution a cadence.',
            'A good progression is simple: prove one task, turn it into a workflow, then add schedules when the pattern is stable.',
          ],
          bullets: ['Providers widen model access', 'MCP connects outside systems', 'Workflows and schedules turn success into repeatable automation'],
        },
        {
          id: 'architecture',
          title: 'Architecture and boundaries',
          paragraphs: [
            'Bodhi owns desktop packaging, onboarding, and native integration. Lotus owns the React + Vite interaction layer. Bamboo owns execution, APIs, built-in tools, and automation features.',
            'Lotus or Bodhi call Bamboo `/api/v1/*` endpoints and subscribe to `/api/v1/events/{session_id}` for live event updates.',
            'Pavilion stays outside the execution plane and focuses on product explanation, path design, and curated documentation for different user depths.',
          ],
          bullets: ['Bodhi: product entry point', 'Lotus: visible UI layer', 'Bamboo: local agent runtime', 'Pavilion: website and knowledge surface'],
        },
        {
          id: 'automation',
          title: 'Automation mindset',
          paragraphs: [
            'The long-term value of Bodhi is not one successful run. It is the ability to turn repeated work into durable system behavior.',
            'Workflows save multi-step execution patterns. Schedules make those patterns run on cadence. Together, they move Bodhi from session tool to continuing collaborator.',
            'When describing this publicly, frame automation as “leaving repeated work to the system”, not just as a scheduling API or a technical feature list.',
          ],
          bullets: ['Prove a task first', 'Save it as a workflow', 'Add a schedule when the pattern is stable'],
        },
        {
          id: 'developers',
          title: 'Developer entry',
          paragraphs: [
            'For developers, the first priority is understanding the ownership boundary: Bodhi is the desktop shell, Lotus is the UI source of truth, and Bamboo is the runtime plus API core.',
            'The clearest public entry is the three repositories themselves. Enter the layer you need directly instead of learning internal choreography first.',
            'Frontend work centers on Lotus streaming, multi-pane behavior, and settings flows. Backend work centers on Bamboo routes, tools, memory, scheduling, and MCP management. Desktop packaging and native integration live in Bodhi.',
          ],
          bullets: ['Bodhi for desktop shell, Lotus for UI, Bamboo for runtime', 'Use public ownership boundaries as the main mental model', 'Keep website messaging aligned with the real shipped product boundary'],
          code: repoGuideCode,
        },
        {
          id: 'api',
          title: 'Key APIs',
          paragraphs: [
            'For front-end clients, desktop behavior, and automation scripts, the most important surfaces are runtime execution, event streaming, MCP management, and schedules.',
            'Use the following list as a quick alignment index for the current implementation.',
          ],
          code: apiCode,
        },
      ],
    },
    footer: {
      home: 'Bodhi · Local AI agent powered by Bamboo and Lotus',
      docs: 'Bodhi Docs · Setup, extension paths, and developer entry points',
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
      { threshold: 0.22 },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [startVisible])

  return { elementRef, isVisible }
}

function resolveDownloadLink(kind: DownloadCardKind, locale: Locale) {
  switch (kind) {
    case 'release':
      return { href: BODHI_LATEST_RELEASE_URL, external: true }
    case 'guide':
      return { href: buildUrl('/docs', locale, 'first-run'), external: false }
    case 'source':
      return { href: buildUrl('/docs', locale, 'developers'), external: false }
    default:
      return { href: BODHI_GITHUB_URL, external: true }
  }
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

function SectionIntro({
  kicker,
  title,
  description,
}: {
  kicker: string
  title: string
  description: string
}) {
  return (
    <div className="section-intro">
      <p className="section-kicker">{kicker}</p>
      <h2>{title}</h2>
      <p className="section-description">{description}</p>
    </div>
  )
}

function RevealSection({
  id,
  className,
  startVisible = false,
  children,
}: {
  id?: string
  className: string
  startVisible?: boolean
  children: React.ReactNode
}) {
  const { elementRef, isVisible } = useReveal<HTMLElement>(startVisible)

  return (
    <section
      id={id}
      ref={elementRef}
      className={`section-shell ${isVisible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </section>
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
  const downloadUrl = buildUrl('/download', locale)
  const docsOverviewUrl = buildUrl('/docs', locale, 'overview')
  const docsFirstRunUrl = buildUrl('/docs', locale, 'first-run')
  const docsUrl = buildUrl('/docs', locale, 'overview')
  const comparisonSummary =
    locale === 'zh'
      ? {
          ordinaryKicker: 'COMMON AGENT PATTERN',
          ordinaryTitle: '会聊，却很难真正替你做事',
          ordinaryPoints: [
            '模型装进了聊天层，但执行和产品边界依然偏薄',
            '你拿到的是回答，不是一套继续推进任务的系统',
            '一次成功很难沉淀成长期可复用资产',
          ],
          bodhiKicker: 'BODHI DIFFERENCE',
          bodhiTitle: '一个会执行、会展示过程、会长期进化的桌面 AI',
          bodhiPoints: [
            '像 AI 产品，不像 prompt demo',
            '会拆任务、跑工具，并持续推进执行',
            '把成功经验沉淀为 workflow 和 schedule',
          ],
        }
      : {
          ordinaryKicker: 'COMMON AGENT PATTERN',
          ordinaryTitle: 'Can chat, but rarely becomes a real work system',
          ordinaryPoints: [
            'Model access lives inside chat, but execution and product boundaries stay thin',
            'You get an answer, not a system that keeps the task moving',
            'Successful runs rarely turn into durable leverage',
          ],
          bodhiKicker: 'BODHI DIFFERENCE',
          bodhiTitle: 'A desktop AI that executes, shows its work, and compounds',
          bodhiPoints: [
            'Feels like an AI product, not a prompt demo',
            'Breaks work into tasks, runs tools, and keeps execution moving',
            'Turns success into workflows and schedules',
          ],
        }

  return (
    <div className="page-shell">
      <div className="ambient ambient-a" aria-hidden="true" />
      <div className="ambient ambient-b" aria-hidden="true" />
      <div className="ambient ambient-c" aria-hidden="true" />

      <header className="top-nav panel">
        <a className="brand-lockup" href={buildUrl('/', locale)}>
          <span className="brand-mark">B</span>
          <span className="brand-copy">
            <strong>{content.nav.brand}</strong>
            <small>{content.nav.brandTagline}</small>
          </span>
        </a>

        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#why-bodhi">{content.nav.why}</a>
          <a href="#capabilities">{content.nav.capabilities}</a>
          <a href={downloadUrl}>{content.nav.download}</a>
          <a href="#architecture">{content.nav.architecture}</a>
          <a href="#faq">{content.nav.faq}</a>
          <a href={docsUrl}>{content.nav.docs}</a>
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
              <a className="button button-primary" href={downloadUrl}>
                {content.hero.primaryCta}
              </a>
              <a className="button button-secondary" href={docsFirstRunUrl}>
                {content.hero.secondaryCta}
              </a>
              <a
                className="link-inline hero-link-inline"
                href={BODHI_GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content.nav.github}
              </a>
            </div>

            <dl className="hero-stats">
              {content.hero.stats.map((stat) => (
                <div className="panel-subtle stat-card" key={stat.value}>
                  <dd>{stat.value}</dd>
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
                alt={locale === 'zh' ? 'Bodhi System Settings 真实界面截图' : 'Real Bodhi System Settings screenshot'}
                loading="eager"
              />
              <div className="hero-product-inset">
                <img
                  className="hero-product-inset-image"
                  src="/screenshots/bodhi-skills.png"
                  alt={locale === 'zh' ? 'Bodhi Skills 真实界面截图' : 'Bodhi skills inset'}
                  loading="lazy"
                />
              </div>
              <div className="hero-product-caption">
                <strong>{locale === 'zh' ? '真实 Bodhi 功能中心' : 'Real Bodhi control surface'}</strong>
                <span>
                  {locale === 'zh'
                    ? '本地运行、设置中心与技能系统都已经是完整产品界面'
                    : 'Local-first, fully configurable, and already expressed as real product surfaces'}
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

        <RevealSection className="panel proof-strip">
          <ul>
            {content.proof.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </RevealSection>

        <RevealSection className="panel section-card showcase-section">
          <SectionIntro
            kicker={content.showcase.kicker}
            title={content.showcase.title}
            description={content.showcase.description}
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
                <p>{panel.description}</p>
                <ul className="showcase-lines">
                  {panel.lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </RevealSection>

        <RevealSection id="why-bodhi" className="panel section-card comparison-section">
          <SectionIntro
            kicker={content.comparison.kicker}
            title={content.comparison.title}
            description={content.comparison.description}
          />

          <div
            className="comparison-callout-grid"
            aria-label={locale === 'zh' ? 'Bodhi 对比摘要' : 'Bodhi comparison summary'}
          >
            <article className="panel-subtle comparison-callout comparison-ordinary">
              <p className="card-kicker">{comparisonSummary.ordinaryKicker}</p>
              <h3>{comparisonSummary.ordinaryTitle}</h3>
              <ul>
                {comparisonSummary.ordinaryPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>

            <article className="panel-subtle comparison-callout comparison-bodhi">
              <p className="card-kicker">{comparisonSummary.bodhiKicker}</p>
              <h3>{comparisonSummary.bodhiTitle}</h3>
              <ul>
                {comparisonSummary.bodhiPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          </div>

          <article className="panel-subtle comparison-proof-card">
            <p className="card-kicker">{locale === 'zh' ? 'REAL PRODUCT PROOF' : 'REAL PRODUCT PROOF'}</p>
            <h3>
              {locale === 'zh'
                ? '这不是概念图，而是真实运行中的 Bodhi 扩展能力界面'
                : 'This is not concept art. It is a live Bodhi extensibility surface.'}
            </h3>
            <p>
              {locale === 'zh'
                ? '把真实产品画面放到 Why Bodhi 区，是为了让差异化卖点有直接证据：它确实在运行，确实有设置中心、扩展系统和真实可操作的产品能力面。'
                : 'The point of showing a real product screen here is simple: the differentiation claims are visible in the product itself, not only in marketing copy.'}
            </p>
            <div className="comparison-proof-image-wrap">
              <img
                className="comparison-proof-image"
                src="/screenshots/bodhi-mcp.png"
                alt={locale === 'zh' ? 'Bodhi MCP 真实界面截图' : 'Real Bodhi MCP screenshot'}
                loading="lazy"
              />
            </div>
          </article>

          <div className="comparison-table" role="table" aria-label={content.comparison.title}>
            <div className="comparison-row comparison-head" role="row">
              <div className="comparison-cell comparison-label" role="columnheader" />
              <div className="comparison-cell comparison-column" role="columnheader">
                {content.comparison.ordinaryLabel}
              </div>
              <div className="comparison-cell comparison-column accent" role="columnheader">
                {content.comparison.bodhiLabel}
              </div>
            </div>

            {content.comparison.rows.map((row) => (
              <div className="comparison-row" role="row" key={row.topic}>
                <div className="comparison-cell comparison-label" role="rowheader">
                  {row.topic}
                </div>
                <div className="comparison-cell" role="cell">
                  {row.ordinary}
                </div>
                <div className="comparison-cell accent" role="cell">
                  {row.bodhi}
                </div>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection id="capabilities" className="panel section-card">
          <SectionIntro
            kicker={content.capabilities.kicker}
            title={content.capabilities.title}
            description={content.capabilities.description}
          />

          <div className="capability-grid">
            {content.capabilities.items.map((item) => (
              <article className="panel-subtle capability-card" key={item.title}>
                <p className="card-kicker">{item.kicker}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </RevealSection>

        <RevealSection id="download" className="panel section-card download-section">
          <SectionIntro
            kicker={content.download.kicker}
            title={content.download.title}
            description={content.download.description}
          />

          <div className="download-grid">
            {content.download.cards.map((card) => {
              const link = resolveDownloadLink(card.kind, locale)
              return (
                <article className={`panel-subtle download-card ${card.kind}`} key={card.title}>
                  <p className="card-kicker">{card.kicker}</p>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <ul>
                    {card.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <a
                    className={card.kind === 'release' ? 'button button-primary' : 'button button-secondary'}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                  >
                    {card.cta}
                  </a>
                </article>
              )
            })}
          </div>

          <p className="download-note">{content.download.note}</p>
        </RevealSection>

        <RevealSection id="architecture" className="panel section-card architecture-section">
          <SectionIntro
            kicker={content.architecture.kicker}
            title={content.architecture.title}
            description={content.architecture.description}
          />

          <div className="architecture-grid">
            <div className="panel-subtle flow-card">
              <p className="card-kicker">{content.architecture.flowLabel}</p>
              <h3>{content.architecture.flowTitle}</h3>
              <ol className="flow-steps">
                {content.architecture.flowSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="stack-grid">
              {content.architecture.layers.map((layer) => (
                <article className="panel-subtle stack-card" key={layer.name}>
                  <div className="stack-head">
                    <h3>{layer.name}</h3>
                    <span>{layer.role}</span>
                  </div>
                  <p>{layer.description}</p>
                  <ul>
                    {layer.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  {layer.href && layer.cta ? (
                    <a className="link-inline stack-link" href={layer.href} target="_blank" rel="noopener noreferrer">
                      {layer.cta}
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </RevealSection>

        <RevealSection className="panel section-card">
          <SectionIntro
            kicker={content.journey.kicker}
            title={content.journey.title}
            description={content.journey.description}
          />

          <div className="journey-grid">
            {content.journey.steps.map((step) => (
              <article className="panel-subtle journey-card" key={step.step}>
                <span className="journey-step">{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </RevealSection>

        <RevealSection id="docs" className="panel section-card docs-entry-section">
          <SectionIntro
            kicker={content.docsEntry.kicker}
            title={content.docsEntry.title}
            description={content.docsEntry.description}
          />

          <div className="docs-card-grid">
            {content.docsEntry.cards.map((card) => (
              <article className="panel-subtle docs-entry-card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <ul>
                  {card.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <a className="link-inline" href={buildUrl('/docs', locale, card.anchor)}>
                  {card.cta}
                </a>
              </article>
            ))}
          </div>
        </RevealSection>

        <RevealSection id="faq" className="panel section-card faq-section">
          <SectionIntro
            kicker={content.faq.kicker}
            title={content.faq.title}
            description={content.faq.description}
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
            <p className="section-kicker">BODHI NEXT STEP</p>
            <h2>{content.finalCta.title}</h2>
            <p className="section-description final-description">{content.finalCta.description}</p>
          </div>

          <div className="hero-actions final-actions">
            <a className="button button-primary" href={downloadUrl}>
              {content.finalCta.primaryCta}
            </a>
            <a className="button button-secondary" href={docsOverviewUrl}>
              {content.finalCta.secondaryCta}
            </a>
          </div>
        </RevealSection>
      </main>

      <footer className="footer-line">
        <p>{content.footer.home}</p>
      </footer>
    </div>
  )
}

function DownloadPage({
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

  const copy =
    locale === 'zh'
      ? {
          kicker: 'DOWNLOAD BODHI',
          title: '下载 Bodhi AI，开始使用一个真正能持续推进工作的桌面 Agent。',
          description:
            '这是 Bodhi AI 的稳定下载入口。主按钮始终指向 GitHub 最新 release，因此你总能进入最新可用版本。更重要的是，你下载的不是一个临时聊天套壳，而是建立在 Bamboo 结构化 Rust runtime 之上的桌面工作台。',
          latestKicker: 'Latest release mapping',
          latestTitle: '稳定下载入口：始终指向最新版本',
          latestDescription:
            '无论后续版本怎么迭代，这个入口都可以保持不变。点击主按钮后，GitHub 会自动把用户带到当前最新 release。',
          primaryCta: '下载最新版本',
          secondaryCta: '查看所有 Releases',
          tertiaryCta: '查看快速开始',
          routeNote: '当前映射地址',
          sideKicker: 'Why Bodhi AI',
          sideTitle: '你下载的是一个会工作的 AI 产品',
          sidePoints: [
            '不只回答，会拆任务并推进执行',
            '过程可见，不是黑箱式 agent',
            'workflow 和 schedule 让价值越用越大',
          ],
          screenshotKicker: 'REAL BODHI UI',
          screenshotTitle: '真实的 Bodhi 界面，而不是概念图',
          screenshotDescription:
            '这些截图直接来自真实运行中的 Bodhi。对 Pavilion 来说，真实产品界面比抽象插画更有说服力，也更能支撑“可见执行、本地优先、真实工作流”这些卖点。',
          screenshotNote:
            '这组官方截图优先展示设置中心、环境变量、指标、MCP 与技能系统等更能体现产品深度的功能面，而不是重复的聊天视图。',
          screenshots: [
            {
              title: 'System Settings 总览',
              description: '作为宽幅主视觉，展示 Bodhi 已经具备完整的设置中心，而不是只停留在聊天入口。',
              src: '/screenshots/bodhi-system-settings-provider.png',
            },
            {
              title: 'Env Vars',
              description: '强调环境变量可以注入 Bash 使用，并对 secret 做更稳妥的管理与存储。',
              src: '/screenshots/bodhi-env-vars.png',
            },
            {
              title: 'Metrics',
              description: '展示真实的使用统计、效率指标与历史汇总，让 Bodhi 更像可长期使用的产品系统。',
              src: '/screenshots/bodhi-metrics.png',
            },
            {
              title: 'MCP',
              description: '用真实界面证明 Bodhi 的外部扩展能力不是口号，而是可配置、可观测的产品能力。',
              src: '/screenshots/bodhi-mcp.png',
            },
            {
              title: 'Skills',
              description: '展示技能系统的可浏览与可检索形态，让产品的能力边界与增长方式更清晰。',
              src: '/screenshots/bodhi-skills.png',
            },
          ],
        }
      : {
          kicker: 'DOWNLOAD BODHI',
          title: 'Download Bodhi AI and start with a desktop agent that actually keeps work moving.',
          description:
            'This is the stable download entry for Bodhi AI. The primary button always points to the latest GitHub release, so it stays current as versions change. More importantly, what you are downloading is not a disposable chat wrapper but a desktop workbench built on Bamboo’s structured Rust runtime and a real product experience.',
          latestKicker: 'Latest release mapping',
          latestTitle: 'Stable download entry: always points to the latest release',
          latestDescription:
            'This route can stay fixed even as versions ship. The primary CTA hands users off to the current latest GitHub release automatically.',
          primaryCta: 'Download latest release',
          secondaryCta: 'View all releases',
          tertiaryCta: 'Open quick start',
          routeNote: 'Current mapped URL',
          sideKicker: 'Why Bodhi AI',
          sideTitle: 'You are downloading an AI product that actually works',
          sidePoints: [
            'It does not only answer — it breaks work into steps and keeps execution moving',
            'The process stays visible instead of disappearing into a black box',
            'Workflows and schedules make the product more valuable over time',
          ],
          screenshotKicker: 'REAL BODHI UI',
          screenshotTitle: 'Real Bodhi screens instead of concept art',
          screenshotDescription:
            'These images come from a real Bodhi instance. For Pavilion, real product screens are more convincing than abstract visuals because they prove the product is already real, local, and working.',
          screenshotNote:
            'This official set focuses on deeper product surfaces such as settings, environment variables, metrics, MCP, and skills instead of repeating the same chat view.',
          screenshots: [
            {
              title: 'System Settings overview',
              description: 'A strong wide anchor visual that shows Bodhi already has a real settings center, not just a chat entry point.',
              src: '/screenshots/bodhi-system-settings-provider.png',
            },
            {
              title: 'Env Vars',
              description: 'Shows that environment variables can be managed for Bash usage with safer secret handling built into the product.',
              src: '/screenshots/bodhi-env-vars.png',
            },
            {
              title: 'Metrics',
              description: 'Highlights real usage analytics, efficiency summaries, and historical signals that make Bodhi feel like a durable system.',
              src: '/screenshots/bodhi-metrics.png',
            },
            {
              title: 'MCP',
              description: 'Proves external extensibility through a real configuration surface rather than an abstract architecture claim.',
              src: '/screenshots/bodhi-mcp.png',
            },
            {
              title: 'Skills',
              description: 'Shows the skill system as a browsable, searchable capability layer with clear product depth.',
              src: '/screenshots/bodhi-skills.png',
            },
          ],
        }

  return (
    <div className="page-shell download-shell">
      <div className="ambient ambient-a" aria-hidden="true" />
      <div className="ambient ambient-b" aria-hidden="true" />
      <div className="ambient ambient-c" aria-hidden="true" />

      <header className="top-nav panel">
        <a className="brand-lockup" href={homeUrl}>
          <span className="brand-mark">B</span>
          <span className="brand-copy">
            <strong>{content.nav.brand}</strong>
            <small>{content.nav.brandTagline}</small>
          </span>
        </a>

        <nav className="nav-links" aria-label="Download navigation">
          <a href={homeUrl}>{content.nav.home}</a>
          <a href={downloadUrl}>{content.nav.download}</a>
          <a href={docsOverviewUrl}>{content.nav.docs}</a>
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
                <a className="button button-secondary" href={docsFirstRunUrl}>
                  {copy.tertiaryCta}
                </a>
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
      <div className="ambient ambient-c" aria-hidden="true" />

      <header className="top-nav panel">
        <a className="brand-lockup" href={buildUrl('/', locale)}>
          <span className="brand-mark">B</span>
          <span className="brand-copy">
            <strong>{content.nav.brand}</strong>
            <small>{content.nav.brandTagline}</small>
          </span>
        </a>

        <nav className="nav-links" aria-label="Documentation navigation">
          <a href={buildUrl('/', locale)}>{content.nav.home}</a>
          <a href={buildUrl('/download', locale)}>{content.nav.download}</a>
          <a href="#overview">{content.nav.overview}</a>
          <a href="#first-run">{content.nav.firstRun}</a>
          <a href="#power-users">{content.nav.powerUsers}</a>
          <a href="#developers">{content.nav.developers}</a>
          <a href="#api">{content.nav.api}</a>
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

function App() {
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'
  const isDocsRoute = currentPath === '/docs' || currentPath.startsWith('/docs/')
  const isDownloadRoute = currentPath === '/download' || currentPath.startsWith('/download/')
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
    document.title = isDocsRoute
      ? content.meta.docsTitle
      : isDownloadRoute
        ? locale === 'zh'
          ? '下载 Bodhi · 最新版本与真实产品界面'
          : 'Download Bodhi · Latest release and real product surfaces'
        : content.meta.homeTitle
  }, [content, isDocsRoute, isDownloadRoute, locale])

  return isDocsRoute ? (
    <DocsPage locale={locale} setLocale={setLocale} content={content} />
  ) : isDownloadRoute ? (
    <DownloadPage locale={locale} setLocale={setLocale} content={content} />
  ) : (
    <HomePage locale={locale} setLocale={setLocale} content={content} />
  )
}

export default App
