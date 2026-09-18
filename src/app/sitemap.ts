import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const routes = ["", "/experiences", "/booking", "/gallery", "/about", "/faq", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://cenotekinha.com${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/booking" ? 0.9 : 0.7,
  }));
}
