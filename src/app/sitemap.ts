import type { MetadataRoute } from "next";
import { tourSlugs } from "@/lib/tour-pages";

export const dynamic = "force-static";

const origin = "https://cenotekinha.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/experiences", "/about", "/gallery", "/faq", "/contact", "/booking", ...tourSlugs.map((slug) => `/tours/${slug}`)].map((path) => ({
    url: `${origin}${path}`,
    changeFrequency: path ? "monthly" : "weekly",
    priority: path ? 0.7 : 1,
  }));
}
