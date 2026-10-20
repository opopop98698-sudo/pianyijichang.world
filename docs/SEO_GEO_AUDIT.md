# pianyijichang.world SEO / GEO / AEO 技术规范与审计指南 (SEO_GEO_AUDIT)

本文档面向技术 SEO、生成式引擎优化（GEO）与答题引擎优化（AEO），确立全站工程实现标准、爬虫策略、结构化数据规范与审计基准。

---

## 一、技术 SEO 基础架构规范

1. **初始 HTML 完整性 (SSR/SSG Hydration)**：
   - 全站所有核心回答、价格表格、品牌参数、来源引用必须完整渲染在初始静态 HTML 中，严禁依赖客户端 JavaScript 动态异步拉取接口渲染，确保各类爬虫与大模型文本抓取工具在无 JS 环境下 100% 抓取。
2. **规范化元标签 (Metadata Standards)**：
   - 每页唯一的 `<title>` 与 `<h1>` 标签。
   - 自然流畅、包含实体与用户行动导向的 `<meta name="description">`（120–160 个英文字符或 60–90 个中文字符）。
   - 自引用规范链接：`<link rel="canonical" href="https://pianyijichang.world/...">`。
   - 语言标记：`<html lang="zh-CN">`。
   - 移动端适配：`<meta name="viewport" content="width=device-width, initial-scale=1.0">`。
3. **Sitemap 与索引控制**：
   - 通过 `@astrojs/sitemap` 自动构建 `https://pianyijichang.world/sitemap-index.xml`。
   - 过滤器自动剔除 `/draft/*`、`/search/` 等无实质独立价值或临时交互页面。
   - 严禁为任意客户端筛选组合（如不同下拉选择）生成大量同质化 URL 索引。

---

## 二、GEO (生成式引擎优化) 与 AEO (答题引擎优化) 策略

1. **首屏直接答案 (Answer-First Pattern)**：
   - 页面顶部首屏统一采用 `AnswerBlock.astro` 组件，在 250–350 字内直接正面解答该页面的核心搜索意图，不绕弯子、不先铺陈几千字无关背景。
   - 满足 ChatGPT Search、Perplexity、Google AI Overviews 的问答抽取特征。
2. **实体明确与因果关系显性化**：
   - 明确将「品牌」、「套餐」、「专线类型」、「付款周期」、「价格单位」等实体以语义化 HTML 标签（如 `<dl>`, `<dt>`, `<dd>`, `<table>`）组织。
   - 严禁空泛修饰词（如“神级好用”、“全网最牛”），全部采用量化指标（如“晚高峰延迟小于 80ms”、“真月付 8 元无合约”）。
3. **爬虫与 AI 检索机器人精准控制 (`robots.txt`)**：
   - `User-agent: *`：允许正常抓取，屏蔽 `/draft/` 与 `/search/`。
   - `User-agent: OAI-SearchBot`：明确开放（确保在 ChatGPT 搜索引荐中展示）。
   - `User-agent: PerplexityBot`：明确开放。
   - `User-agent: GPTBot` 与 `Google-Extended`：根据站长版权策略保持一致声明。
   - 声明：搜索引擎抓取索引与大模型训练许可属于不同维度，本站保持透明度。

---

## 三、结构化数据 (JSON-LD Schema) 规范

所有结构化数据统一由 `src/lib/structured-data.ts` 动态输出，确保与页面可视内容 100% 数据同源：

1. **全站 Organization & WebSite**：
   - 标明独立第三方信息站身份，包含 `SearchAction` 指向 `/search?q={query}`。
2. **业务柱石与专题页 CollectionPage & ItemList**：
   - 将页面收录的品牌或套餐以结构化列表呈现，每个列表项附带具体品牌名称与 URL。
   - **严格红线**：榜单整体绝对不能标成单一 `Product` 或单一 `Offer`；严禁虚构伪造没有真实用户评价记录的 `aggregateRating`。
3. **文章详情页 Article / BlogPosting**：
   - 包含规范的 `headline`, `datePublished`, `dateModified`, `author` (独立编辑团队), `publisher`。
4. **面包屑导航 BreadcrumbList**：
   - 准确反映层级关系（首页 → 栏目 → 专题 → 文章）。
5. **FAQPage 说明**：
   - 页面正文保留 FAQ 内容块，但根据 Google 2023 年底的富结果调整政策，不向非政府/权威机构保证 FAQPage 富媒体展现，仅作为清晰的内容组织呈现。

---

## 四、搜索管理后台接入与指标追踪工作流 (SOP)

由于当前尚未连接生产环境的 Google Search Console / Bing Webmaster Tools，本审计提供标准接入规范：

1. **Google Search Console 验证**：
   - 推荐使用 DNS TXT 记录或在 `public/` 放置由 Google 提供的 HTML 验证文件。
2. **Bing Webmaster Tools & IndexNow 接入**：
   - 生成专用 IndexNow API Key 并存放于根目录（如 `public/{apiKey}.txt`）。
   - 仅在真实发生页面发布、修改或下线时才触发推送，严禁循环批量提交未变更的 URL。
3. **量化指标独立统计规范**：
   在后续运营监控中，必须分别建立以下 7 个指标的数据看板，互不混淆：
   - ① 搜索引擎抓取频次与爬虫日志
   - ② 搜索引擎真实索引收录量（Site 查询与后台对比）
   - ③ 搜索展示量 (Impressions) 与平均排名
   - ④ 真实自然搜索点击量 (Organic Clicks)
   - ⑤ 站内静态计算工具真实使用频次
   - ⑥ 经过合规披露的有效商业推广注册点击量
   - ⑦ 来源于 AI 答题引擎（Perplexity, ChatGPT, Claude）的外部引用与引荐流量
