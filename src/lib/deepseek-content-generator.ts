import clusterKnowledgeMap from '../data/cluster-knowledge.json';

export interface ArticleContext {
  title: string;
  slug: string;
  type: 'definition' | 'condition' | 'comparison';
  primaryIntent: string;
  pillarId: string;
  pillarName: string;
  topicId: string;
  topicName: string;
  clusterId: string;
  clusterName: string;
}

export interface DeepContentResult {
  executiveSummary: string;
  deepTechnicalAnalysis: string;
  mathematicalModels: Array<{
    title: string;
    formula: string;
    explanation: string;
  }>;
  practicalProtocol: string;
  quantitativeMatrix: {
    headers: string[];
    rows: string[][];
  };
  conversionVerdict: string;
  faqList: Array<{ question: string; answer: string }>;
}

export function generateDeepContent(ctx: ArticleContext): DeepContentResult {
  // 从 128 集群独占知识图谱中检索当前集群的专属知识
  const kb = (clusterKnowledgeMap as Record<string, any>)[ctx.clusterId] || {
    clusterName: ctx.clusterName,
    engineeringCore: {
      mechanismTitle: `${ctx.clusterName} 的底层网络工程原理剖析`,
      protocolLayer: 'L4 传输层与端到端网络拓扑',
      rootCauseAnalysis: `在【${ctx.clusterName}】的技术范畴内，底层代理连接受制于端到端传输时延、加密握手开销与运营商边界 QoS 限速。必须立足于真实的网络测量标准，杜绝商户口头宣传话术。`,
      hardwareOrKernelImpact: '数据封装增加 CPU 软中断处理耗时；套接字高频回收引发内存轻微碎片化。'
    },
    mathModel: {
      title: '综合有效流量与持仓单价计算模型',
      formula: `\\text{Cost}_{\\text{effective}} = \\frac{\\text{单次实付金额}}{\\text{有效可用流量} \\div \\text{节点实际计费倍率}}`,
      derivationAndInsight: '该模型统一了不同计费周期与倍率下的真实单价度量基准。'
    },
    practicalProtocol: {
      toolName: 'curl / mtr',
      commandSnippet: 'curl -w "DNS: %{time_namelookup}s | Connect: %{time_connect}s | TLS: %{time_appconnect}s\\n" -s https://cp.cloudflare.com/generate_204',
      stepGuide: [
        '使用终端执行标准握手时延测量',
        '连续执行 100 次持续发包统计标准差',
        '核对本地流量统计与后台扣量',
        '比对备选节点在晚高峰的稳态表现'
      ],
      passCriteria: '延迟低于 50ms，单并发下行高于 25Mbps，无异常重连。'
    },
    benchmarks: [
      { dimension: '延迟稳定性', excellent: 'RTT < 35ms (抖动 < 3ms)', pass: 'RTT 40-70ms', redFlag: 'RTT > 120ms 或断流' },
      { dimension: '晚高峰丢包', excellent: '0.0% - 0.5%', pass: '1.0% - 3.0%', redFlag: '> 8.0%' },
      { dimension: '单线程吞吐', excellent: '> 50 Mbps 稳态', pass: '15 - 30 Mbps', redFlag: '< 5 Mbps' },
      { dimension: '服务透明度', excellent: '单月可退 / 标称倍率×1', pass: '提供明确退款通道', redFlag: '霸王条款 / 强制年付' }
    ],
    faqs: [
      {
        question: `针对【${ctx.clusterName}】，新手在选购中最容易忽视什么？`,
        answer: '最容易忽视名义数据与真实生效环境的脱节，必须以本地运营商晚高峰实测为准。'
      },
      {
        question: `为什么在【${ctx.clusterName}】涉及场景下，不同客户端差异巨大？`,
        answer: '底层内核在处理路由分流、DNS 解析与套接字复用时机制不同，配置不当将引发断连。'
      },
      {
        question: `如何通过量化指标判断该方案是否已失效？`,
        answer: '当连续 3 天晚高峰丢包率超过 5% 或频繁触发人机验证时，应立即启动备用节点转移。'
      }
    ]
  };

  // 1. 构建针对该具体提问的执行摘要 (Executive Summary)
  const executiveSummary = `针对【${ctx.title}】，基于计算机网络工程底层机理与 2026 年最新代理市场实测：${
    ctx.type === 'definition'
      ? `在标准度量体系中，必须坚持物理层与传输层到手指标的一致性。任何将不可单买的年付金额分摊折算、或隐瞒高倍率专线折损的宣传口径，均属于严重失真。计算时必须以单次独立结算实付与 1.0x 节点基准额度作为第一口径。`
      : ctx.type === 'condition'
      ? `该方案在以下工程边界条件下坚决不可行：当遭遇晚高峰跨境骨干网 QoS 强力压制、系统级单 IP 并发套接字满载、或商户运营周期不满半年时，该模式面临极高的断流与资金沉没风险，必须执行强制熔断与降级策略。`
      : `落地实操的核心在于：绝不依赖单张静态跑分截图，而要在相同物理环境（同宽带、同时段、同客户端）下开展多维度 A/B 对比。结合个人真实月消耗曲线，在每 GB 真实单价与晚高峰可用率（SLA）之间取得帕累托最优平衡。`
  }`;

  // 2. 根据三级文章类型 (definition / condition / comparison) 生成深度技术剖析正文
  let typeSpecificAnalysis = '';
  if (ctx.type === 'definition') {
    typeSpecificAnalysis = `
### 1.2 核心量化口径标准与隐性指标解构
为了消除商户营销话术所制造的认知迷雾，针对【${ctx.title}】确立以下三条硬性工程度量准则：
- **计费结算独立性口径**：严禁将必须单次支付数百元的年付套餐除以 12 后的“月均价”冒充真月付。真月付的唯一定义是：**用户单次结算周期为 30 天，无任何跨月预存绑定，次月可随时无损停止续费**。
- **协议封装开销折算口径**：标称带宽（Port Speed）仅代表机房网卡物理协商上限，用户实际可用吞吐受制于协议加密封装头（如 TLS 1.3 证书握手与 AEAD 密文校验码）。实际有效载荷比率（Payload Efficiency）通常在 88%-94% 之间，标称 100Mbps 物理端口的理论最大纯数据流不超过 88Mbps。
- **动态倍率折算口径**：节点列表中标有 \`2.0x\`、\`3.0x\` 的专线节点，其实质是将用户的月度可用配额按比例缩水。必须以 **标称流量 ÷ 实际常用节点加权倍率** 重新核算真实可用 GB 额度。
`;
  } else if (ctx.type === 'condition') {
    typeSpecificAnalysis = `
### 1.2 系统级极端边界与工程失效条件
在【${ctx.title}】的实际落地中，若触发以下三项红线边界条件，该方案将面临确定性失效：
- **边界条件一：骨干网国际出口晚高峰排队饱和**。每晚 20:00–23:00 期间，当省际出口互联带宽利用率突破 90% 阈值时，未配置保障带宽（CIR）的普通直连节点将遭遇运营商主动丢包（WRED 随机早期检测机制），丢包率陡增至 10% 以上，导致 TCP 连接频繁三次握手超时。
- **边界条件二：多应用并发耗尽套接字与连接池**。当单台设备或局域网多设备同时开启数十个后台标签页、BT 进程或高频 API 请求时，一旦超过商户设置的单账号并发 IP 数（通常为 2-5 个）或单 IP 活跃连接数限制，边界网关将主动下发 TCP RST 报文阻断新建连接。
- **边界条件三：新商户运营周期与沉没成本风险**。开业未满 6 个月的超低价小机场，缺乏稳定的抗攻击防护储备与机房冗余，坚决禁止使用长期预付模式，一旦触发域名被封或上游欠费，维权追偿成本将无限放大。
`;
  } else {
    typeSpecificAnalysis = `
### 1.2 科学 A/B 实验实测与参数调优方法
针对【${ctx.title}】，推荐使用控制变量法在本地终端开展两套方案的对比实测：
- **环境一致性控制**：测试必须在同一台终端设备上，于相同时间窗口（推荐晚 21:30 晚高峰典型压力段），分别导入两组测试订阅。关闭所有后台云盘同步与下载软件，确保测量基准不受干扰。
- **核心参数调优对比**：在客户端配置中，分别对比 **TUN 虚拟网卡模式** 与 **纯系统代理模式** 的 CPU 占用及延迟差异；对比关闭与开启 **TCP 快速打开（TFO）** 及 **Mihomo 核心并发探测（fallback-filter）** 时的故障恢复耗时。
- **双向账单核算比对**：连续 7 天记录两组节点在相同网页浏览与 1080P 视频播放下的后台扣量情况，排查是否存在未声明的双向计费或偷跑扣量现象，最终以真实实付与体验平稳度作为去留依据。
`;
  }

  const deepTechnicalAnalysis = `
### 1.1 ${kb.engineeringCore.mechanismTitle}
${kb.engineeringCore.rootCauseAnalysis}

- **所属技术层级**：\`${kb.engineeringCore.protocolLayer}\`
- **系统底层影响**：${kb.engineeringCore.hardwareOrKernelImpact}

${typeSpecificAnalysis}
`;

  // 3. 构建专属量化数学模型 (KaTeX LaTeX)
  const mathematicalModels = [
    {
      title: kb.mathModel.title,
      formula: kb.mathModel.formula,
      explanation: kb.mathModel.derivationAndInsight
    },
    {
      title: '晚高峰链路可用率 SLA 稳态评估公式',
      formula: `\\text{SLA}_{\\text{Peak}} = \\left( 1 - \\frac{\\sum_{t=1}^{N} \\mathbb{I}(\\text{RTT}(t) > 300\\text{ms} \\lor \\text{Loss}(t) > 5\\%)}{N} \\right) \\times 100\\%`,
      explanation: '在晚高峰连续采样窗口中，凡是单次 RTT 超过 300ms 或丢包率超过 5% 的采样时段均计为不可用窗口，科学量化关键生产力 SLA。'
    }
  ];

  // 4. 构建专属实操验收流程
  const practicalProtocol = `
### 4.1 针对【${ctx.clusterName}】的专用四步验收测量规程
建议在终端中调用以下经过工程验证的测试命令与排查流程：

1. **第一步：调用专用探测工具执行基线测量**
   使用专用命令测量端到端往返时延与链路质量：
   \`\`\`bash
   ${kb.practicalProtocol.commandSnippet}
   \`\`\`
   该命令可直接提取 DNS 解析耗时、TCP 握手时延以及应用层握手总时间。

2. **第二步：执行多时段压力与标准差统计**
   ${kb.practicalProtocol.stepGuide[0] || '通过终端执行连通性与握手时延测量'}，并${kb.practicalProtocol.stepGuide[1] || '统计持续发包的标准差与丢包率'}。

3. **第三步：核验后台扣量与真实倍率消耗**
   ${kb.practicalProtocol.stepGuide[2] || '核对商户后台实际流量划扣记录'}，排查高倍率专线对月度总额度的稀释情况。

4. **第四步：验收达标判定**
   **合格验收基准**：${kb.practicalProtocol.passCriteria}
`;

  // 5. 量化基准对照表
  const quantitativeMatrix = {
    headers: ['评估指标维度', '优质表现标准 (Top 10%)', '及格基准线 (Baseline)', '严重预警红线 (Red-Flag)'],
    rows: kb.benchmarks.map((b: any) => [b.dimension, b.excellent, b.pass, b.redFlag])
  };

  // 6. 转化裁决结论
  const conversionVerdict = `
关于【${ctx.title}】，最科学且稳妥的选购策略是：**坚守单月试水原则，以真实晚高峰数据作为第一裁判标准，拒绝被标称低价绑架长周期预算**。如果您需要选购已经过本实验室多节点抓包实测、支持单月独立结算且具备透明优惠码的服务，请直接参考下方意图算法推荐方案。
`;

  // 7. 技术 FAQ 列表
  const faqList = kb.faqs || [
    {
      question: `针对【${ctx.title}】，普通用户最容易踩入的营销陷阱是什么？`,
      answer: '最常见的陷阱是以不可退的年付折算价冒充真月付，以及高倍率节点暗扣实际流量。'
    },
    {
      question: `为什么在本地测速显示几百兆，实际看视频依然转圈？`,
      answer: '测速采用多线程并发拉取，掩盖了单流丢包。日常浏览依赖单连接长连接稳定性，晚高峰高抖动是卡顿的根本原因。'
    },
    {
      question: `出现频繁断连或被限速时，第一时间应该如何排障？`,
      answer: '首先切换至不同物理出口城市（如从香港切至日本或新加坡），并核查客户端 DNS FakeIP 缓存与 TUN 驱动状态。'
    }
  ];

  return {
    executiveSummary,
    deepTechnicalAnalysis,
    mathematicalModels,
    practicalProtocol,
    quantitativeMatrix,
    conversionVerdict,
    faqList
  };
}
