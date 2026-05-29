import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { localizeHref } from "@/lib/locale";

const BUILD_DATE = new Date();

// Bare paths + their change cadence / priority.
const ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/products", changeFrequency: "weekly", priority: 0.9 },
  { path: "/projects", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/heritage", changeFrequency: "monthly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  return ROUTES.flatMap(({ path, changeFrequency, priority }) => {
    const enUrl = `${base}${localizeHref("en", path)}`;
    const arUrl = `${base}${localizeHref("ar", path)}`;
    // Each entry advertises its language alternates for hreflang in the sitemap.
    const alternates = { languages: { en: enUrl, ar: arUrl } };
    return [
      { url: enUrl, lastModified: BUILD_DATE, changeFrequency, priority, alternates },
      { url: arUrl, lastModified: BUILD_DATE, changeFrequency, priority: Math.max(0.3, priority - 0.1), alternates },
    ];
  });
}
