import { generatePageMetadata } from "@/lib/metadata";
import { ProductsClient } from "@/components/ProductsClient";

export const metadata = generatePageMetadata({
  title: "Products & Services",
  path: "/products",
  description:
    "From raw Makrana marble slabs to handcrafted masterpieces — marble, granite, cultured marble, mosaic, sparkle quartz and hand-carved handicrafts. Every surface sourced and finished in-house.",
});

export default function ProductsPage() {
  return <ProductsClient />;
}
