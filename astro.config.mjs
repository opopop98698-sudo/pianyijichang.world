import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

export default defineConfig({
  site: "https://pianyijichang.world",
  output: "static",
  integrations: [
    mdx(),
    tailwind(),
    icon(),
    sitemap({
      filter: (page) => !page.includes("/draft/") && !page.includes("/search"),
      serialize(item) {
        item.lastmod = new Date("2026-10-20");
        return item;
      },
    }),
  ],
  build: { format: "directory" },
});
