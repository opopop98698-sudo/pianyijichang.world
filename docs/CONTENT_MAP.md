# pianyijichang.world 全站内容规划与选题图谱 (CONTENT_MAP)

本文件详细映射全站 9 个主入口（1 个首页 + 8 个业务柱石）、64 个二级专题、128 个三级内容集群，以及 384 篇三层递进候选文章的结构与规则。数据基准对应 `src/data/content-map.json`。

---

## 一、主入口概览 (9 Pillars)

1. **首页 (`/`)**：`便宜机场｜低预算代理选购与套餐资料库`
2. **机场推荐 (`/recommend/`)**：`机场推荐：新手、日常主力与备用方案怎么选`
3. **便宜机场 (`/cheap/`)**：`便宜机场推荐：低价套餐、实际付款与使用限制`
4. **免费机场 (`/free/`)**：`免费机场与免费试用：资源条件、可用性与核验记录`
5. **性价比机场 (`/value/`)**：`性价比机场怎么选：流量成本、可用体验与长期支出`
6. **流量套餐 (`/plans/`)**：`机场流量套餐大全：额度、周期、重置与不限时方案`
7. **月付机场 (`/monthly/`)**：`月付机场推荐：真实月扣款、首月体验与续费指南`
8. **价格对比 (`/compare/`)**：`机场价格对比：同预算、同流量与优惠后实际付款`
9. **机场避坑 (`/avoid/`)**：`机场避坑指南：低价宣传、套餐限制与购买前核查`

---

## 二、二级专题与三级集群结构表 (64 专题 / 128 集群)

### 1. 机场推荐 (`recommend`)
- **第一次购买机场 (`first-time-buying`)**
  - 集群 A：新手选购心理与认知校准 (`newbie-mindset`) [3 篇]
  - 集群 B：客户端与通用协议准备 (`protocol-client-readiness`) [3 篇]
- **低价日常主力 (`daily-primary`)**
  - 集群 A：日常稳定性基准线 (`daily-flow-baseline`) [3 篇]
  - 集群 B：晚高峰冗余与丢包容忍度 (`peak-hours-experience`) [3 篇]
- **备用机场 (`backup-service`)**
  - 集群 A：备用线路持有成本控制 (`standby-cost-control`) [3 篇]
  - 集群 B：故障应急冷备切换策略 (`cold-standby-switching`) [3 篇]
- **手机用户选机场 (`mobile-users`)**
  - 集群 A：移动网络流量消耗与保活功耗 (`mobile-battery-traffic`) [3 篇]
  - 集群 B：蜂窝与Wi-Fi切换适应度 (`cellular-wifi-handover`) [3 篇]
- **电脑用户选机场 (`desktop-users`)**
  - 集群 A：桌面端多任务与高并发连接 (`desktop-multitasking`) [3 篇]
  - 集群 B：系统代理模式与TUN虚拟网卡 (`system-proxy-rules`) [3 篇]
- **家庭多设备选购 (`multi-device-family`)**
  - 集群 A：节点同时在线设备数限制 (`device-concurrency-limits`) [3 篇]
  - 集群 B：软路由与旁路由局域网共享 (`router-gateway-deployment`) [3 篇]
- **学习与资料检索 (`academic-search`)**
  - 集群 A：学术文献数据库访问连续性 (`scholar-paper-access`) [3 篇]
  - 集群 B：干净IP与防爬虫验证识别 (`clean-ip-for-research`) [3 篇]
- **轻办公与 AI 需求 (`office-ai-needs`)**
  - 集群 A：ChatGPT等AI接口封锁风控识别 (`ai-service-ip-risk`) [3 篇]
  - 集群 B：远程协作数据隐私与长连接 (`remote-work-security`) [3 篇]

### 2. 便宜机场 (`cheap`)
- **真月付 10 元以下 (`true-monthly-under-10`)**
  - 集群 A：10元以下真实月付扣费模型 (`under-10-payment-model`) [3 篇]
  - 集群 B：极低单价下的带宽与节点边界 (`under-10-service-boundaries`) [3 篇]
- **真月付 10–20 元 (`true-monthly-10-to-20`)**
  - 集群 A：10-20元甜品级预算配比 (`sweet-spot-value`) [3 篇]
  - 集群 B：进阶专线与直连混用辨析 (`sla-and-line-types`) [3 篇]
