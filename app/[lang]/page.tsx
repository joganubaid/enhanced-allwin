import { generatePageMetadata } from "@/lib/metadata";
import { HomeClient } from "@/components/HomeClient";

export const metadata = generatePageMetadata({
  description:
    "Premium Makrana marble exporter since 1985. The same stone that built the Taj Mahal — quarried, carved and exported worldwide. Marble, granite, cultured marble, quartz and hand-carved stone.",
});

export default function HomePage() {
  return <HomeClient />;
}
