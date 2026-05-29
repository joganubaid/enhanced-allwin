import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Allwin",
    description:
      "Premium Makrana marble, granite, and handicrafts exporter since 1985",
    start_url: "/",
    display: "standalone",
    background_color: "#15181C",
    theme_color: "#15181C",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
