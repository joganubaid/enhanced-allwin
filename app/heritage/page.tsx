import { generatePageMetadata } from "@/lib/metadata";
import { HeritageClient } from "@/components/HeritageClient";

export const metadata = generatePageMetadata({
  title: "The Legacy of Makrana Marble",
  path: "/heritage",
  description:
    "Makrana marble — the stone of the Taj Mahal, the Victoria Memorial and the Sheikh Zayed Mosque. Its history, mining ranges, types and 95–98% calcium-carbonate purity.",
});

export default function HeritagePage() {
  return <HeritageClient />;
}
