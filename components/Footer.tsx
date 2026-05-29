"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { siteConfig } from "@/lib/config";
import { PinIcon, PhoneIcon, MailIcon } from "./icons";

const LINKS = [
  { href: "/products", key: "nav.products" },
  { href: "/projects", key: "nav.projects" },
  { href: "/about", key: "nav.about" },
  { href: "/heritage", key: "nav.heritage" },
  { href: "/contact", key: "nav.contact" },
];

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="display">Allwin Marbles</div>
            <p className="measure">{t("footer.desc")}</p>
          </div>
          <div>
            <h4>{t("footer.quickLinks")}</h4>
            <div className="footer-links">
              {LINKS.map((l) => (
                <Link key={l.href} href={l.href}>{t(l.key)}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4>{t("footer.contact")}</h4>
            <div className="footer-contact">
              <a href={siteConfig.social.mapsMakrana} target="_blank" rel="noopener noreferrer">
                <PinIcon /><span>{t("footer.makranaLocation")}</span>
              </a>
              <a href={siteConfig.social.mapsKerala} target="_blank" rel="noopener noreferrer">
                <PinIcon /><span>{t("footer.keralaLocation")}</span>
              </a>
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
                <PhoneIcon /><span>{siteConfig.phone} · {siteConfig.phoneAlt}</span>
              </a>
              <a href={`mailto:${siteConfig.email}`}>
                <MailIcon /><span>{siteConfig.email}</span>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {year} Allwin Marbles. {t("footer.copyright")}</span>
          <span>IEC {siteConfig.company.iec} · GSTIN {siteConfig.company.gstin}</span>
        </div>
      </div>
    </footer>
  );
}
