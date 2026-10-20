# pianyijichang.world 统一数据字典与口径规范 (DATA_DICTIONARY)

本文档明确本站数据存储结构、字段定义、价格核算口径与数据真实性校验标准。

---

## 一、核心实体数据结构规范

### 1. 品牌实体 (`brands.json`)
- `id` (string, 唯一不可变): 品牌稳定标识符（如 `gsy`, `feimao`）。
- `name` (string): 规范展示名称。
- `rank` (number): 排序权重。
- `isPrimary` (boolean, 可选): 是否作为核心首推位。
- `registerUrl` (string): 商业推广/官方入口链接（严禁擅自修改）。
- `promoCode` (string, 可选): 官方优惠码。
- `since` (string): 运营起始年份（未核实标记为「待核实」）。
- `lineType` (string[]): 线路类型（如 `["IEPL", "企业级内网专线"]`，未核实标记为 `["待核实"]`）。
- `protocols` (string[]): 协议类型（如 `["VLESS"]`、`["Shadowsocks"]`，未核实标记为 `["待核实"]`）。
- `priceFrom` (string): 官方起售价（标明计费周期，如 `"8元/月"`、`"季付 ¥66"`）。
- `highlights` (string[]): 品牌宣传亮点（渲染时必须遵守合规要求）。
- `dataStatus` (enum: `"vendor"` | `"verified"` | `"third_party"` | `"outdated"` | `"conflict"`): 数据状态。若为 `"vendor"`，展示亮点前必须加注「品牌资料显示」。

### 2. 套餐实体 (`plans.json`)
- `id` (string): 套餐全局唯一标识符。
- `brandId` (string): 所属品牌 ID。
- `name` (string): 原始套餐名称（保留商家原称）。
- `currency` (string): 结算币种（如 `CNY`, `USD`, `USDT`）。
- `actualPayment` (number): 真实到手支付金额（包含强制附加费）。
- `billingCycle` (enum: `"monthly"` | `"quarterly"` | `"semi_annual"` | `"annual"` | `"biennial"` | `"triennial"` | `"onetime"`): 真实付款周期。
- `isTrueMonthly` (boolean): 是否为真月付（仅 `billingCycle === "monthly"` 为 true）。
- `quotaValue` (number): 标称流量数值。
- `quotaUnit` (enum: `"GB"` | `"GiB"` | `"TB"`): 原生标称单位（严格保留原单位，禁止静默换算）。
- `resetRule` (enum: `"calendar_first"` | `"billing_day"` | `"onetime_no_reset"` | `"daily"`): 流量重置机制。
- `isRollover` (boolean): 未用流量是否可结转至次月。
- `multiplierRange` (string): 节点倍率区间（如 `"0.2x - 3.0x"`）。
- `deviceLimit` (number | string): 设备同时在线限制（数字或「不限制」/「待核实」）。
- `verifiedAt` (string): 数据核实日期（ISO 8601，如 `"2026-10-20"`）。
- `dataSource` (string): 资料来源 ID。

### 3. 优惠实体 (`offers.json`)
- `id` (string): 优惠标识符。
- `brandId` (string): 所属品牌 ID。
- `code` (string): 优惠码。
- `targetAudience` (enum: `"new_user_only"` | `"existing_user"` | `"all"`): 适用人群。
- `discountType` (enum: `"percent"` | `"fixed_amount"`): 折扣类型。
- `discountValue` (number): 折扣值（百分比或固定金额）。
- `applicablePlans` (string[]): 适用套餐列表。
- `isStackable` (boolean): 是否可与其他优惠叠加。
- `expiresAt` (string | null): 失效时间。
- `verifiedAt` (string): 最后一次验证有效性的时间。

### 4. 来源实体 (`sources.json`)
- `id` (string): 来源唯一编号。
- `sourceType` (enum: `"official_website"` | `"vendor_announcement"` | `"third_party_test"` | `"internal_measurement"`): 来源类别。
- `urlOrPath` (string): 来源网络链接或归档截图文件路径。
- `publishedAt` (string): 来源发布时间。
- `accessedAt` (string): 本站抓取核验时间。
- `supportedFields` (string[]): 该来源支持确认的具体数据字段。

### 5. 实测数据实体 (`measurements.json`)
- `id` (string): 测速记录标识。
- `brandId` (string): 被测品牌。
- `measuredAt` (string): 测试时间（含时区）。
- `clientRegion` (string): 测试发起地（如「中国广东」）。
- `clientIsp` (string): 接入运营商（如「中国电信千兆家宽」）。
- `nodeName` (string): 被测节点名称。
- `tool` (string): 测试工具及版本号（如 `speedtest-cli v2.1.3`）。
- `latencyMs` (number): 平均往返延迟。
- `downloadMbps` (number): 真实下载吞吐量（Mbps）。
- `uploadMbps` (number): 真实上传吞吐量（Mbps）。
- `packetLossPercent` (number): 真实丢包率。
- `rawLogPath` (string): 原始测速日志文件存放路径。

---

## 二、价格口径与数学公式标准

1. **实际付款 (Actual Payment)**：用户结账收银台必须划扣的完整本位币金额，包含通道费与税费。
2. **折算月成本 (Monthly Equivalent Cost)**：
   $$\text{Monthly Cost} = \frac{\text{Total Confirmed Payment}}{\text{Months of Service}}$$
   - **严格约束**：年付折算价格严禁展示为月付！展示时必须强制标注：“年付实付 ¥X，折合月均 ¥Y，属于年付折算，不是真月付。”
3. **真月付 (True Monthly)**：仅指用户每自然月或每 30 天无合约单次结算的付款形式。任何分期合约或一次性扣除全年费用的均不属于真月付。
4. **标称每 GB 成本 (Nominal Cost Per GB)**：
   $$\text{Nominal Cost Per GB} = \frac{\text{Cycle Price}}{\text{Cycle Nominal Quota (GB)}}$$
5. **个人实际每 GB 成本 (Actual Cost Per GB)**：
   $$\text{Actual Cost Per GB} = \frac{\text{Observed Payment}}{\text{Observed Usage (GB)}}$$
6. **免费资源判定底线 (Free Tier Standard)**：
   - 只有在满足公开条件后、全过程**不需要用户发生任何资金划扣与信用卡绑定预授权**的资源，才可标注为「免费」。
   - 退款保证（先付费后退款）、充值返利、必须充值余额才能激活的试用，**坚决严禁归入免费资源**。

---

## 三、数据可信度分级标记 (Trust Tier)

全站所有数据字段必须属于以下 6 种明确状态之一，绝不模糊处理：
- **`vendor` (品牌方声称)**：来自商户官网或宣传海报，前端必须强制添加「品牌资料显示」前缀。
- **`verified` (本站实测/核验)**：经本站环境在确定时间戳下复现并留档。
- **`third_party` (第三方独立记录)**：采信自公开第三方测速平台或开源网络观测日志。
- **`pending` (待核实)**：数据源缺失或尚未采集，前端统一渲染为「待核实」，严禁显示为 `0`、`无`、`免费` 或 `支持`。
- **`conflict` (存在来源冲突)**：多方资料严重冲突（如官网标称专线但实测为公网直连），必须触发 `SourceConflictBanner` 警示。
- **`outdated` (过期历史资料)**：已停止销售或已失效的优惠，仅作为历史归档留存，不参与现价计算。
