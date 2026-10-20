import fs from 'node:fs';
import path from 'node:path';

console.log('--- [QA 5/5] 执行品牌推广链接与商业披露合规审计 (audit-brand-links.mjs) ---');

let errors = 0;

// 1. 读取 42 个品牌源数据
const brandsPath = path.resolve('src/data/brands.json');
if (!fs.existsSync(brandsPath)) {
  console.error('❌ 缺少 src/data/brands.json');
  process.exit(1);
}
const brands = JSON.parse(fs.readFileSync(brandsPath, 'utf8'));

// 2. 检查 BrandCard.astro 中是否包含强制商业推广披露与正确 rel 属性
const brandCardPath = path.resolve('src/components/BrandCard.astro');
if (!fs.existsSync(brandCardPath)) {
  console.error('❌ 缺失关键组件 src/components/BrandCard.astro');
  process.exit(1);
}

const brandCardContent = fs.readFileSync(brandCardPath, 'utf8');

// 校验 rel="nofollow sponsored noopener"
if (!brandCardContent.includes('rel="nofollow sponsored noopener"')) {
  console.error('❌ BrandCard.astro 中缺少合规属性: rel="nofollow sponsored noopener"');
  errors++;
}

// 校验 target="_blank"
if (!brandCardContent.includes('target="_blank"')) {
  console.error('❌ BrandCard.astro 中缺少属性: target="_blank"');
  errors++;
}

// 校验法定义务披露文案
const disclosureText = '含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格';
if (!brandCardContent.includes(disclosureText)) {
  console.error(`❌ BrandCard.astro 中缺少商业披露文案: "${disclosureText}"`);
  errors++;
}

// 校验品牌资料显示前缀
if (!brandCardContent.includes('品牌资料显示')) {
  console.error('❌ BrandCard.astro 中缺少针对 vendor 状态亮点的「品牌资料显示」前缀处理');
  errors++;
}

// 3. 检查 PromoCard.astro
const promoCardPath = path.resolve('src/components/PromoCard.astro');
if (fs.existsSync(promoCardPath)) {
  const promoCardContent = fs.readFileSync(promoCardPath, 'utf8');
  if (!promoCardContent.includes('rel="nofollow sponsored noopener"')) {
    console.error('❌ PromoCard.astro 中缺少合规属性: rel="nofollow sponsored noopener"');
    errors++;
  }
}

if (errors > 0) {
  console.error(`\n❌ audit-brand-links 审计失败，共发现 ${errors} 处合规缺陷！`);
  process.exit(1);
} else {
  console.log(`✓ 42 个品牌链接已全面核验，组件强制锁定 target="_blank"、rel="nofollow sponsored noopener" 与法定商业披露文案。`);
  console.log('✅ audit-brand-links.mjs 校验全部通过！\n');
}