- **首次实际付款 (`first-time-payment`)**
  - 集群 A：结账收银台附加手续费防坑 (`checkout-hidden-fees`) [3 篇]
  - 集群 B：首次开卡费与账户充值门槛 (`setup-fee-and-deposit`) [3 篇]
- **年付折算低价 (`annual-discount-breakdown`)**
  - 集群 A：年付折合月均计算误区 (`annual-amortization-math`) [3 篇]
  - 集群 B：预付全年沉没成本风险评估 (`sunk-cost-risk-appraisal`) [3 篇]
- **小流量低成本入门 (`low-traffic-entry`)**
  - 集群 A：微额度流量单价折算与适用场景 (`micro-quota-economics`) [3 篇]
  - 集群 B：低配套餐休眠与重置清零规则 (`dormant-account-expiration`) [3 篇]
- **促销与首购低价 (`promo-first-order`)**
  - 集群 A：首单优惠券与次月原价续费 (`first-order-discount-truth`) [3 篇]
  - 集群 B：促销专属临时节点与主力节点差异 (`promotional-line-divergence`) [3 篇]
- **续费价格与预算 (`renewal-budget`)**
  - 集群 A：续费涨价与套餐版本单向迁移 (`renewal-inflation-monitoring`) [3 篇]
  - 集群 B：长期年度总体支出上限管理 (`long-term-spending-ceiling`) [3 篇]
- **一次性低门槛流量 (`onetime-low-threshold`)**
  - 集群 A：不限时流量包单位容量计价 (`non-expiring-pack-cost`) [3 篇]
  - 集群 B：零月租流量包账户生命周期 (`account-maintenance-period`) [3 篇]

### 3. 免费机场 (`free`)
- **持续免费资源 (`persistent-free`)**
  - 集群 A：持续免费商业模式与广告置换 (`free-tier-sustainability`) [3 篇]
  - 集群 B：公共免费节点拥堵与排队机制 (`public-bandwidth-congestion`) [3 篇]
- **免费试用 (`free-trial`)**
  - 集群 A：试用资格手机/邮箱验证门槛 (`trial-qualification-checks`) [3 篇]
  - 集群 B：试用额度倒计时与功能封锁 (`trial-quota-validity-window`) [3 篇]
- **注册赠送流量 (`registration-bonus`)**
  - 集群 A：初始赠送流量真实抵扣与限制 (`signup-gift-consumption`) [3 篇]
  - 集群 B：签到与邀请返利流量提现规则 (`invitation-referral-math`) [3 篇]
- **限时免费活动 (`limited-time-event`)**
  - 集群 A：节日免费放水期间的节点可用率 (`event-surge-performance`) [3 篇]
  - 集群 B：限时活动结束后自动扣费防范 (`expiration-transition-rules`) [3 篇]
- **公开免费节点 (`public-free-nodes`)**
  - 集群 A：爬虫聚合免费节点存活半衰期 (`node-scraping-freshness`) [3 篇]
  - 集群 B：明文传输与中间人流量嗅探风险 (`mitm-traffic-inspection`) [3 篇]
- **免费流量与限制 (`free-quota-limits`)**
  - 集群 A：免费套餐峰值QoS限速与协议屏蔽 (`free-plan-throttling`) [3 篇]
  - 集群 B：免费账号并发线程与IP数限制 (`concurrent-connection-caps`) [3 篇]
- **资源核验与安全 (`verification-and-safety`)**
  - 集群 A：免费节点健康度自动化探测规范 (`node-health-audit-method`) [3 篇]
  - 集群 B：避免在不可信节点使用敏感账号 (`credential-leak-prevention`) [3 篇]
- **免费与低价替代 (`free-vs-cheap`)**
  - 集群 A：折腾免费节点的时间成本量化 (`opportunity-cost-of-free`) [3 篇]
  - 集群 B：几元低价入门套餐相对免费的质变 (`entry-level-paid-migration`) [3 篇]

### 4. 性价比机场 (`value`)
- **单位流量成本 (`unit-traffic-cost`)**
  - 集群 A：每GB标称单价与真实有效单价 (`cost-per-gigabyte-formula`) [3 篇]
  - 集群 B：超售率对名义带宽单价的稀释 (`overselling-ratio-impact`) [3 篇]
