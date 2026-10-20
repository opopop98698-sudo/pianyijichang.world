import fs from 'node:fs';
import path from 'node:path';

console.log('--- [QA 1/5] 执行内容合规与元数据校验 (validate-content.mjs) ---');

let errors = 0;
let warnings = 0;

// 1. 检查 content-map.json
const contentMapPath = path.resolve('src/data/content-map.json');
if (!fs.existsSync(contentMapPath)) {
  console.error('❌ 缺失核心数据文件: src/data/content-map.json');
  process.exit(1);
}

const contentMap = JSON.parse(fs.readFileSync(contentMapPath, 'utf8'));
const slugs = new Set();
let articleCount = 0;

for (const p of contentMap) {
  if (!p.id || !p.name) {
    console.error(`❌ 栏目缺少 id 或 name: ${JSON.stringify(p)}`);
    errors++;
  }
  for (const t of p.topics) {
    if (!t.id || !t.name) {
      console.error(`❌ 专题缺少 id 或 name: ${JSON.stringify(t)}`);
      errors++;
    }
    for (const c of t.clusters) {
      if (!c.id || !c.name) {
        console.error(`❌ 集群缺少 id 或 name: ${JSON.stringify(c)}`);
        errors++;
      }
      for (const a of c.articles) {
        articleCount++;
        if (!a.title || a.title.trim() === '') {
          console.error(`❌ 发现空标题文章 (集群: ${c.id})`);
          errors++;
        }
        if (!a.primaryIntent || a.primaryIntent.trim() === '') {
          console.error(`❌ 文章缺少 primaryIntent: "${a.title}"`);
          errors++;
        }
        if (slugs.has(a.slug)) {
          console.error(`❌ 发现重复 Slug: "${a.slug}"`);
          errors++;
        }
        slugs.add(a.slug);

        // 检查草稿/占位残留文本
        const placeholderRegex = /TODO|TBD|占位|测试标题|xxx|XXX|待填充/i;
        if (placeholderRegex.test(a.title)) {
          console.error(`❌ 发现占位残留标题: "${a.title}"`);
          errors++;
        }
      }
    }
  }
}

console.log(`✓ 已校验 content-map.json 中全部 ${articleCount} 篇规划文章，无重复 Slug 与占位符。`);

// 2. 检查 Markdown / MDX 页面文件的 Frontmatter
const pagesDir = path.resolve('src/content/pages');
if (fs.existsSync(pagesDir)) {
  const checkFrontmatter = (dir) => {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) {
        checkFrontmatter(fullPath);
      } else if (file.name.endsWith('.md') || file.name.endsWith('.mdx')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
        if (!match) {
          console.error(`❌ 缺少 Frontmatter: ${fullPath}`);
          errors++;
          continue;
        }
        const fm = match[1];
        const requiredFields = ['id', 'title', 'description', 'h1', 'permalink', 'primaryIntent'];
        for (const req of requiredFields) {
          if (!new RegExp(`^${req}:`, 'm').test(fm)) {
            console.error(`❌ 缺少必填 Frontmatter 字段 [${req}]: ${fullPath}`);
            errors++;
          }
        }
      }
    }
  };
  checkFrontmatter(pagesDir);
}

if (errors > 0) {
  console.error(`\n❌ validate-content 校验失败，共发现 ${errors} 处严重错误！`);
  process.exit(1);
} else {
  console.log('✅ validate-content.mjs 校验全部通过！\n');
}
