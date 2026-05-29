import Link from "next/link";
import { translator, localizeHref } from "@/lib/locale";
import type { Lang } from "@/lib/dict";
import { projects } from "@/lib/catalog";
import { Reveal } from "./Reveal";
import { LightboxTile } from "./LightboxTile";
import { pad } from "@/lib/format";

/* Server Component — static project copy rendered on the server; only the
   zoomable image tiles (LightboxTile) are client islands. */
export function ProjectsClient({ lang }: { lang: Lang }) {
  const t = translator(lang);

  const all = projects.flatMap((cat) =>
    cat.items.map((it) => ({ label: lang === "ar" ? it.ar : it.en, src: it.img }))
  );

  // Cumulative flat-index offset for the start of each category.
  const offsets = projects.reduce<number[]>((acc, cat, ci) => {
    acc[ci] = ci === 0 ? 0 : acc[ci - 1] + projects[ci - 1].items.length;
    return acc;
  }, []);

  return (
    <>
      <section className="page-hero marble-bg">
        <div className="wrap center" style={{ maxWidth: 860 }}>
          <p className="eyebrow center">{t("projects.eyebrow")}</p>
          <h1 className="display" style={{ marginTop: 20 }}>{t("projects.title")}</h1>
          <p className="lead mx-auto" style={{ marginTop: 24, maxWidth: "64ch" }}>{t("projects.subtitle")}</p>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          {projects.map((cat, ci) => (
            <div className="proj-cat" key={cat.id}>
              <Reveal className="proj-cat-head">
                <span className="idx">{pad(ci + 1)}</span>
                <h2 className="display">{t(cat.label)}</h2>
              </Reveal>
              <div className="proj-grid">
                {cat.items.map((it, i) => {
                  const name = lang === "ar" ? it.ar : it.en;
                  const desc = (lang === "ar" ? it.sar : it.sen) || it.sen;
                  const flatIdx = offsets[ci] + i;
                  return (
                    <Reveal
                      key={`${cat.id}-${name}`}
                      as="article"
                      delay={(i % 3) as 0 | 1 | 2}
                      className="card proj-card"
                    >
                      <LightboxTile
                        items={all}
                        index={flatIdx}
                        label={name}
                        src={it.img}
                        sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                        className="card-media img-hover"
                        style={{ cursor: "zoom-in", display: "block", width: "100%", padding: 0, border: "none", background: "none" }}
                      />
                      <div className="card-body">
                        <span className="tag">{t(cat.label)}</span>
                        <h3 className="card-title">{name}</h3>
                        <p className="desc">{desc}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section dark center">
        <div className="wrap" style={{ maxWidth: 680, marginInline: "auto" }}>
          <p className="eyebrow center">{t("home.ctaEyebrow")}</p>
          <h2 className="display" style={{ fontSize: "clamp(34px,5vw,64px)", marginTop: 18 }}>{t("home.ctaTitle")}</h2>
          <Link className="btn btn-primary" style={{ marginTop: 30 }} href={localizeHref(lang, "/contact")}><span>{t("home.ctaBtn")}</span> →</Link>
        </div>
      </section>
    </>
  );
}
