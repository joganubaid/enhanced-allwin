"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { stripLocale, localizeHref } from "@/lib/locale";
import { PhoneIcon } from "./icons";

const PAGES = [
  { href: "/", key: "nav.home" },
  { href: "/products", key: "nav.products" },
  { href: "/projects", key: "nav.projects" },
  { href: "/about", key: "nav.about" },
  { href: "/heritage", key: "nav.heritage" },
  { href: "/contact", key: "nav.contact" },
];

const DARK_PAGES = ["/about", "/heritage"];

export function Navbar() {
  const { t, lang, lhref } = useI18n();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);

  // Compare against the locale-stripped path so active-state works in both languages.
  const barePath = stripLocale(pathname);
  const onDark = DARK_PAGES.includes(barePath);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the mobile drawer on navigation
  useEffect(() => {
    setDrawer(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  // Language switch = navigate to the same page in the other locale (keeps SSR correct).
  const enHref = localizeHref("en", barePath);
  const arHref = localizeHref("ar", barePath);

  // Single, unambiguous switch: always links to the OTHER language (no "click the
  // one you're already on" confusion). Plain <a> = full navigation so the server
  // re-renders the root <html lang/dir> for the new locale.
  const otherHref = lang === "en" ? arHref : enHref;
  const otherLabel = lang === "en" ? "العربية" : "English";
  const langBtns = (
    <div className="lang-toggle">
      <a href={otherHref} hrefLang={lang === "en" ? "ar" : "en"} aria-label={`Switch to ${otherLabel}`}>{otherLabel}</a>
    </div>
  );

  return (
    <>
      <header className={`nav${onDark ? " on-dark" : ""}${scrolled ? " scrolled" : ""}`}>
        <Link className="brand" href={lhref("/")}>
          <span className="brand-mark">A</span>
          <span>
            <span className="brand-name">Allwin Marbles</span>
            <span className="brand-sub" style={{ display: "block" }}>{t("brand.sub")}</span>
          </span>
        </Link>

        <nav className="nav-links">
          {PAGES.map((p) => (
            <Link key={p.href} className={`nav-link${barePath === p.href ? " active" : ""}`} href={lhref(p.href)}>
              {t(p.key)}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          {langBtns}
          <Link className="nav-cta" href={lhref("/contact")}>
            <PhoneIcon /> <span>{t("nav.enquire")}</span>
          </Link>
          <button
            className={`nav-burger${drawer ? " open" : ""}`}
            aria-label="Menu"
            aria-expanded={drawer}
            aria-controls="nav-drawer"
            onClick={() => setDrawer((d) => !d)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <div id="nav-drawer" className={`nav-drawer${drawer ? " open" : ""}`} aria-hidden={!drawer} inert={drawer ? undefined : true}>
        {PAGES.map((p) => (
          <Link key={p.href} className={barePath === p.href ? "active" : ""} href={lhref(p.href)}>
            {t(p.key)}
          </Link>
        ))}
        <div className="drawer-foot">
          <div className="lang-toggle" style={{ alignSelf: "flex-start" }}>
            <a href={otherHref} hrefLang={lang === "en" ? "ar" : "en"} aria-label={`Switch to ${otherLabel}`}>{otherLabel}</a>
          </div>
          <Link className="btn btn-primary" href={lhref("/contact")}>{t("nav.callNow")}</Link>
        </div>
      </div>
    </>
  );
}