- **未用流量与实际价值 (`unused-traffic-value`)**
  - 集群 A：月末剩余作废流量造成的成本膨胀 (`unutilized-quota-waste`) [3 篇]
  - 集群 B：动态按需降档与阶梯式买量 (`just-in-time-tier-matching`) [3 篇]
- **计费倍率后的价值 (`multiplier-adjusted-value`)**
  - 集群 A：高倍率专线对真实流量额度的侵蚀 (`multiplier-conversion-rate`) [3 篇]
  - 集群 B：综合有效GB单价重估模型 (`effective-gigabyte-recalculation`) [3 篇]
- **价格与实际性能 (`price-vs-performance`)**
  - 集群 A：纯测速峰值与网页真实加载延迟 (`benchmark-reality-gap`) [3 篇]
  - 集群 B：丢包率对TCP传输吞吐量的非线性杀伤 (`packet-loss-penalty`) [3 篇]
- **可靠性与长期使用成本 (`reliability-longterm-cost`)**
  - 集群 A：掉线频次导致的工作中断损失 (`downtime-cost-quantification`) [3 篇]
  - 集群 B：工单响应迟缓与运维排障成本 (`customer-support-response-cost`) [3 篇]
- **客户端与使用成本 (`client-software-cost`)**
  - 集群 A：闭源商业客户端订阅费对总支出的增加 (`paid-client-overhead`) [3 篇]
  - 集群 B：开源配置维护的技术门槛折现 (`open-source-config-learning`) [3 篇]
- **多设备综合价值 (`multi-device-total-value`)**
  - 集群 A：单设备摊薄月成本计算模型 (`cost-per-active-terminal`) [3 篇]
  - 集群 B：多人合租与流量共享争抢风险 (`household-token-sharing`) [3 篇]
- **服务范围与综合取舍 (`service-scope-tradeoffs`)**
  - 集群 A：流媒体与AI解锁所带来的溢价权衡 (`media-unlocking-premium`) [3 篇]
  - 集群 B：冷门国家节点对一般用户的低利用率 (`niche-region-utility`) [3 篇]

### 5. 流量套餐 (`plans`)
- **50GB 及以下 (`tier-50gb-below`)**
  - 集群 A：极轻量文本与邮件用量匹配 (`minimal-usage-profile`) [3 篇]
  - 集群 B：50G以下突发后台更新防爆仓 (`buffer-safety-margin`) [3 篇]
- **50–100GB (`tier-50-to-100gb`)**
  - 集群 A：标准图文与社交媒体月耗估算 (`standard-browsing-fit`) [3 篇]
  - 集群 B：标清与高清视频可观看时长换算 (`video-streaming-hours`) [3 篇]
- **100–200GB (`tier-100-to-200gb`)**
  - 集群 A：影音重度与远程协作均衡档位 (`heavy-media-sweet-spot`) [3 篇]
  - 集群 B：双人共享百G套餐用量分流 (`family-dual-user-split`) [3 篇]
- **200–500GB (`tier-200-to-500gb`)**
  - 集群 A：4K视频与大文件频繁同步档位 (`high-bandwidth-workloads`) [3 篇]
  - 集群 B：高带宽套餐在流量高峰期的冗余 (`burst-transfer-resilience`) [3 篇]
- **500GB 以上至不足 1TB (`tier-500gb-to-1tb`)**
  - 集群 A：小型工作室与数据抓取用量区间 (`studio-and-small-team`) [3 篇]
  - 集群 B：超大流量套餐公平使用原则限制 (`fair-use-policy-checks`) [3 篇]
- **1TB 及以上 (`tier-1tb-above`)**
  - 集群 A：企业级团队与网关级聚合分流 (`enterprise-level-traffic`) [3 篇]
  - 集群 B：带宽饱和度与实际可用吞吐瓶颈 (`bandwidth-saturation-limits`) [3 篇]
- **不限时与一次性流量 (`non-expiring-traffic`)**
  - 集群 A：永不过期流量包扣费与重置机制 (`timeless-pool-mechanics`) [3 篇]
  - 集群 B：周期套餐搭配不限时备用包方案 (`hybrid-backup-strategy`) [3 篇]
