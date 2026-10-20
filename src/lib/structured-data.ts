/**
 * pianyijichang.world 统一结构化数据生成器 (JSON-LD)
 */

export const generateWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "便宜机场",
  "url": "https://pianyijichang.world",
  "description": "面向预算有限用户，提供真实机场价格、套餐对比、流量规则与选购依据。",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://pianyijichang.world/search/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
});

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "便宜机场独立评测团队",
  "url": "https://pianyijichang.world",
  "logo": "https://pianyijichang.world/avatar.jpg",
  "description": "独立第三方代理服务选购与套餐资料核查机构，与任何机场品牌无隶属关系。"
});

export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url.startsWith("http") ? item.url : `https://pianyijichang.world${item.url}`
  }))
});

export const generateCollectionPageSchema = (
  title: string,
  description: string,
  url: string,
  items: { name: string; url: string }[] = []
) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": title,
  "description": description,
  "url": url.startsWith("http") ? url : `https://pianyijichang.world${url}`,
  "isPartOf": {
    "@type": "WebSite",
    "name": "便宜机场",
    "url": "https://pianyijichang.world"
  },
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": items.length,
    "itemListElement": items.map((item, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": item.name,
      "url": item.url.startsWith("http") ? item.url : `https://pianyijichang.world${item.url}`
    }))
  }
});

export const generateArticleSchema = (
  title: string,
  description: string,
  url: string,
  publishedAt: string,
  modifiedAt: string
) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": title,
  "description": description,
  "url": url.startsWith("http") ? url : `https://pianyijichang.world${url}`,
  "datePublished": publishedAt,
  "dateModified": modifiedAt,
  "author": {
    "@type": "Organization",
    "name": "便宜机场评测组"
  },
  "publisher": {
    "@type": "Organization",
    "name": "便宜机场",
    "url": "https://pianyijichang.world"
  }
});
