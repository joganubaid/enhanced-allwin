"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
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
  const { t, lang, setLang } = useI18n();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);

  const onDark = DARK_PAGES.includes(pathname);

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

  const langBtns = (
    <div className="lang-toggle">
      <button className={lang === "en" ? "active" : ""} data-lang="en" onClick={() => setLang("en")}>EN</button>
      <button className={lang === "ar" ? "active" : ""} data-lang="ar" onClick={() => setLang("ar")}>ع</button>
    </div>
  );

  return (
    <>
      <header className={`nav${onDark ? " on-dark" : ""}${scrolled ? " scrolled" : ""}`}>
        <Link className="brand" href="/">
          <span className="brand-mark">A</span>
          <span>
            <span className="brand-name">Allwin Marbles</span>
            <span className="brand-sub" style={{ display: "block" }}>{t("brand.sub")}</span>
          </span>
        </Link>

        <nav className="nav-links">
          {PAGES.map((p) => (
            <Link key={p.href} className={`nav-link${pathname === p.href ? " active" : ""}`} href={p.href}>
              {t(p.key)}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          {langBtns}
          <Link className="nav-cta" href="/contact">
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
          <Link key={p.href} className={pathname === p.href ? "active" : ""} href={p.href}>
            {t(p.key)}
          </Link>
        ))}
        <div className="drawer-foot">
          <div className="lang-toggle" style={{ alignSelf: "flex-start" }}>
            <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
            <button className={lang === "ar" ? "active" : ""} onClick={() => setLang("ar")}>ع</button>
          </div>
          <Link className="btn btn-primary" href="/contact">{t("nav.callNow")}</Link>
        </div>
      </div>
    </>
  );
}
