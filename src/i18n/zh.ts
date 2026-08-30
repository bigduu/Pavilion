import type { Translation } from '../types'
import { apiCode, quickstartCode, repoGuideCode } from '../constants'

export const zh: Translation = {
  meta: {
    homeTitle: 'Bodhi AI · 桌面 AI Agent 工作台',
    docsTitle: 'Bodhi AI 文档 · 上手、自动化与开发者路径',
    featuresTitle: 'Bodhi AI 功能详解 · 桌面工作台、运行时与自动化',
  },
  nav: {
    brand: 'Bodhi AI',
    brandTagline: 'AI that actually works',
    highlights: '为什么是 Bodhi',
    features: '功能',
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
    bodhiServer: 'Bodhi Server',
    cicd: 'CI/CD',
    multiAgent: '多 Agent 协作',
    security: '安全',
    language: '语言',
  },
  hero: {
    kicker: 'BODHI AI',
    title: '不只会聊天的桌面 AI',
    subtitle: '不只是回答——它拆解目标、调用工具、持续推进，并把每次成功沉淀成自动化。',
    primaryCta: '下载 Bodhi',
    secondaryCta: '快速开始',
    chips: ['会执行', '过程可见', '可持续自动化'],
    stats: [
      { value: '100%', label: '本地优先执行，由 Bamboo 驱动' },
      { value: '9', label: 'Zenith 固定的九个 submodule，各自边界清晰' },
      { value: 'Rust', label: '结构化执行内核' },
    ],
    liveLabel: '实时任务流',
    liveTitle: 'AI 在替你推进任务，而不只是在回消息',
    liveSummary:
      'Bodhi 给 AI 产品表面，Lotus 让过程可见，Bamboo 给执行骨架。你看到的不是聊天，而是一套正在工作的桌面 AI 系统。',
    liveBadges: ['Bodhi Desktop', 'Lotus UI', 'Bamboo Runtime', 'MCP Tools'],
    liveTimeline: [
      { time: '00:00', title: '接收目标：整理本周事项并生成日报', state: 'done' },
      { time: '00:03', title: '创建任务清单并流式返回执行计划', state: 'done' },
      { time: '00:08', title: '连接 MCP、读取上下文并继续推进执行', state: 'live' },
      { time: '00:14', title: '写出结果，并把下一次运行交给自动化', state: 'queued' },
    ],
  },
  highlights: {
    kicker: 'WHY BODHI',
    title: '不只是另一个聊天 AI',
    items: [
      {
        icon: 'bolt',
        title: '会执行',
        description: '不止于回答——拆解任务、调用工具、持续推进，直到目标达成。',
        points: ['拆解目标为可执行步骤', '调用内置工具和 MCP 扩展', '持续保持任务状态直到完成'],
      },
      {
        icon: 'eye',
        title: '过程可见',
        description: '任务、工具调用、事件流实时可见，你始终知道 AI 在做什么。',
        points: ['WebSocket 优先的实时事件流', '任务和工具过程全程可见', '状态变化持续可追踪'],
      },
      {
        icon: 'trending',
        title: '可持续',
        description: '把成功执行沉淀成 Workflow 与 Schedule，越用越懂你的节奏。',
        points: ['Workflow 复用成功模式', 'Schedule 建立自动化节奏', '长期使用越用越强'],
      },
    ],
  },
  showcase: {
    kicker: 'PRODUCT',
    title: '真实产品界面，不是概念图',
    panels: [
      {
        kicker: 'System Settings',
        title: '统一设置中心',
        badge: 'Settings',
        imageSrc: '/screenshots/bodhi-system-settings-provider.png',
        imageAlt: 'Bodhi System Settings 界面截图',
      },
      {
        kicker: 'MCP',
        title: 'MCP 扩展管理',
        badge: 'MCP',
        imageSrc: '/screenshots/bodhi-mcp.png',
        imageAlt: 'Bodhi MCP 界面截图',
      },
      {
        kicker: 'Metrics',
        title: '使用指标统计',
        badge: 'Metrics',
        imageSrc: '/screenshots/bodhi-metrics.png',
        imageAlt: 'Bodhi Metrics 界面截图',
      },
    ],
  },
  capabilities: {
    kicker: 'CAPABILITIES',
    title: '四大核心能力',
    items: [
      {
        icon: 'layout',
        kicker: '01',
        title: '桌面工作台',
        description: '安装、设置、Provider、技能、指标，全部在一个桌面应用里。',
        points: ['桌面优先入口', '引导式首次设置', '完整产品体验'],
        featureId: 'desktop',
      },
      {
        icon: 'cpu',
        kicker: '02',
        title: '结构化运行时',
        description: 'Bamboo 本地 Rust 内核，把任务、工具、上下文、调度组织成执行核心。',
        points: ['本地 Rust 执行内核', '上下文编排', '公开 HTTP API'],
        featureId: 'runtime',
      },
      {
        icon: 'activity',
        kicker: '03',
        title: '可见执行',
        description: '任务、工具调用、事件流全程可见，长任务也清晰可懂。',
        points: ['共享 WebSocket 实时反馈', '任务进度可视化', '工具调用透明化'],
        featureId: 'visible',
      },
      {
        icon: 'workflow',
        kicker: '04',
        title: '自动化系统',
        description: 'MCP 扩能力、Workflow 复用、Schedule 定时，自动化越跑越省。',
        points: ['MCP Server 扩展', 'Workflow 复用', 'Schedule 定时执行'],
        featureId: 'automation',
      },
    ],
  },
  faq: {
    kicker: 'FAQ',
    title: '常见问题',
    items: [
      {
        question: 'Bodhi 和 Bamboo、Lotus 分别是什么关系？',
        answer: 'Bodhi 是桌面产品，Lotus 是 UI 层，Bamboo 是本地 Agent runtime，三者协作成完整系统。',
      },
      {
        question: 'Bodhi 是不是只是一个聊天界面？',
        answer: '不是。它能执行任务、实时展示进度、调用工具、接入 MCP、保存 Workflow 并定时自动化。',
      },
      {
        question: '我应该从哪里开始？',
        answer: '推荐直接从桌面端 Bodhi 开始；想先了解设置，可看文档的 First run。',
      },
      {
        question: '开发者应该从哪个模块开始？',
        answer: '桌面壳看 Bodhi，前端看 Lotus，引擎看 Bamboo——文档已按三层整理。',
      },
      {
        question: 'Bodhi 和其他 Agent 产品有什么不同？',
        answer: '它不是 UI 套模型，而是建立在 Bamboo 本地 Rust runtime 上、有自己执行与上下文路径，并通过清晰 MCP 边界扩展能力的完整桌面产品。',
      },
    ],
  },
  download: {
    primaryCta: '下载 Bodhi',
    secondaryCta: '快速开始',
    githubCta: 'GitHub',
    page: {
      kicker: 'DOWNLOAD BODHI',
      title: '下载 Bodhi AI，开始使用一个真正能持续推进工作的桌面 Agent。',
      description:
        '这是 Bodhi AI 的稳定下载入口。主按钮始终指向 GitHub 最新 release。你下载的不是一个临时聊天套壳，而是建立在 Bamboo 结构化 Rust runtime 之上的桌面工作台。',
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
        '这些截图直接来自真实运行中的 Bodhi。真实产品界面比抽象插画更有说服力。',
      screenshotNote:
        '这组官方截图优先展示设置中心、环境变量、指标、MCP 与技能系统等更能体现产品深度的功能面。',
      metaTitle: '下载 Bodhi · 最新版本与真实产品界面',
      screenshots: [
        {
          title: 'System Settings 总览',
          description: '展示 Bodhi 已经具备完整的设置中心。',
          src: '/screenshots/bodhi-system-settings-provider.png',
        },
        {
          title: 'Env Vars',
          description: '环境变量注入和 secret 管理。',
          src: '/screenshots/bodhi-env-vars.png',
        },
        {
          title: 'Metrics',
          description: '使用统计和效率指标。',
          src: '/screenshots/bodhi-metrics.png',
        },
        {
          title: 'MCP',
          description: '外部扩展能力配置界面。',
          src: '/screenshots/bodhi-mcp.png',
        },
        {
          title: 'Skills',
          description: '技能系统浏览和检索。',
          src: '/screenshots/bodhi-skills.png',
        },
      ],
    },
  },
  features: {
    kicker: 'FEATURES',
    title: '功能详解',
    description: '了解 Bodhi 的每一个核心能力——从桌面产品体验到底层执行引擎。',
    tocTitle: '功能目录',
    sections: [
      {
        id: 'desktop',
        title: '桌面工作台',
        paragraphs: [
          'Bodhi 是用户直接使用的桌面产品入口。安装后，你会看到一个完整的桌面应用——不是 CLI 循环，不是网页聊天框，而是一个有设置中心、技能管理、环境变量配置和使用统计的真实产品。',
          '首次启动时，Bodhi 会引导你完成 Provider 配置、网络检测和基础设置，确保第一次使用尽量无摩擦。',
        ],
        bullets: [
          '引导式首次设置：检测网络环境、配置 Provider、确认基础选项',
          '统一设置中心：Provider、系统能力、运行边界都有清晰入口',
          '环境变量管理：变量注入、secret 管理与本地执行上下文',
          '技能系统：可浏览、可检索的能力层，让产品边界清晰可见',
          '使用指标：历史使用汇总和效率信号，强化长期使用心智',
        ],
        imageSrc: '/screenshots/bodhi-system-settings-provider.png',
        imageAlt: 'Bodhi 桌面设置中心',
      },
      {
        id: 'runtime',
        title: '结构化运行时 (Bamboo)',
        paragraphs: [
          'Bamboo 是 Bodhi 的执行引擎——一个本地 Rust runtime，把任务调度、工具系统、上下文管理和扩展能力组织成一个真正的执行内核。',
          '它不依赖第三方 Agent 框架拼装核心链路，而是拥有自己的执行路径：从接收目标、创建任务、调用工具，到输出结果、保存上下文和触发后续自动化。',
        ],
        bullets: [
          '本地 Rust runtime：高性能、低延迟、完全本地执行',
          '任务系统：目标拆解、步骤管理、状态追踪',
          '工具系统：内置工具（文件操作、命令执行、网络请求等）',
          '上下文管理：长任务保留执行所需的上下文',
          'HTTP API：面向前端、桌面端和自动化脚本的本地公开接口',
          '实时传输：默认使用一条共享的 `/v2/stream` WebSocket；legacy SSE 仅用于首次建连失败回退或显式关闭',
        ],
        code: apiCode,
      },
      {
        id: 'visible',
        title: '可见执行 (Lotus)',
        paragraphs: [
          'Lotus 是 Bodhi 的 UI 交互层，让 Agent 的执行过程真正可见。你不需要等一个黑箱返回结果——任务进展、工具调用、状态变化都实时呈现在界面上。',
          'Lotus 默认使用一条共享的 `/v2/stream` WebSocket。legacy Server-Sent Events 仅在首次建连失败或显式关闭该路径时使用。',
        ],
        bullets: [
          '实时事件流：WebSocket 优先，任务进度实时可见',
          '任务状态可视化：每个步骤的状态（排队、执行中、完成）清晰展示',
          '工具调用透明化：看到 AI 调用了什么工具、传了什么参数、得到了什么结果',
          '多窗格交互：同时查看对话、工具输出和任务状态',
          '会话管理：历史会话可追溯，支持回看和复用',
        ],
        imageSrc: '/screenshots/bodhi-workbench.png',
        imageAlt: 'Bodhi 工作台界面',
      },
      {
        id: 'mcp',
        title: 'MCP 与扩展',
        paragraphs: [
          'MCP（Model Context Protocol）让 Bodhi 的能力边界可以持续扩展。通过接入 MCP Server，你可以把外部工具、数据源和系统集成到执行链路中。',
          'Bodhi 提供可视化的 MCP Server 管理：添加、配置、连接、刷新——都在设置中心里完成。',
        ],
        bullets: [
          'MCP Server 管理：添加、配置、连接、断开、刷新',
          'MCP Server 导入：批量导入 MCP 配置',
          '工具发现：自动发现已连接 MCP Server 提供的工具',
          'Provider 兼容接口：支持 OpenAI、Anthropic、Gemini 等前缀',
        ],
        imageSrc: '/screenshots/bodhi-mcp.png',
        imageAlt: 'Bodhi MCP 管理界面',
      },
      {
        id: 'automation',
        title: 'Workflow 与 Schedule',
        paragraphs: [
          'Bodhi 的长期价值不只在于一次任务成功，而在于把高频动作沉淀成系统能力。Workflow 保存多步骤执行模式，Schedule 让这些模式按节奏自动运行。',
          '最佳路径：先验证单次任务有效 → 保存为 Workflow → 加入 Schedule 建立固定节奏。',
        ],
        bullets: [
          'Workflow：保存成功的多步骤执行模式，一键复用',
          'Schedule：定时自动执行 Workflow，建立长期自动化节奏',
          'Session 管理：查看历史执行，回溯和复用',
          '执行历史：完整的运行记录和结果追踪',
        ],
        imageSrc: '/screenshots/bodhi-overview.png',
        imageAlt: 'Bodhi 自动化概览',
      },
      {
        id: 'skills',
        title: '技能系统',
        paragraphs: [
          '技能系统让 Bodhi 的能力以可浏览、可检索的方式呈现。每个技能代表一个具体的产品能力——从文件操作到代码执行，从网络请求到数据分析。',
        ],
        bullets: [
          '可浏览的技能目录',
          '可搜索的能力索引',
          '技能执行状态追踪',
        ],
        imageSrc: '/screenshots/bodhi-skills.png',
        imageAlt: 'Bodhi 技能系统',
      },
      {
        id: 'architecture',
        title: '技术架构',
        paragraphs: [
          '桌面启动链路分三步：Bodhi 启动或复用 `bamboo serve`，等待 `/api/v1/health`，再加载已经装配好的 Lotus UI。',
          '启动后，Lotus 调用 Bamboo 本地 `/api/v1/*` HTTP 端点，并通过共享 `/v2/stream` WebSocket 接收实时事件；legacy SSE 仅用于首次建连失败回退或显式关闭。',
        ],
        bullets: [
          'Bamboo：Rust runtime、HTTP API、内置工具、MCP、Workflow、Schedule',
          'Bodhi：桌面外壳、托管 Bamboo 生命周期、原生集成、发布交付',
          'Lotus：当前 React + Vite 交互层与 WebSocket 优先的实时 UI',
          'Pavilion：官网与文档入口',
          'Bodhi Server：可选的托管认证、凭据、计费、配额与 Provider 网关',
          'Jiandu：独立的文件系统共享记忆 Rust 库与 stdio MCP server',
          'Nova：通过 MCP 暴露原生电脑操作能力',
          'Lotus Next：与 Lotus 并行开发的下一代响应式前端路线',
          'Magpie：Telegram 与飞书/Lark IM 连接器和 Bamboo service plugin',
        ],
        code: repoGuideCode,
      },
      {
        id: 'bodhi-server',
        title: 'Bodhi Server 后端服务',
        paragraphs: [
          'Bodhi Server 是一个可选、可独立部署的 Go 服务，负责托管账号、API key、加密 Provider 凭据、计费、配额与 LLM 代理。',
          '它不是 Lotus 宿主、Bamboo 本地 API、Bamboo 会话存储或 Jiandu 记忆存储。本地 Bodhi → Bamboo → Lotus 链路不依赖它。',
        ],
        bullets: [
          '托管认证：JWT 用户与只保存哈希的机器 API key',
          '凭据保险库：使用 AES-256-GCM 加密 Provider secret',
          '网关控制：模型路由、计费、配额与 Provider 代理',
          '独立部署：PostgreSQL 支持的 Go 单体与 Docker 部署',
        ],
      },
      {
        id: 'cicd',
        title: '发布与自动化',
        paragraphs: [
          'Zenith 的发布系统由 GitHub Actions 驱动，核心是两个工作流：Release Train（手动触发）和 Nightly Release（自动调度）。Release Train 按 Lotus → Bamboo → Bodhi 的顺序链式发布，每个步骤验证上游依赖可用后才继续。',
          '版本管理集中在 release-train.config.json 中，统一控制 Bamboo、Lotus、Bodhi 的版本号。Nightly Release 每天 UTC 04:00 自动计算新版本（格式 YYYY.M.N），更新配置并触发 Release Train。',
        ],
        bullets: [
          'Release Train：链式发布 Lotus → Bamboo → Bodhi，自动验证依赖',
          'Nightly Release：每日自动版本计算（YYYY.M.N 格式）和发布',
          '发布门禁：cargo test、type-check、clippy、lint 全部通过',
          '版本统一：release-train.config.json 集中管理三仓库版本',
          '故障处理：支持按精确版本续跑和范围受控的重试',
        ],
      },
    ],
  },
  docs: {
    kicker: 'BODHI DOCUMENTATION',
    title: 'Bodhi 文档中心',
    description:
      '先用 Bodhi 理解体验，再沿着 Bamboo / Lotus / workflow / schedule 逐步深入。本文档页聚焦上手路径、能力边界与开发者入口。',
    tocTitle: '文档目录',
    sections: [
      {
        id: 'overview',
        title: '概览',
        paragraphs: [
          'Bodhi 是主产品形态；Lotus 是它的交互层；Bamboo 是本地 Agent runtime 与执行引擎。这个分工让产品、能力和架构都更容易被用户理解。',
          '如果你是第一次接触，建议先从"第一次运行"开始；如果你已经把 Bodhi 当成长期工具，再继续阅读进阶玩法和开发者章节。',
        ],
        bullets: ['首页：价值表达与转化入口', '文档：上手、扩展、集成', 'Bodhi 产品 → Bamboo 引擎 → Lotus 界面'],
      },
      {
        id: 'first-run',
        title: '第一次运行',
        paragraphs: [
          '第一次使用 Bodhi 的目标，是跑通一个"从打开到完成任务"的闭环。桌面端会优先承担引导式设置：检测网络环境、配置 Provider、确认基础选项。',
          '先从最小可用路径开始，确认流程有效后，再逐步启用 MCP、workflow 和 schedules。',
        ],
        bullets: ['先完成桌面引导', '先跑通一个任务，再考虑深度配置', '优先让第一次体验足够顺畅'],
        code: quickstartCode,
      },
      {
        id: 'power-users',
        title: '进阶玩法',
        paragraphs: [
          '当你把 Bodhi 当成日常工作的一部分时，真正的价值来自可扩展与可复用能力。Provider 负责模型接入；MCP 负责能力外扩；Workflow 负责复用；Schedule 负责自动化。',
          '最佳路径：先把一个有效任务跑通，再提炼成稳定工作流，最后加入 Schedule。',
        ],
        bullets: ['Provider：统一模型能力入口', 'MCP：把外部系统接进来', 'Workflow + Schedule：把成功经验沉淀成长期机制'],
      },
      {
        id: 'architecture',
        title: '架构与职责边界',
        paragraphs: [
          'Bodhi 负责桌面打包，启动或复用 `bamboo serve`，等待健康检查完成后再加载已经装配好的 Lotus 界面。',
          'Lotus 调用 Bamboo 本地 `/api/v1/*` HTTP 端点，默认使用一条共享的 `/v2/stream` WebSocket；legacy SSE 只用于首次建连失败回退或显式关闭。',
        ],
        bullets: [
          'Bamboo：本地 Rust Agent runtime 与上下文编排',
          'Bodhi：桌面外壳与托管 Bamboo 生命周期',
          'Lotus：当前可见 UI 层',
          'Pavilion：官网与知识入口',
          'Bodhi Server：可选的托管认证、配额、计费、凭据与 Provider 网关',
          'Jiandu：独立的共享记忆 Rust 库与 stdio MCP server',
          'Nova：原生 computer-use MCP server',
          'Lotus Next：与 Lotus 并行的响应式前端路线',
          'Magpie：IM 连接器与 Bamboo service plugin',
        ],
      },
      {
        id: 'automation',
        title: '自动化思路',
        paragraphs: [
          'Bodhi 的长期价值不只是一次任务成功，而是把高频动作逐步沉淀成系统能力。Workflow 适合保存多步骤流程；Schedule 适合定时运行。',
          '两者结合后，Bodhi 从"会话型工具"变成"持续协作者"。',
        ],
        bullets: ['先验证单次任务有效', '再保存为 Workflow', '最后用 Schedule 建立固定节奏'],
      },
      {
        id: 'developers',
        title: '开发者入口',
        paragraphs: [
          '最重要的是先理解职责边界：Bodhi 是桌面壳，Lotus 是当前 UI 资产源，Bamboo 是运行时、API 与上下文核心。按职责直接进入对应项目。',
          '前端重点关注 Lotus 的事件订阅与多窗格结构；运行时关注 Bamboo 的路由、工具、调度与上下文；共享记忆属于 Jiandu，电脑操作属于 Nova，桌面发布与原生集成属于 Bodhi。',
        ],
        bullets: ['遵循九个仓库的职责边界', '组件之间使用公开 API 与 MCP', '官网只描述已经交付的行为'],
        code: repoGuideCode,
      },
      {
        id: 'api',
        title: '关键 API',
        paragraphs: [
          '对于前端、桌面端和自动化脚本来说，最关键的是会话执行、事件流、MCP 管理以及 schedule 相关端点。',
        ],
        code: apiCode,
      },
      {
        id: 'bodhi-server',
        title: 'Bodhi Server (后端服务)',
        paragraphs: [
          'Bodhi Server 是一个可选的 Go 托管服务，负责账号、API key、加密 Provider 凭据、模型路由、计费、配额与 LLM 代理。',
          '它使用 PostgreSQL 与 Docker 独立部署，不托管 Lotus、不替代 Bamboo 本地 API，也不保存 Bamboo 会话或 Jiandu 记忆。',
        ],
        bullets: [
          'JWT 用户与只保存哈希的机器 API key',
          '加密 Provider 凭据保险库',
          '模型路由、计费、配额与 Provider 代理',
          'PostgreSQL 与 Docker 独立部署',
        ],
      },
      {
        id: 'cicd',
        title: 'CI/CD 与发布系统',
        paragraphs: [
          'Zenith 采用全自动化的 CI/CD 流程管理 Lotus、Bamboo、Bodhi 三个仓库的协同发布。Release Train 工作流串联 Lotus → Bamboo → Bodhi 的发布顺序，确保依赖关系正确处理。',
          'Nightly Release 每天自动计算并发布新版本。版本号遵循 YYYY.M.N 格式（如 2026.4.29），当月份变化时 N 重置为 1。Release Train 会自动验证 crates.io 和 npm 上的包可用性后才继续下一步。',
        ],
        bullets: [
          'Release Train：一键触发 Lotus → Bamboo → Bodhi 的链式发布',
          'Nightly Release：每日自动版本计算和发布调度',
          '版本统一管理：release-train.config.json 集中管理三个仓库的版本号',
          '发布前验证：自动检查 crates.io 和 npm 包可用性',
          '回滚机制：支持通过 workflow_dispatch 手动触发指定版本发布',
        ],
      },
      {
        id: 'multi-agent',
        title: '多 Agent 协作',
        paragraphs: [
          'Zenith 使用 GitHub Projects "Zenith Roadmap" 来协调多个 agent 在并行工作时避免冲突。每个 agent 通过认领任务、更新看板状态、提交 PR 的方式参与协作。',
          '工作流遵循 Backlog → Triaged → Ready → In Progress → In Review → Done 的看板流程。同一模块最多允许 2 个 agent 同时工作，跨模块任务需要串行处理。',
        ],
        bullets: [
          'GitHub Projects 看板：可视化任务状态和优先级',
          '任务认领机制：通过评论标记 claimed by <agent-id>',
          '分支命名规范：<module>/<type>/<issue-number>-<short-desc>',
          '并行约束：同模块最多 2 个 agent，跨模块任务串行',
          '合并门禁：验收标准满足、required checks 通过、没有未解决的 review thread 或 requested change，并重新核验 live PR head、base、mergeability 且保护规则允许后，agent 才可合并；仅在用户明确要求或规则强制时需要人工批准',
        ],
      },
      {
        id: 'security',
        title: '安全与测试',
        paragraphs: [
          'Zenith 栈重视工程安全和代码质量。Bamboo 使用 rustls-webpki 进行 TLS 证书验证，已修复潜在的安全漏洞。Bodhi Server 包含完整的单元测试覆盖（internal/config 包）。',
          '发布流程中包含安全审查检查点，所有代码变更需通过 cargo clippy、单元测试和类型检查才能进入发布候选。',
        ],
        bullets: [
          'TLS 安全：rustls-webpki 用于安全的 TLS 连接',
          '单元测试：Bodhi Server internal/config 包已覆盖测试',
          '代码质量：cargo fmt、clippy、Prettier 强制格式化',
          '发布门禁：测试通过、版本验证、安全检查后方可发布',
          '依赖审计：定期更新子模块以包含安全修复',
        ],
      },
    ],
  },
  footer: {
    home: 'Bodhi · Local AI agent powered by Bamboo and Lotus',
    docs: 'Bodhi Docs · Setup, extension paths, and developer entry points',
  },
}
