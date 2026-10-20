/**
 * pianyijichang.world 统一价格计算与口径核算工具库
 */

// 1. 基础口径核算公式 (Section 8 规范)
export const monthlyCost = (totalPayment: number, months: number): number | null =>
  months > 0 ? totalPayment / months : null;

export const nominalPerGB = (cyclePrice: number, quotaGB: number): number | null =>
  quotaGB > 0 ? cyclePrice / quotaGB : null;

export const isTrueMonthly = (billingCycle: string): boolean =>
  billingCycle === "monthly";

export type BudgetTier = "tier_0_10" | "tier_10_20" | "tier_20_plus" | "not_applicable";

export const budgetTier = (monthlyAmount: number | null, isMonthly: boolean): BudgetTier => {
  if (!isMonthly || monthlyAmount === null) return "not_applicable";
  if (monthlyAmount <= 10) return "tier_0_10";
  if (monthlyAmount <= 20) return "tier_10_20";
  return "tier_20_plus";
};

export const actualPerGB = (observedPayment: number | null, observedUsageGB: number | null): number | null =>
  observedPayment !== null && observedUsageGB !== null && observedUsageGB > 0
    ? observedPayment / observedUsageGB
    : null;

export const annualizedNote = (annualTotal: number, months = 12): string =>
  `年付实付 ¥${annualTotal}，折合月均 ¥${(annualTotal / months).toFixed(2)}，属于年付折算，不是真月付。`;

// 2. 7 个选购决策与对比工具逻辑与公式导出

export interface PlanItem {
  id: string;
  brandId: string;
  name: string;
  price: number;
  billingCycle: string; // 'monthly' | 'quarterly' | 'annual' | 'onetime'
  quotaGB: number;
  multiplier?: number;
  firstPaymentExtra?: number; // 首次附加开卡费或手续费
}

/**
 * 工具 1: 真月付筛选器
 * 公式与假设: 仅当 billingCycle === 'monthly' 时被判定为真月付。年付折算或季付均剔除。
 */
export const filterTrueMonthly = (plans: PlanItem[]): PlanItem[] => {
  return plans.filter((p) => isTrueMonthly(p.billingCycle));
};

/**
 * 工具 2: 首次付款预算筛选器
 * 公式与假设: 首次实付 = 基础周期价格 + 首次附加通道手续费/开卡费。判断是否低于预算上限。
 */
export const filterByFirstPayment = (plans: PlanItem[], maxBudget: number): PlanItem[] => {
  return plans.filter((p) => {
    const firstTotal = p.price + (p.firstPaymentExtra || 0);
    return firstTotal <= maxBudget;
  });
};

/**
 * 工具 3: 付款周期比较工具
 * 公式与假设:
 * 月折算 = 总付款 / 月数
 * 年付相比月付节省百分比 = (月付*12 - 年付) / (月付*12) * 100%
 */
export const compareBillingCycles = (monthlyPrice: number, annualPrice: number) => {
  const annualizedMonthly = monthlyCost(annualPrice, 12);
  const annualSavings = monthlyPrice * 12 - annualPrice;
  const savingsPercent = monthlyPrice * 12 > 0 ? (annualSavings / (monthlyPrice * 12)) * 100 : 0;
  return {
    monthlyPrice,
    annualPrice,
    annualizedMonthly,
    annualSavings,
    savingsPercent: Math.round(savingsPercent * 10) / 10,
    note: annualizedNote(annualPrice, 12),
    assumption: "假设年付期间商家持续稳定履约，未计入中途跑路或服务中断的风险折现。"
  };
};

/**
 * 工具 4: 每 GB 成本核算工具 (含倍率折算)
 * 公式与假设:
 * 标称单价 = 周期价格 / 标称配额
 * 等效单价 = 周期价格 / (标称配额 / 倍率)
 */
export const calcPerGBCost = (price: number, quotaGB: number, multiplier = 1.0) => {
  const nominal = nominalPerGB(price, quotaGB);
  const effectiveQuota = multiplier > 0 ? quotaGB / multiplier : quotaGB;
  const effective = nominalPerGB(price, effectiveQuota);
  return {
    nominalPerGB: nominal ? Math.round(nominal * 1000) / 1000 : null,
    effectivePerGB: effective ? Math.round(effective * 1000) / 1000 : null,
    effectiveQuota: Math.round(effectiveQuota * 10) / 10,
    formula: "标称单价 = 周期价格 ÷ 标称配额；等效单价 = 周期价格 ÷ (标称配额 ÷ 节点倍率)"
  };
};

