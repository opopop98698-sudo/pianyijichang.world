/**
 * 全站统一 SEO 配置与搜索引擎接入配置
 * pianyijichang.world
 */

export const siteSeoConfig = {
  siteOrigin: "https://pianyijichang.world",
  siteName: "便宜机场",
  defaultImage: "https://pianyijichang.world/avatar.jpg",
  defaultAuthor: "便宜机场中立评测组",
  
  // 搜索引擎站长平台所有权验证（在下方填入代码，或通过环境变量配置；若未获取保持为空，严禁伪造）
  verifications: {
    google: import.meta.env.PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    bing: import.meta.env.PUBLIC_BING_SITE_VERIFICATION || "",
    shenma: import.meta.env.PUBLIC_SHENMA_SITE_VERIFICATION || "",
    baidu: import.meta.env.PUBLIC_BAIDU_SITE_VERIFICATION || ""
  }
};
