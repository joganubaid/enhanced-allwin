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
      locale: "en_US",
      type: "website",
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