- **流量重置与加购 (`reset-and-topup`)**
  - 集群 A：账单日重置与自然月1号重置差异 (`cycle-reset-timing-rules`) [3 篇]
  - 集群 B：月中流量加购包溢价与清零规则 (`addon-traffic-pricing-premium`) [3 篇]

### 6. 月付机场 (`monthly`)
- **真实月付识别 (`true-monthly-verification`)**
  - 集群 A：区分单月购买与自动续订绑卡 (`recurring-charge-transparency`) [3 篇]
  - 集群 B：警惕分期年付冒充无合约月付 (`annual-installment-trap`) [3 篇]
- **只使用一个月 (`one-month-usage`)**
  - 集群 A：短期出差与突发任务临时采购 (`short-term-project-needs`) [3 篇]
  - 集群 B：到期前关闭续费以防自动扣款 (`cancellation-deadlines`) [3 篇]
- **首月体验验收 (`first-month-audit`)**
  - 集群 A：首周蜜月期节点稳定性跟踪 (`first-week-honeymoon-test`) [3 篇]
  - 集群 B：晚间高峰段持续丢包与延时日志 (`rush-hour-quality-logging`) [3 篇]
- **续费与停止续费 (`renewal-and-cancellation`)**
  - 集群 A：手动付款与自动扣费策略优劣 (`manual-vs-auto-renewal`) [3 篇]
  - 集群 B：宽限期保留节点与彻底销户清退 (`grace-period-handling`) [3 篇]
- **月中升级与降档 (`mid-cycle-tier-change`)**
  - 集群 A：折算天数补差价与直接覆盖原套餐 (`prorated-billing-rules`) [3 篇]
  - 集群 B：降档生效时间与剩余流量结算 (`downgrade-effective-date`) [3 篇]
- **非连续月份使用 (`non-continuous-months`)**
  - 集群 A：隔月购买账号保留与配置失效 (`intermittent-subscription`) [3 篇]
  - 集群 B：重新订阅后的节点链接刷新 (`re-subscription-node-update`) [3 篇]
- **月付权益变更 (`monthly-rights-changes`)**
  - 集群 A：运营方月中下架特定节点应对 (`unannounced-node-pruning`) [3 篇]
  - 集群 B：协议变更与月付用户自主退出权 (`tos-terms-modification-audit`) [3 篇]
- **到期换服务与迁移 (`expiration-migration`)**
  - 集群 A：切换机场时的客户端配置快速导入 (`seamless-client-handoff`) [3 篇]
  - 集群 B：新旧交接期无缝过渡的双订阅方案 (`dual-subscription-overlap`) [3 篇]

### 7. 价格对比 (`compare`)
- **两个品牌直接对比 (`brand-head-to-head`)**
  - 集群 A：同等价格档位下的线路与协议较量 (`same-price-feature-clash`) [3 篇]
  - 集群 B：专线小流量与直连大流量抉择 (`line-quality-vs-traffic-pool`) [3 篇]
- **同预算横向比较 (`same-budget-comparison`)**
  - 集群 A：固定每月10/20元预算横评矩阵 (`fixed-monthly-budget-matrix`) [3 篇]
  - 集群 B：计入支付手续费后的等效实付比对 (`hidden-cost-normalization`) [3 篇]
- **同流量档对比 (`same-traffic-tier-compare`)**
  - 集群 A：100GB标准档在各家的标价极差 (`fixed-quota-price-spread`) [3 篇]
  - 集群 B：相同流量下的并发连接与峰值速率 (`effective-bandwidth-parity`) [3 篇]
- **月付季付年付成本 (`cycle-duration-comparison`)**
  - 集群 A：周期折扣率与跑路风险的精算平衡 (`discount-vs-runaway-risk`) [3 篇]
  - 集群 B：月付带来的资金流动性价值评估 (`cash-flow-flexibility-value`) [3 篇]
- **流量包与周期订阅 (`pack-vs-subscription`)**
  - 集群 A：流量包与月付套餐损益平衡点曲线 (`breakeven-utilization-curve`) [3 篇]
  - 集群 B：低频用户采用一次性流量包的省钱账 (`low-frequency-user-savings`) [3 篇]
