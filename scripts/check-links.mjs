import fs from 'node:fs';
import path from 'node:path';

console.log('--- [QA 2/5] 执行站内链接完整性校验 (check-links.mjs) ---');

let errors = 0;

// 已知核心合法路由集合
const validRoutes = new Set([
  '/',
  '/recommend/',
  '/cheap/',
  '/free/',
  '/value/',
  '/plans/',
  '/monthly/',
  '/compare/',
  '/avoid/',
  '/about/',
  '/search/',
  '/404.html',
  '/sitemap-index.xml',
  '/robots.txt'
]);

// 读取 content-map.json 添加规划的合法文章路由与专题路由
const contentMapPath = path.resolve('src/data/content-map.json');
if (fs.existsSync(contentMapPath)) {
  const contentMap = JSON.parse(fs.readFileSync(contentMapPath, 'utf8'));
  for (const p of contentMap) {
    for (const t of p.topics) {
      validRoutes.add(`/topics/${p.id}/${t.id}/`);
      for (const c of t.clusters) {
        for (const a of c.articles) {
          validRoutes.add(`/articles/${a.slug}/`);
        }
      }
    }
  }
}

// 扫描所有已编写的 astro/md/mdx 文件中的 href 链接
const scanDirs = ['src'];
const internalLinkRegex = /href=["'](\/[^"']*?)["']/g;

const checkLinksInFile = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  let match;
  while ((match = internalLinkRegex.exec(content)) !== null) {
    const rawLink = match[1];
    // 忽略静态资源与锚点
    if (rawLink.startsWith('/_astro') || rawLink.startsWith('/_pagefind') || rawLink.startsWith('/pagefind') || rawLink.startsWith('/favicon') || rawLink.startsWith('/api') || rawLink.startsWith('/#')) {
      continue;
    }
    const cleanLink = rawLink.split('#')[0].split('?')[0];
    
    // 检查空链接
    if (cleanLink === '' || cleanLink === '//') {
      console.error(`❌ 发现空链接: "${rawLink}" 在 ${filePath}`);
      errors++;
      continue;
    }

    // 检查草稿链接
    if (cleanLink.startsWith('/draft/')) {
      console.error(`❌ 发现草稿泄漏死链: "${rawLink}" 在 ${filePath}`);
      errors++;
      continue;
    }

    // 检查是否指向不存在的路由或 public 静态资源 (要求带结尾斜杠标准格式)
    const normalized = cleanLink.endsWith('/') || cleanLink.includes('.') ? cleanLink : `${cleanLink}/`;
    const publicFilePath = path.resolve('public', cleanLink.replace(/^\//, ''));
    if (!validRoutes.has(normalized) && !fs.existsSync(publicFilePath)) {
      console.error(`❌ 发现站内死链: "${rawLink}" (规范化: ${normalized}) 在 ${filePath}`);
      errors++;
    }
  }
};

const walkSync = (dir) => {
  if (!fs.existsSync(dir)) return;
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of list) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      walkSync(full);
    } else if (/\.(astro|md|mdx|html)$/.test(item.name)) {
      checkLinksInFile(full);
    }
  }
};

for (const d of scanDirs) {
  walkSync(path.resolve(d));
}

if (errors > 0) {
  console.error(`\n❌ check-links 校验失败，共发现 ${errors} 处无效链接！`);
  process.exit(1);
} else {
  console.log(`✓ 扫描了全部合法路由 (${validRoutes.size} 个)，未发现站内死链与草稿泄露。`);
  console.log('✅ check-links.mjs 校验全部通过！\n');
}
