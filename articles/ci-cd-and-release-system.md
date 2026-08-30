# CI/CD 与发布系统

Zenith 采用全自动化的 CI/CD 流程来管理 Bamboo、Lotus、Bodhi 三个核心仓库的协同发布。这套系统由 GitHub Actions 驱动，确保每次发布都经过验证、有序且可追踪。

---

## 核心工作流

### 1. Release Train（发布列车）

**触发方式**：手动触发 (`workflow_dispatch`)

**发布顺序**：Lotus → Bamboo → Bodhi

**设计原理**：
- Lotus 先发布 `@bigduu/lotus` 到 npm，供 Bamboo 嵌入精确版本
- Bamboo 随后发布到 crates.io
- Bodhi 使用已发布的 Lotus 和 Bamboo 版本，最后打包桌面应用

**输入参数**：

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `targets` | 按固定依赖顺序发布 `lotus,bamboo,bodhi` 的逗号分隔子集 | `lotus,bamboo,bodhi` |
| `resume` | 同版本部分发布已完成时，跳过已经发布的目标并继续 | `false` |
| `bamboo_ref` | Bamboo 仓库的发布分支 | `from_manifest` (读取配置) |
| `lotus_ref` | Lotus 仓库的发布分支 | `from_manifest` |
| `bodhi_ref` | Bodhi 仓库的发布分支 | `from_manifest` |
| `release_version` | 统一版本号 | `from_manifest` |
| `bamboo_version` | Bamboo crate 版本 | `from_manifest` |
| `lotus_version` | Lotus npm 版本 | `from_manifest` |
| `bodhi_version` | Bodhi 应用版本 | `from_manifest` |
| `lotus_skip_tests` | 是否跳过 Lotus 测试 | `from_manifest` |

**发布验证**：
- Lotus 发布后，自动轮询 npm registry 验证包可用性（最多 30 次，间隔 10 秒）
- 确认 Lotus 可用后触发 Bamboo；Bamboo 发布后，自动轮询 crates.io 验证包可用性（最多 30 次，间隔 10 秒）
- 确认 Bamboo 可用后触发 Bodhi 发布

### 2. Nightly Release（夜间自动发布）

**触发方式**：
- 定时触发：每天 UTC 04:00（北京时间 12:00）
- 手动触发：`workflow_dispatch`，支持 `force` 参数强制发布

**版本计算规则**：
```
格式：YYYY.M.N
- 同年同月：N 递增（如 2026.4.28 → 2026.4.29）
- 新年或新月：N 重置为 1（如 2026.4.29 → 2026.5.1）
```

**执行流程**：
1. 读取当前 `release-train.config.json` 中的版本
2. 计算新版本号
3. 更新配置文件中所有版本字段
4. 提交并推送版本更新
5. 触发 Release Train（带 `lotus_skip_tests=true`）

---

## 版本管理

### release-train.config.json

```json
{
  "refs": {
    "bamboo": "main",
    "lotus": "main",
    "bodhi": "main"
  },
  "versions": {
    "release": "2026.4.29",
    "bamboo": "2026.4.29",
    "lotus": "2026.4.29",
    "bodhi": "2026.4.29"
  },
  "options": {
    "lotus_skip_tests": false
  }
}
```

**字段说明**：
- `refs`: 各仓库的发布分支引用
- `versions.release`: 根版本号，用于 nightly 计算
- `versions.bamboo/lotus/bodhi`: 各模块的具体版本
- `options.lotus_skip_tests`: nightly 发布时跳过测试以加速

---

## 发布门禁

### 预发布检查（必须全部通过）

**Bamboo**：
```bash
cd bamboo && cargo fmt --check && cargo clippy && cargo test
```

**Lotus**：
```bash
cd lotus && npm run type-check && npm run test:run && npm run lint
```

**Bodhi**：
```bash
cd bodhi && npm run web:verify:migration && npm run web:verify:docs-boundary
```

**Pavilion**（如变更）：
```bash
cd pavilion && npm run lint && npm run build
```

### 发布后验证

```bash
# 验证 npm 包
npm view @bigduu/lotus@<version> version

# 验证 crate
cargo search bamboo-agent --limit 1

# 检查仓库状态
git status -sb
```

---

## 故障处理

### Bodhi Linux 发布失败（ETARGET）

**原因**：Lotus npm 包尚未在 registry 中完全同步

**解决**：
```bash
# 等待 npm 包可用
npm view @bigduu/lotus@<version> version

# 仅重试失败的任务
gh run rerun <bodhi_run_id> -R bigduu/Bodhi-AI --failed
```

### Release Train 因 GitHub API 问题失败

**解决**：按 Lotus → Bamboo → Bodhi 顺序手动恢复链式发布

---

## 配置文件

### 工作流文件

- `.github/workflows/release-train.yml` - 发布列车主工作流
- `.github/workflows/nightly-release.yml` - 夜间自动发布
- `.github/workflows/submodule-guard.yml` - 子模块保护检查

### 配置文件

- `.github/release-train.config.json` - 版本和分支配置
- `.github/labels.tsv` - 标签体系定义
- `.github/pull_request_template.md` - PR 模板

---

## 发布历史

| 日期 | 版本 | 说明 |
|------|------|------|
| 2026-04-29 | 2026.4.29 | bodhi-server Windows CI 修复 |
| 2026-04-29 | 2026.4.29 | bamboo clippy 修复 |
| 2026-04-29 | 2026.4.29 | lotus 测试设置修复 |
| 2026-04-24 | 2026.4.24 | 修复 nightly workflow 触发 release-train |
| 2026-04-02 | 2026.4.2 | 添加 bamboo 路线图和工具对比文档 |
| 2026-03-22 | 2026.3.106 | 实现 nightly release + 子模块更新 |
| 2026-03-07 | 2026.3.60 | 统一三仓库版本管理 |
| 2026-03-07 | 2026.3.60 | 一键发布流程 |
| 2026-03-07 | 2026.3.60 | 集中化 release train refs 和 versions |

---

## 安全更新

| 日期 | 说明 |
|------|------|
| 2026-04-24 | 更新 rustls-webpki 修复安全漏洞 |

---

## 相关链接

- [发布列车配置](https://github.com/bigduu/Zenith/blob/main/.github/release-train.config.json)
- [Release Train 工作流](https://github.com/bigduu/Zenith/blob/main/.github/workflows/release-train.yml)
- [Nightly Release 工作流](https://github.com/bigduu/Zenith/blob/main/.github/workflows/nightly-release.yml)
- [AGENTS.md 发布手册](https://github.com/bigduu/Zenith/blob/main/AGENTS.md)
