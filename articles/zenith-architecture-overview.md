# Zenith 架构总览

Zenith 是一个薄层 monorepo。根仓库负责固定九个 submodule 的提交指针、协作规则和发布列车；产品能力由各 submodule 按清晰边界独立实现。

本文只描述当前已经存在的边界和通信路径，不把规划中的集成写成已交付功能。

## 九个 submodule

| Submodule | 当前职责 |
| --- | --- |
| [bamboo](https://github.com/bigduu/Bamboo-agent) | 本地优先的 Rust Agent runtime：执行、工具、会话、上下文编排、HTTP API、Workflow 与 Schedule |
| [bodhi](https://github.com/bigduu/Bodhi-AI) | Tauri 桌面外壳：启动画面、托管 Bamboo 生命周期、原生集成、打包与发布 |
| [lotus](https://github.com/bigduu/Lotus) | 当前 React + Vite UI：对话、任务与工具可视化、设置、默认 WebSocket 实时流 |
| [pavilion](https://github.com/bigduu/Pavilion) | 官方网站与文档入口；不运行 Agent，也不代理运行时请求 |
| [bodhi-server](https://github.com/bigduu/bodhi-server) | 可选的托管服务：账号、API key、加密 Provider 凭据、模型路由、计费、配额与 LLM 代理 |
| [jiandu](https://github.com/bigduu/Jiandu) | 独立的小型共享记忆边界：Rust library + stdio MCP server，使用文件系统保存与检索记忆 |
| [nova](https://github.com/bigduu/Nova) | 原生 computer-use MCP server：Accessibility/UI Automation 优先，并提供截图与输入能力 |
| [lotus-next](https://github.com/bigduu/lotus-next) | 与 Lotus 并行开发的下一代响应式前端路线；不是当前 Bodhi 默认装配的 UI |
| [magpie](https://github.com/bigduu/Magpie) | Telegram 与飞书/Lark IM 连接器，通过 Bamboo 公开 HTTP/WS API 工作，并可作为 Bamboo service plugin 运行 |

Zenith 根仓库本身不是第十个 submodule，也不承载运行时代码。

## 桌面启动链路

Bodhi、Bamboo 和 Lotus 的启动顺序与请求方向是两件不同的事。

```text
Bodhi 启动画面
  ↓
启动或复用本机 bamboo serve
  ↓
等待 GET /api/v1/health 成功
  ↓
加载构建时装配好的 Lotus UI
```

Bodhi 管理桌面窗口和 Bamboo sidecar 生命周期。它不把 Bamboo 作为 Rust crate 链入进程，也不维护一份独立的前端实现；Lotus 资产在构建或开发阶段装配进桌面应用。

## 运行时请求链路

Lotus 加载后直接使用 Bamboo 的本地公开接口：

```text
Lotus ── HTTP /api/v1/* ──> Bamboo
Lotus <── shared WebSocket /v2/stream ──> Bamboo
```

- 普通命令、查询和变更使用本地 HTTP API。
- 实时事件默认复用一条共享的 `/v2/stream` WebSocket；默认承载 JSON 文本，也可显式协商 MessagePack。
- legacy `/api/v1/stream` 与 `/api/v1/events/{session_id}` SSE 只在首次 WebSocket 建连失败或客户端显式关闭 WebSocket 路径时使用。
- WebSocket 曾经成功建立后的普通断线由 WebSocket 客户端重连，不会立即创建第二套 SSE 流。

这条本地链路不依赖 Bodhi Server。

## 执行上下文与共享记忆

Bamboo 负责一次 Agent 执行中的上下文组织、工具调用、任务状态和 prompt assembly。Jiandu 是独立的共享记忆 library 与 stdio MCP server，供获得相应权限的 MCP host 使用。

两者的边界是：

- Bamboo 管理当前执行需要什么上下文。
- Jiandu 保存和检索可跨会话共享的记忆。
- 其它 Agent 可以把 Jiandu 当作 MCP memory 使用，无需依赖 Bamboo 内部实现。
- 不直接编辑 Jiandu 数据文件；通过 Jiandu API 或 MCP tool 操作。

Jiandu 已经存在并可独立使用，但本文不声称某个 Bamboo release 已经把内部 memory facade 全部切换到 Jiandu。具体集成状态应以对应 Bamboo release 为准。

## MCP 与外部交互边界

### Jiandu

Jiandu 暴露一个统一的 `memory` MCP tool，覆盖 Session 连续性笔记和 Project/Global 持久记忆。它不提供 daemon、HTTP 服务或版本兼容层。

### Nova

Nova 通过 MCP 暴露原生桌面读取与操作能力。它优先使用 macOS Accessibility 或 Windows UI Automation 获取语义结构，在真正需要视觉信息时再使用截图，并通过原生输入 API 完成操作。

### Magpie

Magpie 把 Telegram 与飞书/Lark 消息桥接到 Bamboo。它只依赖 Bamboo 的公开 HTTP 与 `/v2/stream` WebSocket 接口，不调用 Bamboo 进程内实现；作为 service plugin 安装时由 Bamboo 负责启动与监督。

## Bodhi Server 是可选服务

Bodhi Server 适合需要中心化托管能力的部署：

- JWT 用户与 hash-only machine API key；
- AES-256-GCM Provider 凭据保险库；
- 模型注册与多实例路由；
- 计费、配额、审计与 Provider proxy；
- PostgreSQL 与 Docker 部署。

它不是：

- Lotus 的静态资源宿主；
- Bamboo 的本地 `/api/v1/*` 服务；
- Bamboo 会话存储；
- Jiandu 记忆存储；
- 本地 Bodhi → Bamboo → Lotus 启动链路的必需组件。

需要托管 LLM 网关时，Bamboo 或其它客户端可以使用 Bodhi Server 的 `/proxy/*` 路径；不需要时，本地桌面链路可以完全独立运行。

## Pavilion 与 Lotus Next

Pavilion 是静态官网和文档表面。它解释产品、提供下载入口并链接各仓库，但不连接本地 Bamboo 或 Bodhi Server。

Lotus Next 是独立的下一代响应式前端路线。它与当前 Lotus 共享 Bamboo 公开 API 这一边界，但应按自身 README 理解功能和传输策略；它不应被描述成已经替换当前 Bodhi 中的 Lotus。

## 发布链路

Zenith 的 Release Train 按依赖顺序发布：

```text
Lotus → Bamboo → Bodhi
```

Lotus 先发布 npm 包，Bamboo 随后可装配对应前端版本并发布 Rust crate，Bodhi 最后组合已发布的 Bamboo 与 Lotus 版本生成桌面 release。Pavilion、Jiandu、Nova、Lotus Next、Magpie 与 Bodhi Server 保持各自仓库的独立验证和发布边界。

## 开发入口

从 Zenith 根仓库初始化全部 submodule：

```bash
git submodule update --init --recursive
```

然后进入目标边界工作：

- 桌面壳与 sidecar 生命周期：`bodhi/`
- 当前 UI：`lotus/`
- 本地 Agent runtime：`bamboo/`
- 共享记忆：`jiandu/`
- 原生 computer use：`nova/`
- 响应式前端路线：`lotus-next/`
- IM connector/plugin：`magpie/`
- 托管服务端：`bodhi-server/`
- 官网与文档：`pavilion/`

跨组件开发优先遵守公开 HTTP、WebSocket 和 MCP 边界，不把一个模块的内部类型复制成另一个模块的兼容层。

## 相关链接

- [Zenith 根仓库](https://github.com/bigduu/Zenith)
- [Bodhi](https://github.com/bigduu/Bodhi-AI)
- [Lotus](https://github.com/bigduu/Lotus)
- [Bamboo](https://github.com/bigduu/Bamboo-agent)
- [Jiandu](https://github.com/bigduu/Jiandu)
- [Nova](https://github.com/bigduu/Nova)
- [Lotus Next](https://github.com/bigduu/lotus-next)
- [Magpie](https://github.com/bigduu/Magpie)
- [Bodhi Server](https://github.com/bigduu/bodhi-server)
