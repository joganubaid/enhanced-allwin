import { Metadata } from "next";
import { siteConfig } from "@/lib/config";

type PageMetadata = {
  title?: string;
  description?: string;
  path?: string;
};

export function generatePageMetadata({ title, description, path }: PageMetadata): Metadata {
  const fullTitle = title 
    ? `${title} | ${siteConfig.name}` 
    : `${siteConfig.name} - Premium Marble Exporter Since 1985`;
  
  const metaDesc = description || siteConfig.description;
  const canonicalUrl = path ? `${siteConfig.url}${path}` : siteConfig.url;

  // Shared OG image descriptor — kept DRY across openGraph + twitter.
  // Resolved relative to metadataBase; the app/opengraph-image route also auto-wires this.
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
      locale: "en_IN",
      alternateLocale: ["ar_IN"],
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
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}