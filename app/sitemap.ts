import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/business", "/leadership", "/gallery", "/journal", "/contact", ...articles.map((a) => `/journal/${a.slug}`)];
  return routes.map((r) => ({ url: `${site.url}${r}` }));
}
