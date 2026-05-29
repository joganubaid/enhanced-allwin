"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { products } from "@/lib/catalog";
import { Stone } from "./Stone";
import { Reveal } from "./Reveal";
import { useLightbox } from "./Lightbox";

const pad = (n: number) => String(n).padStart(2, "0");

export function ProductsClient() {
  const { t, lang } = useI18n();
  const lb = useLightbox();
  const [active, setActive] = useState(0);

  const cat = products[active];
  const items = cat.items.map((it) => ({
    name: lang === "ar" ? it.ar : it.en,
    spec: (lang === "ar" ? it.sar : it.sen) || it.sen,
  }));
  const lbItems = items.map((i) => ({ label: i.name }));

  return (
    <>
      <section className="page-hero marble-bg">
        <div className="wrap center" style={{ maxWidth: 820 }}>
          <p className="eyebrow center">{t("products.eyebrow")}</p>
          <h1 className="display" style={{ marginTop: 20 }}>{t("products.title")}</h1>
          <p className="lead mx-auto" style={{ marginTop: 24, maxWidth: "62ch" }}>{t("products.subtitle")}</p>
        </div>
      </section>

      <div className="tabs-wrap">
        <div className="tabs">
          {products.map((c, i) => (
            <button key={c.id} className={`tab${i === active ? " active" : ""}`} onClick={() => setActive(i)}>
              {t(c.label)}
            </button>
          ))}
        </div>
      </div>

      <section className="section tight">
        <div className="wrap">
          <div className="cat-meta">
            <h2 className="display">{t(cat.label)}</h2>
            <span className="count">{cat.items.length} {t("products.countLabel")}</span>
          </div>
          <div className="prod-grid">
            {items.map((it, i) => (
              <Reveal
                key={`${cat.id}-${it.name}`}
                as="article"
                delay={(i % 4) as 0 | 1 | 2 | 3}
                className="card prod-card"
              >
                <button
                  className="card-media img-hover"
                  style={{ position: "relative", cursor: "zoom-in", display: "block", width: "100%", padding: 0, border: "none", background: "none" }}
                  onClick={() => lb.open(lbItems, i)}
                  aria-label={it.name}
                >
                  <Stone label={it.name} />
                  <span className="num">{pad(i + 1)}</span>
                </button>
                <div className="card-body">
                  <h3 className="card-title">{it.name}</h3>
                  <p className="card-spec">{it.spec}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
