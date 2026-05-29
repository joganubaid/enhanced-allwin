import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { isLang } from "@/lib/locale";
import type { Lang } from "@/lib/dict";
import { AboutClient } from "@/components/AboutClient";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "en";
  return generatePageMetadata({
    lang,
    title: "About",
    path: "/about",
    description:
      "Established in 1985 by Mr. Abdul Hafeez Rander in Makrana, Rajasthan. Four generations of quarry knowledge and master stone craftsmanship, exporting across India and the globe.",
  });
}

export default function AboutPage() {
  return <AboutClient />;
}
