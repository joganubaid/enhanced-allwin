import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { isLang } from "@/lib/locale";
import type { Lang } from "@/lib/dict";
import { HeritageClient } from "@/components/HeritageClient";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "en";
  return generatePageMetadata({
    lang,
    title: "The Legacy of Makrana Marble",
    path: "/heritage",
    description:
      "Makrana marble — the stone of the Taj Mahal, the Victoria Memorial and the Sheikh Zayed Mosque. Its history, mining ranges, types and 95–98% calcium-carbonate purity.",
  });
}

export default function HeritagePage() {
  return <HeritageClient />;
}
