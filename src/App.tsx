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
const GITHUB_URL = 'https://github.com/bigduu/Zenith'
const BODHI_RELEASES_URL = 'https://github.com/bigduu/Bodhi/releases'

const quickstartCode = String.raw`# quick start with Bodhi desktop
cd bodhi
npm install
npm run tauri:dev

# full workspace
git clone --recursive https://github.com/bigduu/Zenith.git
cd Zenith

# bamboo runtime
cd bamboo
cargo run --bin bamboo -- serve --port 9562 --bind 127.0.0.1

# lotus UI
cd ../lotus
npm install
npm run dev`

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
      homeTitle: 'Bodhi · 本地 AI Agent 官网',
      docsTitle: 'Bodhi 文档 · 上手、扩展与开发指南',
    },
    nav: {
      brand: 'Bodhi',
      brandTagline: 'Local AI agent for real work',
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
      kicker: 'BODHI · LOCAL AI AGENT',
      title: '让你的 AI 不只会回答，而是真的开始做事。',
      subtitle:
        'Bodhi 是运行在你自己机器上的本地 Agent。由 Bamboo 执行引擎驱动，配合 Lotus 的实时交互界面，让你能发起任务、看到进度、连接工具，并把重复工作沉淀成自动化流程。',
      primaryCta: '开始使用',
      secondaryCta: '查看 GitHub',
      chips: ['本地优先', '实时进度', 'MCP 扩展', '工作流与定时任务'],
      stats: [
        {
          value: 'Local-first',
          label: '数据、配置与执行节奏都在你自己的机器上。',
        },
        {
          value: 'Visible execution',
          label: '不是只给结果，而是持续展示任务、工具和事件流。',
        },
        {
          value: 'Reusable automation',
          label: '把一次对话沉淀成 workflow 和 schedule。',
        },
      ],
      liveLabel: '实时任务流',
      liveTitle: 'Bamboo 正在推动一次真正的 Agent 执行',
      liveSummary:
        'Lotus 负责把每一步展示给你；Bamboo 负责执行、调度、接入工具与外部能力。Bodhi 把这一切收敛成一套开箱即用的桌面体验。',
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
          title: '连接 MCP 工具、读取上下文并执行步骤',
          state: 'live',
        },
        {
          time: '00:14',
          title: '写出结果，并安排明早自动运行',
          state: 'queued',
        },
      ],
    },
    proof: {
      items: [
        'Rust 驱动的本地执行引擎',
        'Server-Sent Events 实时流式反馈',
        '桌面端引导式上手',
        'MCP 可扩展能力',
        'Workflows 与 Schedules 自动化',
        '多 Provider 兼容',
      ],
    },
    showcase: {
      kicker: 'PRODUCT DEMO',
      title: '把产品本身展示出来，而不是只用抽象概念讲故事',
      description:
        '第二轮增强把“下载、首次运行、进度反馈、自动化沉淀”放到了更靠前的位置，让官网更像一个真正能转化的产品站。',
      panels: [
        {
          kicker: 'Desktop onboarding',
          title: '先把第一次体验跑通',
          description: '用更短的上手路径，把安装、Provider 配置和首次运行衔接起来。',
          badge: 'Welcome -> Setup -> Run',
          lines: ['检测网络与 Provider 环境', '减少首次使用阻力', '让用户更快看到结果'],
        },
        {
          kicker: 'Visible execution',
          title: '执行过程就是产品卖点的一部分',
          description: '官网中直接模拟 Bodhi 的运行状态，让用户一眼明白它不是纯聊天工具。',
          badge: 'Todo · Tool · SSE',
          lines: ['实时任务流与工具调用', '结果逐步生成而非黑箱完成', '适合复杂任务与长任务'],
        },
        {
          kicker: 'Durable automation',
          title: '从一次会话延伸到长期自动化',
          description: '通过 workflow 与 schedule，把有效结果积累成可以复用、自动执行的系统。',
          badge: 'Workflow -> Schedule',
          lines: ['保存高频任务流程', '定时自动运行', '把 agent 变成长期协作者'],
        },
      ],
    },
    comparison: {
      kicker: 'WHY BODHI',
      title: '大多数 AI 产品停在回答，Bodhi 会继续把工作往前推。',
      description:
        '如果你已经厌倦“得到一段答案，然后还得自己继续做事”，Bodhi 会给你更可执行、更可见、也更可复用的工作方式。',
      ordinaryLabel: '普通 AI Chat',
      bodhiLabel: 'Bodhi',
      rows: [
        {
          topic: '结果形式',
          ordinary: '返回一段文本或建议',
          bodhi: '发起并推进实际任务',
        },
        {
          topic: '过程可见性',
          ordinary: '过程大多不可见',
          bodhi: 'token、任务、工具与事件持续流动',
        },
        {
          topic: '能力扩展',
          ordinary: '受限于固定产品边界',
          bodhi: '通过 MCP、工具与 Provider 持续扩展',
        },
        {
          topic: '复用方式',
          ordinary: '每次都从头开始',
          bodhi: '沉淀为 workflow 与 schedule',
        },
      ],
    },
    capabilities: {
      kicker: 'CAPABILITIES',
      title: '围绕真实工作场景构建的 4 个核心能力',
      description:
        '无论你是第一次接触 agent，还是希望把它接入自己的工作系统，Bodhi 都有一条自然的成长路径。',
      items: [
        {
          kicker: '01 · Local-first runtime',
          title: '在你自己的机器上运行',
          description:
            'Bamboo 提供本地 Agent runtime，让你的数据、配置、工具和执行节奏都保持可控，而不是藏在远端黑箱里。',
          points: ['本地运行与本地数据目录', '对执行环境有感知', '适合隐私敏感与深度自定义场景'],
        },
        {
          kicker: '02 · Live execution visibility',
          title: '每一步都有反馈，不再是黑箱',
          description:
            'Lotus 和 Bamboo 通过事件流把 token、工具调用、Todo 与任务状态持续展示出来，让复杂任务也可理解、可追踪。',
          points: ['流式返回结果与状态', '看到任务和工具调用过程', '更适合长任务与复杂任务'],
        },
        {
          kicker: '03 · MCP + providers + tools',
          title: '把模型、工具和外部系统接进来',
          description:
            'Bodhi 不把能力锁死在一个产品边界里。你可以配置 Provider、连接 MCP Server，并逐步把自己的工作环境接入。',
          points: ['兼容 OpenAI、Anthropic、Gemini 等', '通过 MCP 持续扩展', '把你的文件、命令和系统接入 agent'],
        },
        {
          kicker: '04 · Workflows + schedules',
          title: '把重复工作沉淀成自动化系统',
          description:
            '从一次会话开始，到保存为 workflow，再到 schedule 定时执行，Bodhi 可以从临时助手成长为长期协作者。',
          points: ['保存可复用流程', '按计划自动执行', '结果可回看、可继续迭代'],
        },
      ],
    },
    architecture: {
      kicker: 'SYSTEM DESIGN',
      title: '一个完整的本地 Agent 系统，而不是一层聊天界面',
      description:
        'Bodhi 负责体验入口，Lotus 负责交互层，Bamboo 负责本地执行与扩展能力。Pavilion 则负责把价值、使用路径与文档讲清楚。',
      flowLabel: '请求流向',
      flowTitle: '从目标输入到自动化执行',
      flowSteps: [
        '你描述目标',
        'Bodhi 提供桌面入口与引导',
        'Lotus 展示实时会话、设置与进度',
        'Bamboo 调度任务、工具、MCP 与 Provider',
        '结果沉淀为 workflow 或 schedule',
      ],
      layers: [
        {
          name: 'Bodhi',
          role: 'Desktop shell',
          description: '桌面应用入口，负责首次启动、窗口行为、原生集成与发布交付。',
          bullets: ['桌面安装与启动', '引导式设置流程', '把 Web 体验收敛成产品形态'],
        },
        {
          name: 'Lotus',
          role: 'UI layer',
          description: '聊天、多窗格、设置中心与实时状态展示，让 Agent 的执行过程真正可见。',
          bullets: ['聊天与多窗格交互', 'SSE 实时状态订阅', 'Provider / MCP / Schedule 设置中心'],
        },
        {
          name: 'Bamboo',
          role: 'Local runtime',
          description: '本地 Rust 执行内核，提供 API、工具系统、事件流、工作流、调度与扩展能力。',
          bullets: ['本地 Agent runtime', '内置工具与 HTTP API', 'MCP、workflow、schedule 支撑'],
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
        'Pavilion 不需要在一页塞完所有细节。首页负责让用户想试，文档负责让用户真正上手、扩展与集成。',
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
          title: '把 Bamboo 接入你的系统',
          description: '开发者可以从 API、模块边界、仓库结构和集成方式开始深入。',
          bullets: ['Rust runtime 与 HTTP API', '事件流与前后端边界', 'Monorepo / submodule 协作方式'],
          cta: '查看开发者指南',
        },
      ],
    },
    finalCta: {
      title: '从 Bodhi 开始；需要深入时，再进入 Bamboo、Lotus 与文档。',
      description:
        '把 Pavilion 作为你的第一站：先理解价值，再进入安装、能力扩展和开发者资料。',
      primaryCta: '阅读文档',
      secondaryCta: '前往 GitHub',
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
            '仓库采用 monorepo + submodule 结构。功能改动应优先在对应子模块完成，再回到根仓更新 submodule pointer。',
            '前端实时行为重点关注 Lotus 的事件订阅与多窗格结构；后端则关注 Bamboo 的路由、工具能力、调度与 MCP 管理。',
          ],
          bullets: ['先改子模块，再更新根仓指针', '前端关注 Lotus，桌面壳关注 Bodhi，执行面关注 Bamboo', '把官网、文档与产品定位保持一致'],
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
      homeTitle: 'Bodhi · Local AI agent for real work',
      docsTitle: 'Bodhi Docs · Setup, automation, and developer guide',
    },
    nav: {
      brand: 'Bodhi',
      brandTagline: 'Local AI agent for real work',
      why: 'Why Bodhi',
      capabilities: 'Capabilities',
      architecture: 'Architecture',
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
      kicker: 'BODHI · LOCAL AI AGENT',
      title: 'Your AI should do more than answer. It should move work forward.',
      subtitle:
        'Bodhi is a local AI agent that runs on your own machine. Powered by Bamboo and shaped through the Lotus interface layer, it helps you launch tasks, see progress live, connect tools, and turn repeatable work into automation.',
      primaryCta: 'Get started',
      secondaryCta: 'View GitHub',
      chips: ['Local-first', 'Streaming progress', 'MCP extensible', 'Workflows and schedules'],
      stats: [
        {
          value: 'Local-first',
          label: 'Your data, configuration, and execution flow stay under your control.',
        },
        {
          value: 'Visible execution',
          label: 'See tasks, tools, and event streams instead of only a final answer.',
        },
        {
          value: 'Reusable automation',
          label: 'Turn one useful session into a workflow or a scheduled routine.',
        },
      ],
      liveLabel: 'Live task stream',
      liveTitle: 'Bamboo is driving a real agent runtime underneath the UI',
      liveSummary:
        'Lotus makes every step visible. Bamboo handles execution, orchestration, tools, MCP, providers, and automation. Bodhi turns the stack into a polished desktop product.',
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
          title: 'MCP tools connected and context pulled into execution',
          state: 'live',
        },
        {
          time: '00:14',
          title: 'Result prepared and a scheduled rerun queued for tomorrow',
          state: 'queued',
        },
      ],
    },
    proof: {
      items: [
        'Rust-powered local runtime',
        'Server-Sent Events for live feedback',
        'Desktop onboarding flow',
        'MCP extensibility',
        'Workflow and schedule automation',
        'Multi-provider ready',
      ],
    },
    comparison: {
      kicker: 'WHY BODHI',
      title: 'Most AI products stop at answers. Bodhi keeps the work moving.',
      description:
        'If you are tired of getting a paragraph back and then doing the real work yourself, Bodhi gives you a more executable, visible, and reusable model of work.',
      ordinaryLabel: 'Typical AI chat',
      bodhiLabel: 'Bodhi',
      rows: [
        {
          topic: 'Output',
          ordinary: 'Returns text or suggestions',
          bodhi: 'Starts and advances real tasks',
        },
        {
          topic: 'Visibility',
          ordinary: 'Execution is mostly hidden',
          bodhi: 'Tokens, tasks, tools, and events stay visible',
        },
        {
          topic: 'Extensibility',
          ordinary: 'Bound by a fixed product surface',
          bodhi: 'Extends through MCP, tools, and providers',
        },
        {
          topic: 'Reuse',
          ordinary: 'Starts from scratch each time',
          bodhi: 'Compounds into workflows and schedules',
        },
      ],
    },
    capabilities: {
      kicker: 'CAPABILITIES',
      title: 'Four core capabilities built around real work',
      description:
        'Whether you are new to agents or ready to plug one into your own system, Bodhi gives you a clear path from first run to serious automation.',
      items: [
        {
          kicker: '01 · Local-first runtime',
          title: 'Run your agent where your work already lives',
          description:
            'Bamboo provides the local agent runtime so data, tools, configuration, and execution remain understandable and controllable.',
          points: [
            'Runs locally with a real data directory',
            'Closer to your actual files and workflows',
            'Fits privacy-sensitive and highly customized environments',
          ],
        },
        {
          kicker: '02 · Live execution visibility',
          title: 'See the work happen, not just the answer',
          description:
            'Lotus and Bamboo stream tokens, tool calls, todo progress, and event updates so even complex runs stay legible.',
          points: [
            'Live response and state updates',
            'Traceable tasks and tool calls',
            'Built for longer and more complex sessions',
          ],
        },
        {
          kicker: '03 · MCP + providers + tools',
          title: 'Connect models, tools, and external systems',
          description:
            'Bodhi does not lock capability inside a narrow app boundary. Configure providers, connect MCP servers, and plug your real environment into the agent loop.',
          points: [
            'Works with OpenAI, Anthropic, Gemini, and more',
            'Expands through MCP servers',
            'Brings files, commands, and systems into execution',
          ],
        },
        {
          kicker: '04 · Workflows + schedules',
          title: 'Turn repeated work into a durable system',
          description:
            'Start with a single successful run, save it as a workflow, and let schedules turn it into repeatable automation.',
          points: [
            'Save reusable task flows',
            'Run them on a schedule',
            'Review and refine results over time',
          ],
        },
      ],
    },
    architecture: {
      kicker: 'SYSTEM DESIGN',
      title: 'A complete local agent system, not just a chat layer',
      description:
        'Bodhi is the product surface. Lotus is the interaction layer. Bamboo is the local runtime and execution engine. Pavilion explains the value, path, and documentation clearly.',
      flowLabel: 'Request flow',
      flowTitle: 'From goal input to reusable automation',
      flowSteps: [
        'You describe a goal',
        'Bodhi provides the desktop product entry',
        'Lotus renders chat, settings, and live progress',
        'Bamboo orchestrates tasks, tools, MCP, and providers',
        'Results become workflows or schedules',
      ],
      layers: [
        {
          name: 'Bodhi',
          role: 'Desktop shell',
          description:
            'The product entry point for onboarding, packaging, native integration, and the desktop experience.',
          bullets: ['Desktop install and launch', 'Guided first-run setup', 'Turns the stack into a coherent product'],
        },
        {
          name: 'Lotus',
          role: 'UI layer',
          description:
            'The React + Vite interaction layer for chat, multi-pane workflows, settings, and visible progress.',
          bullets: ['Chat and multi-pane UX', 'SSE-based progress rendering', 'Provider, MCP, and schedule settings'],
        },
        {
          name: 'Bamboo',
          role: 'Local runtime',
          description:
            'The Rust execution core that exposes APIs, built-in tools, streaming events, workflows, schedules, and extension points.',
          bullets: ['Local agent runtime', 'Built-in tools and HTTP API', 'MCP, workflows, and schedules'],
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
        'Pavilion should not force every detail onto one screen. Home creates momentum. Docs support real adoption, extension, and integration.',
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
          title: 'Integrate Bamboo into your stack',
          description: 'Developers can go deeper through APIs, module boundaries, repository structure, and runtime behavior.',
          bullets: ['Rust runtime and HTTP API', 'Streaming boundaries', 'Monorepo and submodule workflow'],
          cta: 'Open developer guide',
        },
      ],
    },
    finalCta: {
      title: 'Start with Bodhi. Go deeper through Bamboo, Lotus, and the docs when you are ready.',
      description:
        'Use Pavilion as the first stop: understand the product, begin the setup path, and then dive into extensibility and developer materials.',
      primaryCta: 'Read the docs',
      secondaryCta: 'Open GitHub',
    },
    docs: {
      kicker: 'BODHI DOCUMENTATION',
      title: 'Bodhi documentation hub',
      description:
        'Learn the experience through Bodhi first, then move deeper into Bamboo, Lotus, workflows, and schedules. This page focuses on setup paths, capability boundaries, and developer entry points.',
      updatedLabel: 'Last updated',
      tocTitle: 'Documentation map',
      sections: [
        {
          id: 'overview',
          title: 'Overview',
          paragraphs: [
            'Pavilion is now positioned as the official marketing and documentation site for Bodhi. The home page frames the value. The docs page carries setup, advanced usage, and developer integration.',
            'Bodhi is the product surface people should remember. Lotus is the interaction layer. Bamboo is the local runtime and execution engine that makes the product credible and extensible.',
            'If you are new, start with the first-run path. If Bodhi is already part of your workflow, continue into power-user and developer sections.',
          ],
          bullets: ['Home: product framing and conversion', 'Docs: setup, extension, and integration', 'Bodhi first, Bamboo as runtime, Lotus as UI layer'],
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
            'Once Bodhi becomes part of daily work, the real leverage comes from extensibility and reuse.',
            'Providers bring model choice. MCP servers expand your capability boundary. Workflows preserve success. Schedules make it recurring.',
            'A good progression is: prove one task, turn it into a workflow, then add schedules to make the system durable.',
          ],
          bullets: ['Providers unify model access', 'MCP brings outside systems into the loop', 'Workflows and schedules convert one-off success into a repeatable system'],
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
            'For developers, the most important first step is understanding the boundary: Bodhi is the desktop shell, Lotus is the UI source of truth, and Bamboo is the runtime plus API core.',
            'The repository uses a monorepo plus submodules. Changes should land in the correct submodule first, then be reflected through updated pointers in the root repository.',
            'Front-end work centers on Lotus streaming, multi-pane behavior, and settings flows. Backend work centers on Bamboo routes, tools, scheduling, and MCP management.',
          ],
          bullets: ['Change submodules first, then update root pointers', 'Keep front-end, desktop, and runtime ownership clear', 'Align website messaging with the actual product boundary'],
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
  const docsOverviewUrl = buildUrl('/docs', locale, 'overview')
  const docsFirstRunUrl = buildUrl('/docs', locale, 'first-run')
  const docsUrl = buildUrl('/docs', locale, 'overview')

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
          <a href="#architecture">{content.nav.architecture}</a>
          <a href={docsUrl}>{content.nav.docs}</a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
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
              <a className="button button-primary" href={docsFirstRunUrl}>
                {content.hero.primaryCta}
              </a>
              <a
                className="button button-secondary"
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content.hero.secondaryCta}
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

        <RevealSection id="why-bodhi" className="panel section-card comparison-section">
          <SectionIntro
            kicker={content.comparison.kicker}
            title={content.comparison.title}
            description={content.comparison.description}
          />

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

        <RevealSection className="panel final-cta">
          <div>
            <p className="section-kicker">BODHI NEXT STEP</p>
            <h2>{content.finalCta.title}</h2>
            <p className="section-description final-description">{content.finalCta.description}</p>
          </div>

          <div className="hero-actions final-actions">
            <a className="button button-primary" href={docsOverviewUrl}>
              {content.finalCta.primaryCta}
            </a>
            <a
              className="button button-secondary"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
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