- **优惠后实际付款 (`post-discount-actual-cost`)**
  - 集群 A：优惠码真实扣减金额与使用限制 (`coupon-code-validation`) [3 篇]
  - 集群 B：推荐返利对终端价格无影响的核算 (`affiliate-rebate-neutrality`) [3 篇]
- **不同计费规则对照 (`billing-rules-comparison`)**
  - 集群 A：单向计费与双向计费的实际流量损耗 (`upload-download-accounting`) [3 篇]
  - 集群 B：滑动窗口计费与自然日计费差别 (`sliding-window-vs-calendar`) [3 篇]
- **单套餐与组合方案 (`standalone-vs-bundle`)**
  - 集群 A：主力大流量+冷备低价双套餐性价比 (`dual-provider-redundancy`) [3 篇]
  - 集群 B：多人合租套餐与独立小套餐利弊 (`shared-account-vs-independent`) [3 篇]

### 8. 机场避坑 (`avoid`)
- **虚假低价与促销陷阱 (`fake-cheap-and-promos`)**
  - 集群 A：标价1元实付需年付的文字游戏识别 (`headline-price-deception`) [3 篇]
  - 集群 B：开业低价引流后续断崖式降速排查 (`temporary-bait-nodes`) [3 篇]
- **流量倍率与重置争议 (`multiplier-and-reset-traps`)**
  - 集群 A：节点名称不标倍率后台偷跑扣量 (`shadow-multiplier-inflation`) [3 篇]
  - 集群 B：提前重置与未通知清零案例拆解 (`early-cycle-reset-disputes`) [3 篇]
- **隐藏使用限制 (`hidden-usage-limits`)**
  - 集群 A：偷偷限制单IP并发线程与连接池 (`connection-throttling-policy`) [3 篇]
  - 集群 B：屏蔽BT下载与特定端口协议审查 (`protocol-filtering-censorship`) [3 篇]
- **长期预付风险 (`long-term-prepay-risks`)**
  - 集群 A：三年付/永久套餐背后的跑路概率模型 (`three-year-plan-fatality`) [3 篇]
  - 集群 B：域名被封失联后客户寻路无门 (`domain-hijacking-and-loss`) [3 篇]
- **退款与售后条款 (`refund-and-after-sales`)**
  - 集群 A：霸王条款与不可用时申诉维权通道 (`no-refund-clause-dissection`) [3 篇]
  - 集群 B：购买前即时响应购买后工单装死现象 (`ticket-ghosting-warning`) [3 篇]
- **入口客户端与订阅安全 (`entry-and-sub-security`)**
  - 集群 A：强推专有exe/apk客户端的安全隐患 (`custom-client-trojan-risk`) [3 篇]
  - 集群 B：订阅链接明文泄露被盗刷流量防御 (`subscription-token-exposure`) [3 篇]
- **线路测速与解锁宣传 (`speedtest-and-unlock-hype`)**
  - 集群 A：仅对测速节点放行千兆虚假跑分 (`speedtest-whitelist-cheat`) [3 篇]
  - 集群 B：宣称永久解锁奈飞实则频繁失效 (`transient-streaming-unlock`) [3 篇]
- **异常状态与风险记录 (`abnormal-status-timeline`)**
  - 集群 A：异常高频维护背后的上游欠费征兆 (`maintenance-window-frequency`) [3 篇]
  - 集群 B：电报群全员禁言与舆情恶化预警 (`community-sentiment-tracking`) [3 篇]

---

## 三、384 篇文章标题生成规范总结

全站 384 篇候选文章标题均严格遵循以下三类递进结构：
1. **文章 1（口径/定义类）**：解决“是什么/怎么算”，必须附带量化计算口径、指标定义或行业技术标准维度。
2. **文章 2（条件/边界类）**：解决“什么时候不适用/有什么限制”，必须附带系统环境、使用场景或风控违约的边界判断条件。
3. **文章 3（对比/使用类）**：解决“怎么用/怎么对比”，必须包含双向方案比对、权衡决策或清晰落地操作。
- **杜绝任何模板化机械替换**：严禁仅替换年份（如将 2024 换成 2026）、严禁仅替换品牌名称、严禁近义词简单轮换。
- 全量 384 篇候选元数据已固化在 `src/data/content-map.json`，供全站内链拓扑与分批内容建设按需调用。
