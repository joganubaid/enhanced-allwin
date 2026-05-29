import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { isLang } from "@/lib/locale";
import type { Lang } from "@/lib/dict";
import { HomeClient } from "@/components/HomeClient";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "en";
  return generatePageMetadata({
    lang,
    description:
      "Premium Makrana marble exporter since 1985. The same stone that built the Taj Mahal — quarried, carved and exported worldwide. Marble, granite, cultured marble, quartz and hand-carved stone.",
  });
}

export default function HomePage() {
  return <HomeClient />;
}
