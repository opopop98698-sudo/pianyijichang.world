# pianyijichang.world 路由与 URL 架构映射规范

本文档定义 `pianyijichang.world` 的完整 URL 架构、规范化规则、页面类型及状态码管理。

---

## 一、核心柱石页面路由映射 (Pillars)

| 路由路径 | 页面类型 | 规范 H1 | 核心意图 | Canonical 规范 |
|---|---|---|---|---|
| `/` | 首页 (Home) | 便宜机场｜低预算代理选购与套餐资料库 | 低预算机场综合入口与选购导航 | `https://pianyijichang.world/` |
| `/recommend/` | 业务栏目 (Pillar) | 机场推荐：新手、日常主力与备用方案怎么选 | 综合候选机场、筛选依据与多场景方案 | `https://pianyijichang.world/recommend/` |
| `/cheap/` | 业务栏目 (Pillar) | 便宜机场推荐：低价套餐、实际付款与使用限制 | 真实月付价格表、低价入门与限制分析 | `https://pianyijichang.world/cheap/` |
| `/free/` | 业务栏目 (Pillar) | 免费机场与免费试用：资源条件、可用性与核验记录 | 零付款资源、试用条件与失效警示 | `https://pianyijichang.world/free/` |
| `/value/` | 业务栏目 (Pillar) | 性价比机场怎么选：流量成本、可用体验与长期支出 | 单位成本、实际利用率与长期综合价值 | `https://pianyijichang.world/value/` |
| `/plans/` | 业务栏目 (Pillar) | 机场流量套餐大全：额度、周期、重置与不限时方案 | 额度分级、重置规则与套餐全景 | `https://pianyijichang.world/plans/` |
| `/monthly/` | 业务栏目 (Pillar) | 月付机场推荐：真实月扣款、首月体验与续费指南 | 真月付清单、月扣款体验与续费避坑 | `https://pianyijichang.world/monthly/` |
| `/compare/` | 业务栏目 (Pillar) | 机场价格对比：同预算、同流量与优惠后实际付款 | 统一口径横向比对与真实差价计算 | `https://pianyijichang.world/compare/` |
| `/avoid/` | 业务栏目 (Pillar) | 机场避坑指南：低价宣传、套餐限制与购买前核查 | 虚假宣传套路、扣量争议与风险防御 | `https://pianyijichang.world/avoid/` |

---

## 二、二级专题与三级文章路由映射 (Topics & Articles)

- **二级专题路由格式**：`/topics/{pillar-id}/{topic-id}/`
  - 示例：`/topics/cheap/true-monthly-under-10/` (真月付 10 元以下专题)
  - 示例：`/topics/recommend/first-time-buying/` (第一次购买机场专题)
  - 示例：`/topics/avoid/traffic-multiplier-trap/` (流量倍率避坑专题)
- **三级集群文章路由格式**：`/articles/{slug}/`
  - 示例：`/articles/true-monthly-definition-and-check/`
  - 文章统一采用扁平化语义 slug，利于 URL 稳定性和长期引用。

---

## 三、辅助页面与系统端点

| 路由路径 | 页面职能 | 索引指令 (Robots) | Sitemap 纳入 |
|---|---|---|---|
| `/about/` | 独立第三方声明、合规与数据评测说明 | `index, follow` | 是 |
| `/search/` | Pagefind 静态全文检索前端入口 | `noindex, follow` | 否 |
| `/404.html` | 静态 404 引导页 | `noindex, nofollow` | 否 |
| `/robots.txt` | 爬虫与 AI 检索机器人规则文件 | 静态文件 | 否 |
| `/sitemap-index.xml` | 自动生成的站点地图索引 | 搜索引擎专用 | 自动在 robots 中声明 |

---

## 四、重定向与规范化规则 (Apache `.htaccess`)

1. **强制 HTTPS**：所有 HTTP 请求通过 301 永久重定向至 HTTPS。
2. **强制规范域名 (Non-WWW)**：所有 `www.pianyijichang.world` 请求 301 重定向至 `pianyijichang.world`。
3. **强制斜杠统一 (Directory Format)**：所有非静态文件请求保持以斜杠 `/` 结尾，确保 URL 标准化，避免相同内容在带斜杠与不带斜杠下重复索引。
4. **404 错误统一接管**：未匹配文件走统一的 `/404.html`。
