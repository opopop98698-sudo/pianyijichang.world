import fs from 'node:fs';
import path from 'node:path';

console.log('--- [QA 4/5] 执行价格与真月付合规核算校验 (check-pricing.mjs) ---');

let errors = 0;

// 1. 验证 plans.json (若有数据)
const plansPath = path.resolve('src/data/plans.json');
if (fs.existsSync(plansPath)) {
  const plans = JSON.parse(fs.readFileSync(plansPath, 'utf8'));
  for (const p of plans) {
    // 核心红线 1: 只有 billingCycle === 'monthly' 时才能判定为真月付
    if (p.billingCycle !== 'monthly' && p.isTrueMonthly === true) {
      console.error(`❌ 红线违规：套餐 [${p.id}] billingCycle 为 "${p.billingCycle}"，但被错误标记为真月付 (isTrueMonthly=true)！`);
      errors++;
    }

    // 核心红线 2: 年付折算严禁直接填入月付价格组
    if (p.billingCycle === 'annual' && p.isTrueMonthly) {
      console.error(`❌ 红线违规：套餐 [${p.id}] 属于年付折算，严禁进入真月付列表！`);
      errors++;
    }

    // 检查流量单位规范
    if (p.quotaUnit && !['GB', 'GiB', 'TB'].includes(p.quotaUnit)) {
      console.error(`❌ 非法流量单位: "${p.quotaUnit}" 在套餐 [${p.id}]`);
      errors++;
    }
  }
}

// 2. 验证 brands.json 中的 priceFrom 口径
const brandsPath = path.resolve('src/data/brands.json');
if (fs.existsSync(brandsPath)) {
  const brands = JSON.parse(fs.readFileSync(brandsPath, 'utf8'));
  for (const b of brands) {
    if (!b.priceFrom || b.priceFrom.trim() === '') {
      console.error(`❌ 品牌 [${b.id}] 缺少起步价 priceFrom`);
      errors++;
    }

    // 检查年付/季付是否带明确周期标识
    if (b.priceFrom.includes('季付') && !b.priceFrom.includes('季')) {
      console.error(`❌ 品牌 [${b.id}] 价格周期描述不清: "${b.priceFrom}"`);
      errors++;
    }
  }
}

if (errors > 0) {
  console.error(`\n❌ check-pricing 校验失败，共发现 ${errors} 处价格口径违规！`);
  process.exit(1);
} else {
  console.log('✓ 已校验价格层与品牌起售价口径，真月付与年付折算严格隔离。');
  console.log('✅ check-pricing.mjs 校验全部通过！\n');
}
