import { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import { localizeHref, ogLocale } from "@/lib/locale";
import type { Lang } from "@/lib/dict";

type PageMetadata = {
  title?: string;
  description?: string;
  /** Bare (unlocalized) path, e.g. "/products". Omit for home. */
  path?: string;
  /** Active locale; defaults to English. */
  lang?: Lang;
};

export function generatePageMetadata({ title, description, path, lang = "en" }: PageMetadata): Metadata {
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} - Premium Marble Exporter Since 1985`;

  const metaDesc = description || siteConfig.description;
  const bare = path || "/";

  const canonicalUrl = `${siteConfig.url}${localizeHref(lang, bare)}`;
  // hreflang map — both language versions + x-default pointing at English.
  const languages: Record<string, string> = {
    en: `${siteConfig.url}${localizeHref("en", bare)}`,
    ar: `${siteConfig.url}${localizeHref("ar", bare)}`,
    "x-default": `${siteConfig.url}${localizeHref("en", bare)}`,
  };

  // Shared OG image descriptor — kept DRY across openGraph + twitter.
  const ogImages = [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteConfig.name }];

  return {
    title: fullTitle,
    description: metaDesc,
    keywords: [
      "Makrana marble",
      "marble exporter",
      "granite supplier",
      "marble handicrafts",
      "Islamic calligraphy",
      title ? title.toLowerCase() : "",
    ].filter(Boolean),
    authors: [{ name: siteConfig.name }],
    openGraph: {
      title: fullTitle,
      description: metaDesc,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: ogLocale(lang),
      alternateLocale: [ogLocale(lang === "ar" ? "en" : "ar")],
      type: "website",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDesc,
      images: ogImages,
    },
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
