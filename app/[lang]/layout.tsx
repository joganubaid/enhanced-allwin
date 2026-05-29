import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import "../pages.css";
import { siteConfig } from "@/lib/config";
import { I18nProvider } from "@/lib/i18n";
import { LOCALES, isLang, dirFor, ogLocale, localizeHref } from "@/lib/locale";
import type { Lang } from "@/lib/dict";
import { LightboxProvider } from "@/components/Lightbox";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

/** Pre-render both languages at build time. */
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ECEEF1" },
    { media: "(prefers-color-scheme: dark)", color: "#15181C" },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "en";
  return {
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
      url: `${siteConfig.url}${localizeHref(lang, "/")}`,
      siteName: siteConfig.name,
      locale: ogLocale(lang),
      alternateLocale: [ogLocale(lang === "ar" ? "en" : "ar")],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Allwin Marbles — Premium Marble Exporter Since 1985",
      description: siteConfig.description,
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: `${siteConfig.url}${localizeHref(lang, "/")}`,
      languages: {
        en: siteConfig.url + "/",
        ar: siteConfig.url + "/ar",
        "x-default": siteConfig.url + "/",
      },
    },
  };
}

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
  geo: { "@type": "GeoCoordinates", latitude: makranaLat, longitude: makranaLng },
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

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;
  const dir = dirFor(lang);

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <a href="#main" className="skip-link">Skip to content</a>
        <I18nProvider lang={lang}>
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
