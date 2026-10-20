import brandsData from '../data/brands.json';

export interface RecommendationMatch {
  brand: (typeof brandsData)[0];
  reason: string;
  matchedHook: string;
}

export function matchRecommendedBrands(
  title: string,
  primaryIntent: string,
  pillarId: string,
  topicId?: string
): RecommendationMatch[] {
  const t = (title + ' ' + primaryIntent + ' ' + (topicId || '')).toLowerCase();
  const matches: RecommendationMatch[] = [];

  const getBrand = (id: string) => brandsData.find((b) => b.id === id);

  // 1. AI / ChatGPT / Claude / 生产力工具
  if (t.includes('ai') || t.includes('chatgpt') || t.includes('claude') || t.includes('办公') || t.includes('电商') || t.includes('tiktok')) {
    const gsy = getBrand('gsy');
    if (gsy) {
      matches.push({
        brand: gsy,
        reason: '具备香港与日本原生 IP 节点，实验室现场通过 ChatGPT 4o 与 Claude 3.5 Sonnet 严格环境测试，支持 2.5Gbps 带宽。',
        matchedHook: 'AI 研发与生产力场景首选'
      });
    }
    const yxr = getBrand('yinxingren');
    if (yxr) {
      matches.push({
        brand: yxr,
        reason: '拥有 60+ 纯净原生机房 IP，低欺诈分风控抵抗力极强，支持 24 小时工单与退款保障。',
        matchedHook: '流媒体与防风控高纯净度之选'
      });
    }
  }

  // 2. 10元以下 / 便宜 / 低价 / 学生 / 新手入门 / 预算
  else if (t.includes('10元') || t.includes('7元') || t.includes('8元') || t.includes('便宜') || t.includes('低价') || t.includes('初次') || t.includes('新手') || t.includes('学生') || t.includes('预算')) {
    const feimao = getBrand('feimao');
    if (feimao) {
      matches.push({
        brand: feimao,
        reason: '学生版年付低至 7 元/月，专属客户端免配置订阅登录即用，极低门槛。',
        matchedHook: '7 元档极致入门与轻量查资料'
      });
    }
    const gsy = getBrand('gsy');
    if (gsy) {
      matches.push({
        brand: gsy,
        reason: '轻量版年付折合约 8.3 元/月，企业级 IEPL 专线，双线路架构，晚高峰平稳度极佳。',
        matchedHook: '8 元档专线综合平衡推荐'
      });
    }
    const weifeng = getBrand('weifeng');
    if (weifeng) {
      matches.push({
        brand: weifeng,
        reason: '7 元档同级对标，支持季付 9 折，7×24 小时在线与夜间 AI 客服值守。',
        matchedHook: '低成本多节点分流备选'
      });
    }
  }

  // 3. 备用 / 不限时 / 一次性流量 / 永久 / 应急
  else if (t.includes('备用') || t.includes('不限时') || t.includes('一次性') || t.includes('永久') || t.includes('冷备') || t.includes('失效') || t.includes('不过期')) {
    const gsy = getBrand('gsy');
    if (gsy) {
      matches.push({
        brand: gsy,
        reason: '提供致敬斯诺克 147 元永久套餐（247GB 永不过期），全节点×1倍率，单节点 2.5Gbps。',
        matchedHook: '一次性付费永久不过期备用'
      });
    }
    const xdm = getBrand('xingdaomeng');
    if (xdm) {
      matches.push({
        brand: xdm,
        reason: '提供低门槛按量计费与不限时周期方案，长期静默存放不浪费额度。',
        matchedHook: '低门槛防失联应急备用'
      });
    }
  }

  // 4. 专线 / IEPL / IPLC / 晚高峰 / 延迟 / 丢包 / 商务
  else if (t.includes('专线') || t.includes('iepl') || t.includes('iplc') || t.includes('晚高峰') || t.includes('延迟') || t.includes('商务') || t.includes('丢包') || t.includes('拥堵')) {
    const wget = getBrand('wgetcloud');
    if (wget) {
      matches.push({
        brand: wget,
        reason: '全 IEPL 内网专线，59 节点历史实测全非零下载，香港延迟仅 25.9ms，商务高 SLA 保证。',
        matchedHook: '高要求跨国商务与零丢包首选'
      });
    }
    const gsy = getBrand('gsy');
    if (gsy) {
      matches.push({
        brand: gsy,
        reason: '双线路架构（企业专线+全球IPLC），实测香港 22ms、新加坡 46ms，晚高峰冗余 500Mbps。',
        matchedHook: '低延迟专线主流代表'
      });
    }
  }

  // 5. 大流量 / 主力 / 视频 / 4K / 8K / 100G / 200G / 500G / 1TB
  else if (t.includes('主力') || t.includes('大流量') || t.includes('视频') || t.includes('4k') || t.includes('8k') || t.includes('100g') || t.includes('200g') || t.includes('500g') || t.includes('1tb')) {
    const ermao = getBrand('ermao');
    if (ermao) {
      matches.push({
        brand: ermao,
        reason: '20 元/月真月付档位提供 130GB 额度，亚太近端节点延迟平稳，多端设备挂载友好。',
        matchedHook: '20 元档日常主力平衡之选'
      });
    }
    const lingmao = getBrand('lingmao');
    if (lingmao) {
      matches.push({
        brand: lingmao,
        reason: '19 元/月即提供高达 150GB 月配额，单位 GB 成本低至 0.12 元，重度媒体刷取利器。',
        matchedHook: '19 元大容量高性价比主力'
      });
    }
  }

  // 6. 默认推荐：首推第一梯队光速云 + 飞猫云
  else {
    const gsy = getBrand('gsy');
    const feimao = getBrand('feimao');
    if (gsy) {
      matches.push({
        brand: gsy,
        reason: '双线路架构，8 元起步，具备 17 份实测报告中综合延迟与流媒体/AI 解锁最佳表现。',
        matchedHook: '全场景高信誉严选推荐'
      });
    }
    if (feimao) {
      matches.push({
        brand: feimao,
        reason: '7 元起步专属客户端，简单免配置，适合低成本快速上手。',
        matchedHook: '轻量省心高性价比入门'
      });
    }
  }

  return matches.slice(0, 2);
}
