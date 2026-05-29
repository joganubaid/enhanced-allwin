import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { isLang } from "@/lib/locale";
import type { Lang } from "@/lib/dict";
import { ContactForm } from "@/components/ContactForm";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "en";
  return generatePageMetadata({
    lang,
    title: "Contact & Enquiries",
    path: "/contact",
    description:
      "Send an enquiry for Makrana marble, granite, quartz or hand-carved stone. We reply within 24 hours. Makrana, Rajasthan & Palakkad, Kerala.",
  });
}

export default function ContactPage() {
  return <ContactForm />;
}
