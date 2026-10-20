import fs from 'node:fs';
import path from 'node:path';

const contentMapPath = path.resolve('src/data/content-map.json');
const contentMap = JSON.parse(fs.readFileSync(contentMapPath, 'utf8'));

console.log('--- 启动 128 个集群高精度专属知识图谱生成器 ---');

function generateClusterData(p, t, c) {
  const pId = p.id;
  const tId = t.id;
  const cId = c.id;
  const cName = c.name;
  const tName = t.name;
  const target = `${pId} ${tId} ${cId} ${cName} ${tName}`.toLowerCase();

  let layer = 'L4 传输层与端到端网络拓扑';
  let mechanism = '';
  let hardware = '';
  let formulaTitle = '';
  let formula = '';
  let formulaExplanation = '';
  let tool = 'curl -w / mtr';
  let command = 'curl -w "DNS: %{time_namelookup}s | Connect: %{time_connect}s | TLS: %{time_appconnect}s\\n" -s https://cp.cloudflare.com/generate_204';
  let steps = [
    '通过终端执行基线连通性与握手时延测量',
    '连续执行 100 次持续发包统计标准差与丢包率',
    '核对商户后台实际流量划扣记录',
    '比对备选节点在晚高峰的稳态表现'
  ];
  let passCriteria = '端到端时延低于 50ms，单并发下行高于 25Mbps，零异常丢包。';
  let benchmarks = [
    { dimension: '延迟稳定性', excellent: 'RTT < 35ms (抖动 < 3ms)', pass: 'RTT 40-70ms', redFlag: 'RTT > 120ms 或断流' },
    { dimension: '高峰丢包率', excellent: '0.0% - 0.5%', pass: '1.0% - 3.0%', redFlag: '> 8.0% (严重卡顿)' },
    { dimension: '带宽吞吐', excellent: '> 50 Mbps 稳态', pass: '15 - 30 Mbps', redFlag: '< 5 Mbps' },
    { dimension: '服务透明度', excellent: '单月可退 / 标称倍率×1', pass: '提供明确退款通道', redFlag: '霸王条款 / 强制年付' }
  ];
  let faqs = [
    {
      question: `针对【${cName}】，新手在选购和配置中最容易忽视的关键参数是什么？`,
      answer: `最容易忽视的是名义数据与真实生效环境的脱节。必须以实际网络环境（晚高峰、本地特定运营商、单线程请求）为准，优先选用具备真实月付机制的服务进行小额实测。`
    },
    {
      question: `为什么在【${cName}】涉及的场景中，不同客户端的表现差异巨大？`,
      answer: `底层核心在处理 TUN 虚拟网卡路由、DNS FakeIP 映射以及内存套接字回收机制上存在架构差异，配置不当将导致高 CPU 占用或路由环路。`
    },
    {
      question: `如何通过量化指标判断该方案是否已经失效或需要紧急切换？`,
      answer: `当连续 3 天晚高峰丢包率超过 5% 或关键流媒体/AI 访问频繁触发人机验证时，表明该节点池已进入运营商 QoS 整肃名单或风控黑名单，应立即启动备用节点转移。`
    }
  ];

  // 1. 单向计费 vs 双向计费专属 (upload-download-accounting, ingress-egress)
  if (target.includes('单向') || target.includes('双向') || target.includes('upload-download') || target.includes('ingress-egress')) {
    layer = '网络层 Netflow 流量采集器与双向会计计量口径';
    mechanism = `在【${cName}】的技术范畴内，商户后台流量计量取决于边缘路由节点的 Netflow / IPFIX 采集策略。所谓“单向计费”，通常仅对出口下载数据流（Egress Inbound）进行累加扣减；而“双向计费”则同时统计用户上传（Ingress）与下载（Egress）的总和。由于日常 HTTPS 浏览中 TCP ACK 确认包与上传请求约占总流量的 5%-15%，而在视频通话、文件上传或 P2P 场景下上传比例更高，双向计费会导致有效可用净下载额度直接缩水 10% 至 30% 以上。`;
    hardware = '边界路由器网卡计数器轮询导致轻微 CPU 统计中断；未剔除的重传包被重复计费。';
    formulaTitle = '双向计费下真实可用净下载额度折算模型';
    formula = `\\text{Traffic}_{\\text{effective\\_download}} = \\frac{\\text{商户标称总配额}}{1 + \\rho_{\\text{up/down}}} \\times \\left( 1 - \\text{Loss}_{\\text{retransmit}} \\right)`;
    formulaExplanation = '其中 $\\rho_{\\text{up/down}}$ 为用户日常网络请求的上传与下载流量比率（日常图文浏览约为 0.08，视频上传可达 0.35 以上）。该模型量化了双向计费对有效下载容量的侵蚀。';
    tool = 'vnstat / iftop / nethogs';
    command = 'vnstat -i eth0 -m && iftop -nNP -i eth0';
    passCriteria = '单向计费优先；若为双向计费，上传下载比率损耗应在 10% 以内，商户后台统计误差小于 3%。';
    benchmarks = [
      { dimension: '计费透明度', excellent: '明确单向计费 (只计下行)', pass: '明确双向计费并给足额度', redFlag: '暗中双向扣量且不说明' },
      { dimension: '流量核算误差', excellent: '本地与后台误差 < 1%', pass: '误差在 1% - 5% 之间', redFlag: '误差 > 15% (严重扣量)' },
      { dimension: '重传包扣除', excellent: '丢包重传包免计入配额', pass: '标准 Netflow 统计', redFlag: '恶意重复计费' },
      { dimension: '重置周期规则', excellent: '自然月/账单日定时刷新', pass: '到期前 24 小时提醒', redFlag: '提前或延迟清零' }
    ];
  }

  // 2. TUN 虚拟网卡与系统代理 (tun, proxy, 客户端, 协议, 网关, 路由)
  else if (target.includes('tun') || target.includes('proxy') || target.includes('客户端') || target.includes('协议') || target.includes('网关') || target.includes('路由')) {
    layer = 'L3 网络层 TUN 驱动与密码学传输协议';
    mechanism = `在【${cName}】的技术范畴内，底层代理接管的本质是操作系统虚拟网络接口（VIF）与用户态传输进程之间的高性能数据路由。当启用 TUN 虚拟网卡模式（如 Windows Wintun 驱动或 macOS utun 接口）时，操作系统会将三层 IP 数据包直接旁路至代理核心的驱动队列，绕过传统的应用层 SOCKS5/HTTP 环境变量代理，实现全局系统级接管。在此过程中，必须解决 MTU 1500 报文分片带来的 IP Fragmentation 丢包风险，以及 UWP 应用受制于 Windows AppContainer 架构所施加的回环地址（Loopback 127.0.0.1）隔离屏障。`;
    hardware = '驱动层中断占用增加 5%-15% CPU 时间；套接字环形缓冲区（Ring Buffer）若未匹配突发吞吐将引发内核态丢包。';
    formulaTitle = 'TUN 虚拟网卡报文封装开销与有效载荷比率';
    formula = `\\eta_{\\text{payload}} = \\frac{\\text{MSS}_{\\text{effective}}}{\\text{MTU}_{\\text{physical}}} = \\frac{\\text{MTU} - \\Delta_{\\text{IPHeader}}(20) - \\Delta_{\\text{TCPHeader}}(20) - \\Delta_{\\text{Proto}}(40-80)}{\\text{MTU}_{\\text{physical}}}`;
    formulaExplanation = '该公式量化了由于代理协议多层加密封装头导致的物理带宽有效载荷衰减。当封装头过大导致 MSS 小于 1400 字节时，传输吞吐损耗将超过 5.8%。';
    tool = 'CheckNetIsolation.exe / route print / netsh';
    command = 'CheckNetIsolation.exe LoopbackExempt -s && netsh interface ipv4 show subinterfaces';
    passCriteria = 'MTU 设置为 1400-1420 字节无额外分片，UWP 软件正常穿透回环隔离，无 DNS 污染泄露。';
  }

  // 3. 移动端与电池保活 (battery, cellular, mobile, wifi, 功耗, 手机, 蜂窝)
  else if (target.includes('battery') || target.includes('cellular') || target.includes('mobile') || target.includes('wifi') || target.includes('功耗') || target.includes('手机') || target.includes('蜂窝')) {
    layer = '移动操作系统电源管理 (Doze) 与基带射频唤醒';
    mechanism = `在【${cName}】场景中，移动设备的核心痛点在于后台代理保活与电量消耗的矛盾。iOS 与 Android（Doze 深度休眠）对非前台网络连接施加了极其严苛的休眠对齐策略。当代理客户端使用高频保活心跳包（Keep-Alive 心跳间隔 < 30 秒）时，会频繁唤醒基带射频芯片（Cellular Baseband Radio）从低功耗休眠态（IDLE/PCH）进入高功耗全功率态（DCH），导致空闲待机功耗激增 300%-500%。在 4G/5G 与 Wi-Fi 跨网切换时，系统 IP 发生重协商，代理核心必须支持快速无缝会话重建（Session Resumption）与 TCP 快速打开（TFO），避免连接假死。`;
    hardware = '基带芯片频繁拉升至 200-400mA 高功耗工作区间；系统 wakelock 持有导致整机无法进入 deep sleep。';
    formulaTitle = '移动端代理心跳保活功耗均摊数学模型';
    formula = `P_{\\text{standby}} = V_{\\text{bat}} \\times \\left[ I_{\\text{idle}} + \\frac{T_{\\text{active}} \\times (I_{\\text{active}} - I_{\\text{idle}})}{\\tau_{\\text{heartbeat}}} \\right]`;
    formulaExplanation = '其中 $I_{\\text{active}}$ 为射频唤醒瞬间电流（通常达 250mA），$\\tau_{\\text{heartbeat}}$ 为心跳间隔。心跳间隔过短将导致整机待机时间缩短 40% 以上。';
    tool = 'adb logcat / iOS Sysdiagnose';
    command = 'adb shell dumpsys batterystats --charged | grep -i "wake_lock"';
    passCriteria = '心跳周期保持在 60-120 秒，息屏待机 8 小时耗电增量不超过 3%，跨网重连时间低于 800ms。';
  }

  // 4. 晚高峰、QoS、丢包与专线 (peak, qos, redundancy, loss, baseline, 晚高峰, 测速, 带宽, 延迟, 丢包, 专线)
  else if (target.includes('peak') || target.includes('qos') || target.includes('redundancy') || target.includes('loss') || target.includes('baseline') || target.includes('晚高峰') || target.includes('测速') || target.includes('带宽') || target.includes('延迟') || target.includes('丢包') || target.includes('专线')) {
    layer = 'L4 拥塞控制算法 (BBR vs Cubic) 与骨干网调度';
    mechanism = `在【${cName}】涉及的晚高峰（20:00-23:00）时段，公网国际互联出口面临严重的突发流量挤兑。传统基于丢包判断拥塞的 TCP Cubic 算法在遇到 1% 随机丢包时，拥塞窗口（cwnd）会剧烈腰斩，引发带宽坍塌。而 Google BBR 算法通过连续探测链路的最大交付速率（BtlBw）与最小往返物理时延（RTprop），即使在丢包环境下依然能平稳起搏数据包。对于企业级物理内网专线（IEPL / IPLC），其优势在于物理层独享保障带宽（CIR），彻底规避了公网省网交换核心处的令牌桶整流限速（Token Bucket QoS）与拥塞排队延迟。`;
    hardware = '服务器上游交换机端口队列深度饱和触发主动丢包（WRED）；客户端接收缓冲区抖动导致解码卡顿。';
    formulaTitle = '晚高峰链路可用率与丢包加权综合 SLA 模型';
    formula = `\\text{SLA}_{\\text{Peak}} = \\left( 1 - \\frac{\\sum_{t=1}^{N} \\mathbb{I}(\\text{Loss}(t) > 3\\% \\lor \\text{RTT}(t) > 2.5 \\times \\text{RTT}_{\\text{min}})}{N} \\right) \\times 100\\%`;
    formulaExplanation = '在晚高峰连续采样窗口中，凡是丢包率超过 3% 或延迟超过基准 2.5 倍的时段均判定为无效服务，量化评估真实可用率。';
    tool = 'mtr --report / ping -c 100 -i 0.2';
    command = 'mtr --report --report-cycles=100 -s 1400 <出口网关IP>';
    passCriteria = '晚高峰丢包率控制在 0.5% 以内，延迟抖动标准差（mdev）小于 8ms，4K 视频流连续播放零缓冲。';
  }

  // 5. 价格、成本、月付、年付与预算 (price, cost, prepay, fee, billing, budget, cheap, 价格, 成本, 月付, 年付, 流量, 预算, 额度)
  else if (target.includes('price') || target.includes('cost') || target.includes('prepay') || target.includes('fee') || target.includes('billing') || target.includes('budget') || target.includes('cheap') || target.includes('价格') || target.includes('成本') || target.includes('月付') || target.includes('年付') || target.includes('流量') || target.includes('预算') || target.includes('额度')) {
    layer = '代理商户财务精算模型与上游机房 95 计费超卖比';
    mechanism = `针对【${cName}】，商户层面的低价宣传背后存在严密的财务杠杆机制。国际出口物理专线的采购成本刚性（1Gbps 保底月费高达万元级），低至 5-10 元/月的套餐必然建立在 20:1 至 50:1 的高超卖比（Overselling Ratio）之上。商家通过对大额年付实施折扣引流，本质是将未来 12 个月的运营风险与折旧转移给终端消费者。一旦出现机房封锁或上游成本上调，缺乏持续现金流的商户往往选择跑路或静默降级为低质公网中转。因此，理性的核心在于坚持单月真月付实测，将最大试错成本控制在单月个位数金额内。`;
    hardware = '机房计费网关 NetFlow 采样统计流量；超售引发端口争抢丢包与单线程硬限速。';
    formulaTitle = '真实有效每 GB 流量精算与手续费加权单价';
    formula = `\\text{Cost}_{\\text{effective/GB}} = \\frac{\\text{本次实际总实付金额} \\times (1 + \\text{结算通道费率})}{\\min\\left(\\text{标称月额度}, \\text{用户真实月消耗}\\right) \\div \\overline{\\text{节点实际计费倍率}}}`;
    formulaExplanation = '将通道额外充值手续费与节点真实倍率同时计入，揭示了名义低价背后的真实单价膨胀程度。';
    tool = '微信/支付宝/USDT 实际出账账单核验';
    command = 'curl -s https://<商户域名>/api/user/profile | jq .traffic_rate';
    passCriteria = '单月独立实扣无初装费，节点倍率真实公示且主要线路保持 1.0x，无年付绑定合约。';
  }

  // 6. 流媒体、AI、解锁与原生 IP (ai, streaming, unlock, clean, captcha, fraud, chatgpt, claude, 流媒体, 原生)
  else if (target.includes('ai') || target.includes('streaming') || target.includes('unlock') || target.includes('clean') || target.includes('captcha') || target.includes('fraud') || target.includes('chatgpt') || target.includes('claude') || target.includes('流媒体') || target.includes('原生')) {
    layer = '自治系统 (ASN) 分类、IP 信誉欺诈分与 TLS 指纹对抗';
    mechanism = `在【${cName}】涉及的流媒体与生产力 AI 场景中，服务提供商（OpenAI、Netflix、Disney+、Cloudflare）部署了多层级的自动化风控拦截体系。风控引擎首先通过 MaxMind、IPQS 数据库查询入站 IP 的自治系统号（ASN）属性：若属于托管云机房（Hosting ASN），将被标记为高欺诈分；只有来自当地住宅电信运营商（ISP/Residential ASN）的原生广播 IP 才能无阻断通行。此外，风控系统还会对客户端握手特征执行 JA3 / JA4 TLS 指纹比对与 HTTP/2 帧协商检查，若检测到异常的代理探针特征将直接返回 403 阻断或强制弹出 Turnstile 验证码。`;
    hardware = '边界防火墙快速哈希匹配；DNS-over-HTTPS 远程解析避免 SNI 阻断。';
    formulaTitle = 'IP 信誉欺诈度与人机验证触发概率模型';
    formula = `P_{\\text{block}} = \\frac{1}{1 + e^{-\\left( w_1 \\cdot \\text{FraudScore} + w_2 \\cdot \\mathbb{I}_{\\text{Hosting}} + w_3 \\cdot \\text{SubnetAbuseRate} - \\theta \\right)}}`;
    formulaExplanation = '该逻辑回归模型描述了安全网关依据 IP 欺诈分、机房属性以及同网段滥用率综合决策阻断的概率分布。';
    tool = 'ipinfo.io / ipqualityscore / curl';
    command = 'curl -s https://ipinfo.io/json && curl -s https://chatgpt.com/cdn-cgi/trace';
    passCriteria = 'IP 属性为 ISP 原生住宅广播，欺诈分低于 15，Netflix 非自制剧与 ChatGPT 4o 免验证秒开。';
  }

  // 7. 免费资源与试用 (free, trial, reward, holiday, insecure, 免费, 试用, 赠送, 签到)
  else if (target.includes('free') || target.includes('trial') || target.includes('reward') || target.includes('holiday') || target.includes('insecure') || target.includes('免费') || target.includes('试用') || target.includes('赠送') || target.includes('签到')) {
    layer = '公用不可信中继节点的安全审计与中间人攻击防御';
    mechanism = `围绕【${cName}】的核心本质是免费资源背后的商业置换与安全边界。任何提供“永久免费”的节点都面临服务器带宽与电费的刚性支出，其维持往往依赖于客户端内置弹窗广告、注入重定向追踪代码，甚至将用户设备节点作为公共代理出口（P2P 僵尸网络转发）。此外，公开爬虫抓取的免费节点存在极高的明文流量嗅探风险，未启用全链路端到端加密的明文 HTTP 会话与未加密 DNS 查询可被节点运营者完整捕获并重放。因此，绝不能在不可信的免费节点上进行个人敏感账号登录或支付行为。`;
    hardware = '共享节点单网卡多进程并发挤占套接字；CPU 满载引发丢包与断开。';
    formulaTitle = '折腾免费节点的时间消耗与机会成本量化模型';
    formula = `\\text{Cost}_{\\text{free-total}} = T_{\\text{hunt-nodes}} \\times W_{\\text{hourly}} + \\Delta_{\\text{loss-work}} + P_{\\text{leak}} \\times \\text{AssetRisk}`;
    formulaExplanation = '科学证明了寻找、测试并更换免费节点的时间成本远超购买几元单月正规套餐的支出。';
    tool = 'wireshark / tcpdump / sslscan';
    command = 'tcpdump -i any -n "tcp port 443" -c 50';
    passCriteria = '所有外部流量强制经由自备标准客户端加密封装，无明文明道外泄，敏感流量隔离。';
  }

  // 8. 避坑、跑路与虚假宣传
  else {
    layer = '商户履约能力评估与异常状态时间序列监控';
    mechanism = `在【${cName}】所指涉的机场运营生命周期中，商户跑路前往往呈现明确的系统性技术与运维征兆。典型预警特征包括：由于上游机房账单欠费，节点出现大面积无预警失联，官方将其粉饰为“线路遭受大型 DDoS 攻击正在扩容”；官方 Telegram 交流群开启全员禁言或将发言间隔拉长至数小时；售前客服秒回咨询而售后工单数天装死；以及在失联前夕突然推出违反常理的“三年付 1 折”或“终身永久 99 元”促销活动。理解这一行为学模式，有助于在商家资金链断裂前执行止损并无损迁移。`;
    hardware = '上游机房执行物理拔线或 IP 路由撤销（BGP Withdrawal）；用户端重试风暴引发本地卡死。';
    formulaTitle = '机场运营方资金链断裂跑路风险期望模型';
    formula = `\\mathbb{E}[\\text{Default}] = \\text{PrepaidAmount} \\times \\left( 1 - \\prod_{m=1}^{N} (1 - P_{\\text{churn}}(m)) \\right)`;
    formulaExplanation = '随着预付月份 $N$ 的拉长，商户在周期内出现倒闭跑路的累积概率呈指数级上升。';
    tool = 'whois / bgp.he.net / ssllabs';
    command = 'whois <官网主域名> | grep -E "Expiry Date|Updated Date"';
    passCriteria = '商户运营满 1 年以上，域名有效期充裕，未发布不合理超长周期促销，支持单月无损退出。';
  }

  return {
    clusterId: cId,
    clusterName: cName,
    topicId: tId,
    pillarId: pId,
    engineeringCore: {
      mechanismTitle: `${cName} 的底层网络工程原理剖析`,
      protocolLayer: layer,
      rootCauseAnalysis: mechanism,
      hardwareOrKernelImpact: hardware
    },
    mathModel: {
      title: formulaTitle,
      formula: formula,
      variables: {},
      derivationAndInsight: formulaExplanation
    },
    practicalProtocol: {
      toolName: tool,
      commandSnippet: command,
      stepGuide: steps,
      passCriteria: passCriteria
    },
    benchmarks: benchmarks,
    faqs: faqs
  };
}

const clusterMap = {};

for (const pillar of contentMap) {
  for (const topic of pillar.topics) {
    for (const cluster of topic.clusters) {
      const data = generateClusterData(pillar, topic, cluster);
      clusterMap[cluster.id] = data;
    }
  }
}

const totalCount = Object.keys(clusterMap).length;
console.log(`✅ 成功生成全量 ${totalCount} 个集群的高精度专属深度知识数据！`);

const outputPath = path.resolve('src/data/cluster-knowledge.json');
fs.writeFileSync(outputPath, JSON.stringify(clusterMap, null, 2), 'utf8');
console.log(`✅ 已写入 ${outputPath}`);
