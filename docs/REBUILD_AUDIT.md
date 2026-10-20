# pianyijichang.world 站点现状与重构审计报告 (Phase 0)

## 1. 审计概述与工作区现状

- **审计时间**：2026-10-20
- **目标站点**：`https://pianyijichang.world`
- **项目定位**：便宜机场（面向预算有限、初次购买或寻找日常备用代理的中文用户）
- **工作区路径**：`c:\Users\Pro User\Desktop\pianyijichang.world`

### 1.1 本地工作区文件审计
- **检查命令**：`Get-ChildItem -Force`
- **检查结果**：本工作区初始化前为一个完全空白的目录（无原有代码文件、无历史 git 仓库、无旧静态生成器配置）。
- **处理动作**：执行 `git init` 建立本地版本管理，遵循「空项目初始化 Astro 静态内容站」的执行原则。

### 1.2 外部资料与素材环境审计
- **上级目录素材发现**：在上级目录 `..\logos` 中发现部分机场品牌 WebP/PNG 图标素材（如 `1fly_logo.webp`, `2mao_logo.webp`, `flyingbird.webp`, `sogo.webp`, `edgenova_logo.webp` 等），可按需适度引入作为站点真实品牌展示资源。
- **邻近项目隔离说明**：上级目录存在 `jichangrumen.world`（基于 VitePress 的入门指南站），根据「本站不与其他域名混用推广参数、测评结果或未经确认的品牌资料」要求，本项目严格独立构建，不复用其他域名的推广跟踪码与非官方评测数据。

### 1.3 线上环境与域名连通性审计
- **线上域名解析测试**：通过 PowerShell `Invoke-WebRequest -Uri "https://pianyijichang.world"` 进行访问探测。
- **测试结果**：返回域名未解析错误（DNS unresolvable / 远程名称无法解析）。
- **无法执行的检查如实说明**：
  1. 无法读取线上既有网站内容与历史 HTTP 状态码。
  2. 无法访问 Google Search Console / Bing Webmaster Tools / Baidu 等搜索后台，本报告不推测线上收录数量、排名、真实流量或历史页面数量。
  3. 无法在线抓取线上已发布的历史 URL 列表。

---

## 2. 品牌与套餐资料来源审计

### 2.1 品牌数据源
- **提供方与输入路径**：项目终极重构指令直接规范注入 42 个机场品牌完整清单（`src/data/brands.json`）。
- **品牌构成**：
  - 核心原有品牌（Rank 1–28）：如光速云（gsy, Rank 1, 推荐位）、飞猫云、微风网络、暮光加速、大佬云、星岛梦、二猫云、无忧链接、唯兔云、Firefly、宇宙云、U1S1、灵猫网络、极连云、光年梯、一翻云、SOGO云、可信云、速界、闪跃、全球云、闪电鼠、云界线、榴莲云、神行加速、环球梯、隐形人、梯子云。
  - 新增补充品牌（Rank 29–42）：WgetCloud、白月光、FlyingBird、CyberGuard、龙猫云、FATCAT、TNTCloud、青云梯、山水云、灵动云、浪网、EdgeNova、萤火虫、sslar。
- **推广链接与优惠码**：严格按原始输入 1:1 保留，禁止擅自修改 `registerUrl` 与 `promoCode`。
- **数据状态标记**：全部 42 个品牌均标记为 `"dataStatus": "vendor"`（品牌方资料），前端组件渲染所有宣称亮点时必须严格附加「品牌资料显示」前缀。

### 2.2 套餐、优惠与测试数据状态
- **`plans.json`**：初始为空数组 `[]`，严格遵守「不编造价格、不编造套餐」原则，只收录核查过的真实公开套餐。
- **`offers.json`**：初始为空数组 `[]`，只记录确认生效且规则明确的优惠活动。
- **`claims.json`** / **`measurements.json`**：初始为空数组 `[]`，实测数据缺位时诚实标注「待核实」，严禁编造测速、丢包率与节点数量。

---

## 3. 技术栈重构选型与合规规范

- **构建框架**：Astro 4.x + TypeScript
- **内容组织**：Astro Content Collections (`src/content/`)
- **样式系统**：Tailwind CSS
- **静态搜索**：Pagefind（离线全静态索引，无外部依赖）
- **站点地图与订阅**：`@astrojs/sitemap`、`@astrojs/rss`
- **目标部署平台**：Apache 静态托管（DocumentRoot 指向 `dist/`，包含专属 `.htaccess` 安全与缓存规则）
- **图标系统**：`astro-icon` + Lucide
- **商业合规**：
  - 全站页脚与关于页独立第三方免责声明。
  - 所有商业推广注册链接添加 `target="_blank" rel="nofollow sponsored noopener"`。
  - 链接邻近区域必须常驻合规提示：「含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格」。
- **法律与安全底线**：严禁提供翻墙/绕过审查具体操作步骤；严禁提供可用节点订阅地址。

---

## 4. 后续阶段执行计划

- **Phase 1**：初始化工程脚手架、注入 42 品牌基础数据、生成 64 专题 / 128 集群 / 384 规范文章规划图谱，生成规范架构文档。
- **Phase 2**：开发 `src/lib/pricing.ts`（7 项计算公式）、统一数据层、8 个核心 Astro 展示组件、基础布局与 5 项自动化 QA 校验脚本。
- **Phase 3 & 4**：重构并上线 9 个核心主入口页面（首页 + 8 个业务柱石页），实施 Answer-First 三层深度阅读架构与真实套餐比对。
- **Phase 5**：建设重点二级专题页与样例集群文章，执行全站内链拓扑闭环。
- **Phase 6**：执行构建、校验脚本、全站 SEO 审查与最终交付报告。