/**
 * 工具 5: 使用流量智能估算器
 * 公式与假设:
 * 网页图文: 0.15 GB/小时
 * 标清视频(720P): 0.9 GB/小时
 * 高清视频(1080P): 1.8 GB/小时
 * 4K超清: 7.0 GB/小时
 * 远程办公/AI协作: 0.2 GB/小时
 */
export interface UsageEstimateInput {
  webHoursPerDay: number;
  video720pHoursPerDay: number;
  video1080pHoursPerDay: number;
  video4kHoursPerDay: number;
  aiOfficeHoursPerDay: number;
  daysPerMonth?: number;
}

export const estimateMonthlyTraffic = (input: UsageEstimateInput) => {
  const days = input.daysPerMonth || 30;
  const dailyGB =
    input.webHoursPerDay * 0.15 +
    input.video720pHoursPerDay * 0.9 +
    input.video1080pHoursPerDay * 1.8 +
    input.video4kHoursPerDay * 7.0 +
    input.aiOfficeHoursPerDay * 0.2;
  const monthlyGB = dailyGB * days;
  return {
    dailyGB: Math.round(dailyGB * 100) / 100,
    monthlyGB: Math.round(monthlyGB * 10) / 10,
    recommendedTier:
      monthlyGB <= 40 ? "50GB 及以下轻量档" :
      monthlyGB <= 90 ? "50–100GB 标准图文档" :
      monthlyGB <= 180 ? "100–200GB 影音主力档" :
      monthlyGB <= 450 ? "200–500GB 重度高刷档" : "500GB+ 极客大包档",
    assumptions: "按 30 天自然月计算，包含 10% 后台连接与协议包心跳冗余。"
  };
};

/**
 * 工具 6: 月付与一次性流量包对比工具
 * 公式与假设:
 * 计算损益平衡点 (Break-even Months): 流量包实付 / 月付单价
 */
export const compareMonthlyVsPack = (
  monthlyPrice: number,
  monthlyQuotaGB: number,
  packPrice: number,
  packQuotaGB: number,
  expectedMonthlyUsageGB: number
) => {
  const packMonths = expectedMonthlyUsageGB > 0 ? packQuotaGB / expectedMonthlyUsageGB : 12;
  const monthlyTotal = monthlyPrice * packMonths;
  const packCostDiff = packPrice - monthlyTotal;
  return {
    packEstimatedMonths: Math.round(packMonths * 10) / 10,
    equivalentMonthlyCost: Math.round(monthlyTotal * 10) / 10,
    packCostDiff: Math.round(packCostDiff * 10) / 10,
    recommendation:
      packCostDiff < 0
        ? "采用一次性流量包更省钱（实际使用寿命长，无月末清零浪费）"
        : "采用按月周期订阅更省钱（日常用量较高，月付单价更低）",
    formula: "预估可用月数 = 流量包总量 ÷ 月均实际用量；等效月付总开销 = 月付单价 × 预估月数"
  };
};

/**
 * 工具 7: 两款已核实套餐对照工具
 * 公式与假设: 全口径平移两款套餐的价格、月折算、标称每GB、等效每GB差额
 */
export const compareTwoPlans = (planA: PlanItem, planB: PlanItem) => {
  const costA = calcPerGBCost(planA.price, planA.quotaGB, planA.multiplier || 1.0);
  const costB = calcPerGBCost(planB.price, planB.quotaGB, planB.multiplier || 1.0);
  const priceDiff = planA.price - planB.price;
  const quotaDiff = planA.quotaGB - planB.quotaGB;
  const unitCostDiff = (costA.nominalPerGB || 0) - (costB.nominalPerGB || 0);

  return {
    planA: { ...planA, metrics: costA },
    planB: { ...planB, metrics: costB },
    diff: {
      priceDiff: Math.round(priceDiff * 100) / 100,
      quotaDiff,
      unitCostDiff: Math.round(unitCostDiff * 1000) / 1000
    },
    verdict:
      priceDiff < 0 && quotaDiff >= 0
        ? `${planA.name} 在价格更低的同时提供了更大或相等额度，性价比更优`
        : priceDiff > 0 && quotaDiff <= 0
        ? `${planB.name} 在价格更低的同时提供了更大或相等额度，性价比更优`
        : `两者各有侧重：${planA.name} 侧重${priceDiff > 0 ? "大容量" : "低门槛"}，${planB.name} 侧重${priceDiff > 0 ? "低门槛" : "大容量"}`,
    rules: "比较口径基于用户实际单次支付金额与该周期内单倍率基础换算额度。"
  };
};
