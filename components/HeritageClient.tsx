import Link from "next/link";
import { translator, localizeHref } from "@/lib/locale";
import type { Lang } from "@/lib/dict";
import { marbleTypePalettes, marbleTypeImages } from "@/lib/catalog";
import { Stone } from "./Stone";
import { Reveal } from "./Reveal";
import { Counter } from "./Counter";

/* Server Component — static heritage content rendered on the server (zero
   component JS). Stone / Reveal / Counter remain client islands. */
export function HeritageClient({ lang }: { lang: Lang }) {
  const t = translator(lang);
  const ranges = Array.from({ length: 14 }, (_, i) => i + 1);
  const types = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <>
      <section className="her-hero">
        <Stone label="Makrana quarry — terraced marble cliffs" dark src="/assets/hero-marble.jpg" sizes="100vw" priority />
        <div className="wrap" style={{ maxWidth: 920, marginInline: "auto" }}>
          <p className="eyebrow center" style={{ color: "var(--brass-lite)" }}>{t("makrana.eyebrow")}</p>
          <h1 className="display" style={{ marginTop: 20 }}>{t("makrana.title")}</h1>
          <p className="lead mx-auto" style={{ marginTop: 24, color: "rgba(242,236,224,.82)", maxWidth: "62ch" }}>{t("makrana.subtitle")}</p>
        </div>
      </section>

      <section className="section marble-bg">
        <div className="wrap epitome">
          <Reveal><Stone label="Makrana white marble slab, polished" src="/assets/marble-makrana-white.jpg" sizes="(max-width: 880px) 100vw, 45vw" /></Reveal>
          <Reveal delay={1}>
            <p className="eyebrow">{t("makrana.eyebrow")}</p>
            <h2 className="display" style={{ fontSize: "clamp(32px,4.6vw,58px)", margin: "16px 0 26px" }}>{t("makrana.epitome")}</h2>
            <div className="stack-sm lead">
              <p>{t("makrana.intro1")}</p>
              <p>{t("makrana.intro2")}</p>
              <p>{t("makrana.intro3")}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section dark">
        <div className="wrap">
          <div className="center"><p className="eyebrow center">{t("makrana.timelineTitle")}</p></div>
          <div className="timeline">
            {[1, 2, 3, 4].map((i) => (
              <Reveal className="tl-item" key={i}>
                <div className="tl-year">{t(`makrana.h${i}y`)}</div>
                <div className="tl-text">{t(`makrana.history${i}`)}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">{t("makrana.miningRanges")}</p>
          <Reveal className="ranges" style={{ marginTop: 32 }}>
            {ranges.map((i) => (
              <span className="range-chip" key={i}>
                <span className="dot">◆</span><span>{t(`mr${i}`)}</span>
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section dark marble-bg">
        <div className="wrap">
          <div className="center" style={{ maxWidth: 680, marginInline: "auto", marginBottom: 50 }}>
            <p className="eyebrow center">{t("makrana.marbleTypes")}</p>
            <p className="lead" style={{ marginTop: 18 }}>{t("makrana.marbleTypesSub")}</p>
          </div>
          <div className="types-grid">
            {types.map((i) => (
              <Reveal className="type-card" key={i} delay={(i % 2) as 0 | 1}>
                <div className="swatch img-hover">
                  <Stone label={t(`mt${i}n`)} material="marble" pal={marbleTypePalettes[i - 1]} src={marbleTypeImages[i - 1]} sizes="96px" />
                </div>
                <div>
                  <h3>{t(`mt${i}n`)}</h3>
                  <p>{t(`mt${i}d`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap geo-grid">
          <Reveal>
            <p className="eyebrow">{t("makrana.geological")}</p>
            <div className="stack-sm lead" style={{ marginTop: 24 }}>
              <p>{t("makrana.geo1")}</p>
              <p>{t("makrana.geo2")}</p>
              <p>{t("makrana.geo3")}</p>
            </div>
          </Reveal>
          <Reveal className="geo-stats" delay={1}>
            <div className="geo-stat"><span className="gv"><Counter to={55} suffix="M" /></span><span className="gk">{t("makrana.statReserves")}</span></div>
            <div className="geo-stat"><span className="gv">{t("makrana.statPurityV")}</span><span className="gk">{t("makrana.statPurity")}</span></div>
            <div className="geo-stat"><span className="gv"><Counter to={14} suffix="+" /></span><span className="gk">{t("makrana.statRanges")}</span></div>
          </Reveal>
        </div>
      </section>

      <section className="section dark center marble-bg">
        <div className="wrap" style={{ maxWidth: 760, marginInline: "auto" }}>
          <p className="eyebrow center">{t("makrana.title")}</p>
          <h2 className="display" style={{ fontSize: "clamp(32px,5vw,60px)", marginTop: 18 }}>{t("home.ctaTitle")}</h2>
          <Link className="btn btn-primary" style={{ marginTop: 28 }} href={localizeHref(lang, "/contact")}><span>{t("home.ctaBtn")}</span> →</Link>
        </div>
      </section>
    </>
  );
}
