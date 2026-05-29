import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./pages.css";
import { siteConfig } from "@/lib/config";
import { I18nProvider } from "@/lib/i18n";
import { LightboxProvider } from "@/components/Lightbox";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#15181C",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Allwin Marbles — Premium Makrana Marble, Granite & Handicrafts Since 1985",
    template: "%s — Allwin Marbles",
  },
  description: siteConfig.description,
  keywords: [
    "Makrana marble", "marble exporter", "granite supplier", "marble handicrafts",
    "Islamic calligraphy", "Makrana white marble", "stone carving",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: "Allwin Marbles — Premium Marble Exporter Since 1985",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Allwin Marbles — Premium Marble Exporter Since 1985",
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteConfig.url },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  description: siteConfig.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Near Bhati Petrol Pump, Bye Pass Road",
    addressLocality: "Makrana",
    addressRegion: "Rajasthan",
    postalCode: "341505",
    addressCountry: "IN",
  },
  telephone: siteConfig.phone,
  email: siteConfig.email,
  url: siteConfig.url,
  priceRange: "$$",
  openingHours: "Mo-Sa 09:00-19:00",
  foundingDate: "1985",
  areaServed: { "@type": "Country", name: "India" },
  serviceType: ["Marble Export", "Granite Supply", "Stone Carving", "Islamic Calligraphy"],
  sameAs: [siteConfig.social.whatsappLink, siteConfig.social.telegramLink],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <I18nProvider>
          <LightboxProvider>
            <Navbar />
            {children}
            <Footer />
            <FloatingButtons />
          </LightboxProvider>
        </I18nProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
