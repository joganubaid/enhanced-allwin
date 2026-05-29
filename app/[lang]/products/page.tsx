import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { isLang } from "@/lib/locale";
import type { Lang } from "@/lib/dict";
import { ProductsClient } from "@/components/ProductsClient";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "en";
  return generatePageMetadata({
    lang,
    title: "Products & Services",
    path: "/products",
    description:
      "From raw Makrana marble slabs to handcrafted masterpieces — marble, granite, cultured marble, mosaic, sparkle quartz and hand-carved handicrafts. Every surface sourced and finished in-house.",
  });
}

export default function ProductsPage() {
  return <ProductsClient />;
}
