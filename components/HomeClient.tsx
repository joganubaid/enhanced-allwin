"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { homeCategories } from "@/lib/catalog";
import { Showroom } from "./Showroom";
import { Stone } from "./Stone";
import { Reveal } from "./Reveal";
import { useLightbox } from "./Lightbox";

const INITIAL = 5;
const pad = (n: number) => String(n).padStart(2, "0");

function CategoryGallery({ catKey, n, index }: { catKey: string; n: number; index: number }) {
  const { t } = useI18n();
  const lb = useLightbox();
  const [expanded, setExpanded] = useState(false);
  const name = t(catKey);

  const show = expanded ? n : Math.min(INITIAL, n);
  const tiles = Array.from({ length: show }, (_, i) => `${name} · ${pad(i + 1)}`);

  return (
    <Reveal className="cat">
      <div className="cat-head">
        <h3>
          <span className="idx">{pad(index + 1)}</span>
          <span>{name}</span>
        </h3>
        <button
          className="link-arrow"
          style={{ color: "var(--brass-lite)", background: "none", cursor: "pointer" }}
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
        >
          {n} →
        </button>
      </div>
      <div className="cat-grid">
        {tiles.map((label, i) => (
          <button
            key={label}
            className={`tile img-hover${i === 0 ? " feature" : ""}`}
            style={{ cursor: "zoom-in", padding: 0, border: "none", background: "none" }}
            onClick={() => lb.open(tiles.map((l) => ({ label: l })), i)}
            aria-label={label}
          >
            <Stone label={label} />
          </button>
        ))}
        {!expanded && n > INITIAL && (
          <button className="more-tile" onClick={() => setExpanded(true)}>
            <span className="pl">+{n - INITIAL}</span>
            <span className="lbl">{t("home.seeMore")}</span>
          </button>
        )}
      </div>
    </Reveal>
  );
}

export function HomeClient() {
  const { t } = useI18n();

  return (
    <>
      <Showroom />

      <main className="post">
        <section className="section marble-bg">
          <div className="wrap">
            <div className="intro-grid">
              <Reveal>
                <p className="eyebrow">{t("home.introEyebrow")}</p>
                <h2 className="display" style={{ fontSize: "clamp(34px,4.6vw,62px)", marginTop: 22 }}>
                  {t("home.introTitle")}
                </h2>
              </Reveal>
              <Reveal delay={1}>
                <div className="divider" />
                <p className="lead">{t("home.introBody")}</p>
                <Link className="link-arrow" style={{ marginTop: 26 }} href="/about">
                  <span>{t("nav.about")}</span> →
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section dark">
          <div className="wrap">
            <div className="center" style={{ maxWidth: 760, marginInline: "auto" }}>
              <p className="eyebrow center">{t("home.galleryEyebrow")}</p>
              <h2 className="display" style={{ fontSize: "clamp(36px,5.5vw,76px)", marginTop: 20 }}>
                {t("home.galleryTitle")}
              </h2>
              <p className="lead" style={{ marginTop: 22 }}>{t("home.gallerySub")}</p>
            </div>
            <div>
              {homeCategories.map((c, i) => (
                <CategoryGallery key={c.key} catKey={c.key} n={c.n} index={i} />
              ))}
            </div>
            <div className="center" style={{ marginTop: 64 }}>
              <Link className="btn btn-ghost" href="/projects"><span>{t("home.viewAll")}</span> →</Link>
            </div>
          </div>
        </section>

        <section className="section cta-band marble-bg">
          <div className="wrap cta-inner">
            <Reveal>
              <p className="eyebrow">{t("home.ctaEyebrow")}</p>
              <h2 className="display" style={{ marginTop: 20 }}>{t("home.ctaTitle")}</h2>
            </Reveal>
            <Reveal delay={1}>
              <p className="lead">{t("home.ctaBody")}</p>
              <Link className="btn btn-primary" style={{ marginTop: 28 }} href="/contact">
                <span>{t("home.ctaBtn")}</span> →
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
