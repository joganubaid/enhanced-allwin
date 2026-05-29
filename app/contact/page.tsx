import { generatePageMetadata } from "@/lib/metadata";
import { ContactForm } from "@/components/ContactForm";

export const metadata = generatePageMetadata({
  title: "Contact & Enquiries",
  path: "/contact",
  description:
    "Send an enquiry for Makrana marble, granite, quartz or hand-carved stone. We reply within 24 hours. Makrana, Rajasthan & Palakkad, Kerala.",
});

export default function ContactPage() {
  return <ContactForm />;
}
