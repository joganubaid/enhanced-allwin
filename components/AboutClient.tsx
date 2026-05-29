"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { Stone } from "./Stone";
import { Reveal } from "./Reveal";
import { CheckIcon } from "./icons";

export function AboutClient() {
  const { t } = useI18n();

  return (
    <>
      <section className="about-hero">
        <Stone label="Makrana marble quarry — wide landscape" dark src="/assets/hero-marble.jpg" sizes="100vw" priority />
        <div className="wrap">
          <p className="eyebrow" style={{ color: "var(--brass-lite)" }}>{t("about.eyebrow")}</p>
          <h1 className="display" style={{ marginTop: 18 }}>{t("about.title")}</h1>
        </div>
      </section>

      <section className="section marble-bg">
        <div className="wrap story-grid">
          <Reveal className="story-media"><Stone label="Hand-carved marble craftsmanship" src="/assets/handicraft-hand-carving.jpg" sizes="(max-width: 880px) 100vw, 45vw" /></Reveal>
          <Reveal delay={1}>
            <p className="eyebrow">{t("about.eyebrow")}</p>
            <h2 className="display" style={{ fontSize: "clamp(34px,5vw,64px)", margin: "18px 0 30px" }}>{t("about.fromMakrana")}</h2>
            <div className="stack-sm lead">
              <p>{t("about.story1")}</p>
              <p>{t("about.story2")}</p>
              <p>{t("about.story3")}</p>
              <p style={{ color: "var(--ink)", fontStyle: "italic", fontFamily: "var(--serif)", fontSize: "clamp(22px,2.6vw,30px)", lineHeight: 1.4, paddingTop: 8 }}>
                {t("about.story4")}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section dark">
        <div className="wrap founder">
          <Reveal className="founder-portrait"><Stone label="Master artisans hand-finishing intricate marble inlay at the Makrana atelier" dark src="/assets/handicraft-inlay-work.jpg" sizes="(max-width: 880px) 100vw, 45vw" /></Reveal>
          <Reveal delay={1}>
            <p className="eyebrow">{t("about.founderEyebrow")}</p>
            <blockquote style={{ marginTop: 22 }}>“<span>{t("about.founderText")}</span>”</blockquote>
            <p className="lead" style={{ marginTop: 24 }}>{t("about.founderHistory")}</p>
            <div className="sig">
              <div className="name">{t("about.founderName")}</div>
              <div className="role">{t("about.founderTitle")}</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="center" style={{ marginBottom: 48 }}><p className="eyebrow center">{t("about.companyOverview")}</p></div>
          <div className="ov-grid">
            <Reveal className="ov-card"><div className="k">{t("about.founded")}</div><div className="v">1985</div></Reveal>
            <Reveal className="ov-card" delay={1}><div className="k">{t("about.iec")}</div><div className="v" style={{ fontFamily: "var(--mono)", fontSize: 22, paddingTop: 12 }}>ACCPR2904A</div></Reveal>
            <Reveal className="ov-card" delay={2}><div className="k">{t("about.location")}</div><div className="v">Makrana</div></Reveal>
            <Reveal className="ov-card" delay={3}><div className="k">{t("about.reach")}</div><div className="v" style={{ fontSize: "clamp(26px,3vw,38px)", paddingTop: 6 }}>{t("about.reach2")}</div></Reveal>
          </div>
          <div className="reg-grid">
            <Reveal className="reg"><div><div className="rk">{t("about.iecNo")}</div><div className="rv">ACCPR2904A</div></div></Reveal>
            <Reveal className="reg" delay={1}><div><div className="rk">{t("about.gstinNo")}</div><div className="rv">08ACCPR2904A1Z3</div></div></Reveal>
          </div>
        </div>
      </section>

      <section className="section dark center marble-bg">
        <div className="wrap" style={{ maxWidth: 820, marginInline: "auto" }}>
          <p className="eyebrow center">{t("about.vision")}</p>
          <p className="lead" style={{ fontSize: "clamp(20px,2.4vw,28px)", color: "var(--cream)", marginTop: 26 }}>{t("about.visionText")}</p>
          <p className="display" style={{ fontStyle: "italic", fontSize: "clamp(24px,3vw,38px)", color: "var(--brass-lite)", marginTop: 30 }}>“<span>{t("about.visionQuote")}</span>”</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap" style={{ maxWidth: 920, marginInline: "auto" }}>
          <p className="eyebrow">{t("about.activities")}</p>
          <div className="num-list" style={{ marginTop: 30 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Reveal className="num-item" key={i}><p>{t(`about.activity${i}`)}</p></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="wrap">
          <div className="center" style={{ marginBottom: 48 }}><p className="eyebrow center">{t("about.coreValues")}</p></div>
          <div className="val-grid">
            {[1, 2, 3, 4].map((i) => (
              <Reveal className="val-card" key={i} delay={((i - 1) % 4) as 0 | 1 | 2 | 3}>
                <div className="vt">{t(`about.cv${i}Title`)}</div>
                <div className="vd">{t(`about.cv${i}Desc`)}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="center" style={{ marginBottom: 48 }}><p className="eyebrow center">{t("about.assurances")}</p></div>
          <div className="ass-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Reveal className="ass" key={i} delay={(i % 2) as 0 | 1}>
                <CheckIcon /><span>{t(`about.assurance${i}`)}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark marble-bg">
        <div className="wrap heritage-teaser">
          <Reveal>
            <p className="eyebrow">{t("makrana.eyebrow")}</p>
            <h2 className="display" style={{ fontSize: "clamp(34px,5vw,62px)", margin: "18px 0 24px" }}>{t("makrana.title")}</h2>
            <p className="lead">{t("makrana.subtitle")}</p>
            <Link className="link-arrow" style={{ marginTop: 28, color: "var(--brass-lite)" }} href="/heritage"><span>{t("nav.heritage")}</span> →</Link>
          </Reveal>
          <Reveal className="ht-media" delay={1}><Stone label="White marble heritage work" src="/assets/handicraft-mausoleum.jpg" sizes="(max-width: 880px) 100vw, 40vw" /></Reveal>
        </div>
      </section>
    </>
  );
}
