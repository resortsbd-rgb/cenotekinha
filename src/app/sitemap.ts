import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const origin = "https://cenotekinha.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/experiences", "/about", "/gallery", "/faq", "/contact", "/booking"].map((path) => ({
    url: `${origin}${path}`,
    changeFrequency: path ? "monthly" : "weekly",
    priority: path ? 0.7 : 1,
  }));
}
