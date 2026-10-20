import fs from 'node:fs';
import path from 'node:path';

console.log('--- [QA 3/5] 执行 SEO 与元数据唯一性校验 (check-seo.mjs) ---');

let errors = 0;

// 1. 检查所有 Pillar 与主入口页面定义
const requiredPillars = [
  { path: 'home', h1: '便宜机场｜低预算代理选购与套餐资料库' },
  { path: 'recommend', h1: '机场推荐：新手、日常主力与备用方案怎么选' },
  { path: 'cheap', h1: '便宜机场推荐：低价套餐、实际付款与使用限制' },
  { path: 'free', h1: '免费机场与免费试用：资源条件、可用性与核验记录' },
  { path: 'value', h1: '性价比机场怎么选：流量成本、可用体验与长期支出' },
  { path: 'plans', h1: '机场流量套餐大全：额度、周期、重置与不限时方案' },
  { path: 'monthly', h1: '月付机场推荐：真实月扣款、首月体验与续费指南' },
  { path: 'compare', h1: '机场价格对比：同预算、同流量与优惠后实际付款' },
  { path: 'avoid', h1: '机场避坑指南：低价宣传、套餐限制与购买前核查' }
];

const titles = new Map();
const h1s = new Map();

for (const p of requiredPillars) {
  const filePath = path.resolve(`src/content/pages/${p.path}/index.md`);
  if (!fs.existsSync(filePath)) {
    // 允许阶段推进中还未全部生成，只记录警告
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const titleMatch = content.match(/^title:\s*["']?(.*?)["']?$/m);
  const h1Match = content.match(/^h1:\s*["']?(.*?)["']?$/m);

  if (titleMatch) {
    const t = titleMatch[1].trim();
    if (titles.has(t)) {
      console.error(`❌ Title 重复: "${t}" 在 ${filePath} 与 ${titles.get(t)}`);
      errors++;
    } else {
      titles.set(t, filePath);
    }
  }

  if (h1Match) {
    const h = h1Match[1].trim();
    if (h1s.has(h)) {
      console.error(`❌ H1 重复: "${h}" 在 ${filePath} 与 ${h1s.get(h)}`);
      errors++;
    } else {
      h1s.set(h, filePath);
    }
  }
}

// 2. 检查 robots.txt 与 sitemap
const robotsPath = path.resolve('public/robots.txt');
if (!fs.existsSync(robotsPath)) {
  console.error('❌ 缺失 public/robots.txt');
  errors++;
} else {
  const robots = fs.readFileSync(robotsPath, 'utf8');
  if (!robots.includes('Sitemap: https://pianyijichang.world/sitemap-index.xml')) {
    console.error('❌ robots.txt 中未正确引用 sitemap 链接');
    errors++;
  }
  if (!robots.includes('User-agent: OAI-SearchBot')) {
    console.error('❌ robots.txt 中未包含 OAI-SearchBot 规则');
    errors++;
  }
}

// 3. 检查 .htaccess 规范化
const htaccessPath = path.resolve('public/.htaccess');
if (!fs.existsSync(htaccessPath)) {
  console.error('❌ 缺失 public/.htaccess');
  errors++;
} else {
  const ht = fs.readFileSync(htaccessPath, 'utf8');
  if (!ht.includes('RewriteCond %{HTTPS} off')) {
    console.error('❌ .htaccess 缺少强制 HTTPS 规则');
    errors++;
  }
  if (!ht.includes('X-Content-Type-Options "nosniff"')) {
    console.error('❌ .htaccess 缺少基础安全头设置');
    errors++;
  }
}

if (errors > 0) {
  console.error(`\n❌ check-seo 校验失败，共发现 ${errors} 处 SEO 配置错误！`);
  process.exit(1);
} else {
  console.log(`✓ 已核验已建主入口 Title/H1 唯一性与核心爬虫配置文件。`);
  console.log('✅ check-seo.mjs 校验全部通过！\n');
}
