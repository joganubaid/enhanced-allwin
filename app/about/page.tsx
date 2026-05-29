import { generatePageMetadata } from "@/lib/metadata";
import { AboutClient } from "@/components/AboutClient";

export const metadata = generatePageMetadata({
  title: "About",
  path: "/about",
  description:
    "Established in 1985 by Mr. Abdul Hafeez Rander in Makrana, Rajasthan. Four generations of quarry knowledge and master stone craftsmanship, exporting across India and the globe.",
});

export default function AboutPage() {
  return <AboutClient />;
}
