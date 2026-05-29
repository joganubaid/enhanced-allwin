"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { homeCategories } from "@/lib/catalog";
import { galleryImages } from "@/lib/gallery-images";
import { Showroom } from "./Showroom";
import { Stone } from "./Stone";
import { Reveal } from "./Reveal";
import { useLightbox } from "./Lightbox";

const INITIAL = 5;
const pad = (n: number) => String(n).padStart(2, "0");

function CategoryGallery({ catKey, gallery, index }: { catKey: string; gallery: string; index: number }) {
  const { t } = useI18n();
  const lb = useLightbox();
  const [expanded, setExpanded] = useState(false);
  const name = t(catKey);
  // Falls back to a literal if the dict key isn't present yet (dict owned elsewhere).
  const seeLessRaw = t("home.seeLess");
  const seeLess = seeLessRaw === "home.seeLess" ? "Show less" : seeLessRaw;

  const photos = galleryImages[gallery] || [];
  const total = photos.length;
  const show = expanded ? total : Math.min(INITIAL, total);
  const tiles = photos.slice(0, show).map((src, i) => ({ label: `${name} · ${pad(i + 1)}`, src }));
  const allItems = photos.map((src, i) => ({ label: `${name} · ${pad(i + 1)}`, src }));

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
          <span>{expanded ? seeLess : `${total} ${t("home.seeMore")}`}</span>
          <span
            aria-hidden="true"
            style={{
              display: "inline-block",
              marginInlineStart: 6,
              transition: "transform 0.25s ease",
              transform: expanded ? "rotate(-90deg)" : "rotate(90deg)",
            }}
          >
            ›
          </span>
        </button>
      </div>
      <div className="cat-grid">
        {tiles.map((tile, i) => (
          <button
            key={tile.src}
            className={`tile img-hover${i === 0 ? " feature" : ""}`}
            style={{ cursor: "zoom-in", padding: 0, border: "none", background: "none" }}
            onClick={() => lb.open(allItems, i)}
            aria-label={tile.label}
          >
            <Stone label={tile.label} src={tile.src} sizes={i === 0 ? "(max-width: 820px) 100vw, 40vw" : "(max-width: 640px) 50vw, 20vw"} />
          </button>
        ))}
        {!expanded && total > INITIAL && (
          <button className="more-tile" onClick={() => setExpanded(true)}>
            <span className="pl">+{total - INITIAL}</span>
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
                <h1 className="display" style={{ fontSize: "clamp(34px,4.6vw,62px)", marginTop: 22 }}>
                  {t("home.introTitle")}
                </h1>
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
                <CategoryGallery key={c.key} catKey={c.key} gallery={c.gallery} index={i} />
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
