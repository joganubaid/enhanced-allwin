import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import "./pages.css";
import { siteConfig } from "@/lib/config";
import { I18nProvider } from "@/lib/i18n";
import type { Lang } from "@/lib/dict";
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ECEEF1" },
    { media: "(prefers-color-scheme: dark)", color: "#15181C" },
  ],
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
    locale: "en_IN",
    alternateLocale: ["ar_IN"],
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

const [makranaLat, makranaLng] = siteConfig.coordinates.makrana.split(",").map((c) => c.trim());
const [keralaLat, keralaLng] = siteConfig.coordinates.kerala.split(",").map((c) => c.trim());

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  description: siteConfig.description,
  image: `${siteConfig.url}/assets/hero-marble.jpg`,
  logo: `${siteConfig.url}/assets/logo-light.svg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Near Bhati Petrol Pump, Bye Pass Road",
    addressLocality: "Makrana",
    addressRegion: "Rajasthan",
    postalCode: "341505",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: makranaLat,
    longitude: makranaLng,
  },
  telephone: siteConfig.phone,
  email: siteConfig.email,
  url: siteConfig.url,
  priceRange: "$$",
  openingHours: "Mo-Sa 09:00-19:00",
  foundingDate: "1985",
  areaServed: { "@type": "Country", name: "India" },
  serviceType: ["Marble Export", "Granite Supply", "Stone Carving", "Islamic Calligraphy"],
  location: [
    {
      "@type": "Place",
      name: "Allwin Marbles — Makrana",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Near Bhati Petrol Pump, Bye Pass Road",
        addressLocality: "Makrana",
        addressRegion: "Rajasthan",
        postalCode: "341505",
        addressCountry: "IN",
      },
      geo: { "@type": "GeoCoordinates", latitude: makranaLat, longitude: makranaLng },
    },
    {
      "@type": "Place",
      name: "Allwin Marbles & Granite — Palakkad",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Palakkad",
        addressRegion: "Kerala",
        postalCode: "673304",
        addressCountry: "IN",
      },
      geo: { "@type": "GeoCoordinates", latitude: keralaLat, longitude: keralaLng },
    },
  ],
  sameAs: [
    siteConfig.social.whatsappLink,
    siteConfig.social.telegramLink,
    siteConfig.social.mapsMakrana,
    siteConfig.social.mapsKerala,
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("locale")?.value;
  const initialLang: Lang = cookieLocale === "ar" ? "ar" : "en";
  const dir = initialLang === "ar" ? "rtl" : "ltr";

  return (
    <html lang={initialLang} dir={dir} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <a href="#main" className="skip-link">Skip to content</a>
        <I18nProvider initialLang={initialLang}>
          <LightboxProvider>
            <Navbar />
            <div id="main">{children}</div>
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
