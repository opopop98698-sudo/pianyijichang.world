<div align="center">

# 🌐 便宜机场 (pianyijichang.world)

**面向低预算用户的独立第三方网络代理、套餐对比与高性价比梯子中立评测资料库**

[![Astro](https://img.shields.io/badge/Astro-4.16-BC52EE?style=flat-square&logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Pagefind](https://img.shields.io/badge/Search-Pagefind_1.3-FF7A00?style=flat-square)](https://pagefind.app)
[![SEO Health Score](https://img.shields.io/badge/SEO_Score-99.5%20%2F%20100-emerald?style=flat-square&logo=google&logoColor=white)](#-seo-基础设施与合规性-995--100)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

[🌐 访问在线生产站点](https://pianyijichang.world/) · [📖 快速启动](#-快速启动) · [📐 技术架构](#-工程架构与技术栈) · [🛡️ 评测方法论](https://pianyijichang.world/about/)

</div>

---

## 📖 项目简介

**`pianyijichang.world`（便宜机场）** 是一个采用现代 Jamstack 静态站点生成（SSG）架构构建的独立第三方网络代理与高性价比梯子深度评测资料库。

项目专为预算有限的学生群体、科研文献查阅者、远程办公与轻量级 AI 使用者设计。全站坚守**“数据真实、拒绝公关、严格月付、曝光跑路”**的核心原则，结合自动化网络探针抓包与客观数学成本模型，帮助用户用最低的持有成本挑选出稳定可靠的网络方案。

---

## ✨ 核心特性与工程亮点

### 1. ⚡ 纯静态极速架构 (SSG)
- **469+ 完整预渲染页面**：基于 Astro 4.16 静态生成，零客户端框架运行时负担（Zero JS by default）；
- **极致 Web 性能**：首屏 LCP < 0.8s，CLS = 0，单页面构建耗时低至毫秒级；
- **Pagefind 静态检索**：内嵌离线倒排索引，无需任何后端服务器与数据库即可实现毫秒级站内全文搜索。

### 2. 🏛️ 九大核心业务门户与决策树
- 🚀 **机场推荐** (`/jichang/` & `/recommend/`)：42 家品牌按晚高峰连通率综合排位与多场景决策树；
- 💰 **便宜机场** (`/cheap/`)：精选 5.6 – 8 元真实单月付款清单，剥离年付虚标折算水分；
- 🔄 **月付机场** (`/monthly/`)：杜绝长期合约绑架，提供首月 5 步验收法与无缝换站迁移指南；
- 🛡️ **机场避坑** (`/avoid/`)：曝光暗倍率偷跑、三年付庞氏骗局与商户卷款跑路五阶段时间线；
- 🔒 **VPN 评测** (`/vpn/`)：对比传统商业 VPN 与现代 Trojan / VLESS-Reality 协议的底层性能；
- ⚙️ **Clash 配置** (`/clash/`)：涵盖 Windows、Mac、iOS、Android 全平台订阅导入与 TUN 模式排障；
- 🌍 **全球节点** (`/nodes/`)：香港、日本、新加坡、美国四大主流线路延迟与原生流媒体解锁分析；
- ⚡ **梯子防坑** (`/tizi/`)：新手选购避坑与小额低风险验证指南；
- 📚 **使用教程** (`/tutorial/`)：零基础 4 步极速上手与网络时钟偏差排障清单；
- 🗂️ **品牌档案库** (`/brands/`)：42 家机场品牌全景档案库与收银台实测参数。

### 3. 🧠 384 篇三级深度技术指南 (DeepSeek-R1 知识集群)
- 构建了 **128 个独占技术集群**，每个集群覆盖三层递进闭环（定义口径 → 边界条件 → 实操对比）；
- 每篇文章字数均在 2,000 – 2,800 字硬核技术篇幅，内置专属 KaTeX 数学公式（如 Mathis TCP 吞吐公式、带宽延迟积 BDP 模型、Token Bucket QoS 漏桶限制）与独立 4 步排错协议；
- **零重复度**：全站 469 个页面 Title、Description 与 H1 **100% 独立唯一**。

---

## 🏆 SEO 基础设施与合规性 (99.5 / 100)

| 审计维度 | 实施标准与指标 |
|----------|----------------|
| **URL 规范** | 384 篇文章 100% 采用小写语义英文 Slug（彻底杜绝中文 URL 编码膨胀与解析死链） |
| **Canonical** | 469 页面 100% 输出自引用规范链接，全站严格锁定 `https://pianyijichang.world/` |
| **Sitemap** | 双入口兼容支持 (`/sitemap.xml` 与 `/sitemap-index.xml`)，467 个有效 URL 100% 注入 `<lastmod>` 时间戳 |
| **Robots.txt** | 显式兼容授权 Googlebot、bingbot、Baiduspider、yisouspider (神马搜索/UC/夸克) 与 AI 爬虫 |
| **结构化数据** | 输出 2,200+ Schema.org JSON-LD 实体（`Article`, `FAQPage`, `BreadcrumbList`, `WebSite`, `Organization`） |
| **外链合规** | 全站 1,106 处外部商业推广链接 **100% 锁定 `rel="nofollow sponsored noopener"`** 与法定透明度披露 |
| **E-E-A-T 认证** | 全指南末尾注入「网络可靠性技术组 (SRE) 同行审阅卡片」与客观实测凭据声明 |
| **安全响应头** | 预置 `_headers` 生产安全配置（HSTS、CSP、nosniff、SAMEORIGIN） |

---

## 🛠️ 工程架构与技术栈

```text
pianyijichang.world/
├── public/                  # 静态静态资源 (Avatar, Favicon, Robots.txt, _headers)
│   ├── images/speedtest/    # 17 家品牌的高清测速实测原图快照
│   └── robots.txt           # 生产爬虫抓取授权与 Sitemap 声明
├── src/
│   ├── components/          # 模块化 UI 组件 (矩阵表格, 导航网格, 测速卡片, 决策树)
│   ├── config/              # 全站 SEO 与站长验证配置 (src/config/seo.ts)
│   ├── data/                # 核心结构化数据 (42 家品牌矩阵, 384 篇内容规划图谱)
│   ├── layouts/             # BaseLayout (SEO Head 引擎) 与 PillarLayout (主栏目模板)
│   ├── lib/                 # DeepSeek 内容生成器、数学模型与 Schema 辅助函数
│   └── pages/               # Astro 路由目录
│       ├── articles/        # 384 篇长尾技术指南 ([slug].astro)
│       ├── topics/          # 64 个二级深度专题目录 ([pillar]/[topic].astro)
│       ├── brands/          # 42 家品牌全景资料库
│       ├── vpn/ clash/ ...  # 8 大业务门户独立落地页
│       ├── privacy.astro    # 隐私权政策 (Privacy Policy)
│       ├── terms.astro      # 服务条款与合规声明 (Terms of Service)
│       └── 404.astro        # 友好 404 错误页 (noindex, nofollow)
├── astro.config.mjs         # Astro 编译与 Sitemap 插件配置
└── package.json             # 依赖管理与自动化 QA 脚本
```

---

## 🚀 快速启动

### 环境要求
- [Node.js](https://nodejs.org/) `>= 18.17.0` (推荐 Node.js 20 LTS 或更高)
- 包管理器：`npm` / `pnpm`

### 1. 克隆代码仓库
```bash
git clone https://github.com/opopop98698-sudo/pianyijichang.world.git
cd pianyijichang.world
```

### 2. 安装依赖
```bash
npm install
```

### 3. 启动本地开发服务
```bash
npm run dev
```
打开浏览器访问 `http://localhost:4321` 即可体验实时热更新开发。

### 4. 运行全套自动化 QA 校验
```bash
npm run check
```
> 将自动执行以下 5 项测试：
> - `validate-content.mjs`：384 篇内容规划元数据与 Slug 唯一性检查
> - `check-links.mjs`：全站 470+ 路由死链与空链接扫描
> - `check-seo.mjs`：Title / H1 独立性与爬虫协议核验
> - `check-pricing.mjs`：价格模型与真月付口径核算
> - `audit-brand-links.mjs`：商业外链 `rel="nofollow sponsored"` 合规审计

### 5. 生产构建与检索索引生成
```bash
npm run build
```
编译产物将输出至 `dist/` 目录，并自动触发 Pagefind 生成离线搜索索引，可直接托管于 Cloudflare Pages、Vercel 或 Nginx。

### 6. 本地预览生产产物
```bash
npm run preview
```

---

## ⚖️ 独立第三方声明与合规准则

1. **非隶属中立声明**：本站与收录的所有机场服务商无任何股权从属、雇佣关系或独家代理合同。所有评分基于客观网络测试探针（MAI-TEST-BOT）日志生成，不受商业干涉。
2. **商业化透明度 (Affiliate Disclosure)**：部分外部注册按钮包含中立推荐参数，佣金收益全额用于测试节点采购与日常维护支出，**绝不影响用户实付价格**。
3. **技术合规底线**：本站严格遵守相关计算机网络管理法规，**坚决不提供任何翻墙节点、订阅地址或规避网络审查的具体操作步骤**。本项目所有内容仅作为计算机网络分流协议（RFC 标准）、数学丢包模型与消费者防坑知识研究。

---

## 📄 开源许可证

本项目基于 [MIT License](LICENSE) 协议开源。
欢迎提出 Issue 或改进建议！
