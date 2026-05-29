"use client";

import { createContext, useContext, useCallback, useMemo, type ReactNode } from "react";
import { I18N, type Lang } from "./dict";
import { localizeHref } from "./locale";

interface I18nCtx {
  lang: Lang;
  t: (key: string) => string;
  /** Localize an internal path for the active locale (EN root, AR /ar). */
  lhref: (href: string) => string;
}

const I18nContext = createContext<I18nCtx | null>(null);

/** Route-driven i18n provider. The active language comes from the URL (the
    [lang] route segment), seeded server-side — so the very first paint is in
    the correct language and direction (no English→Arabic flash) and Arabic
    pages are independently server-rendered & crawlable. Switching language is
    a navigation (see Navbar), not client state. */
export function I18nProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const t = useCallback(
    (key: string) => {
      const d = I18N[lang] || I18N.en;
      return d[key] ?? I18N.en[key] ?? key;
    },
    [lang]
  );
  const lhref = useCallback((href: string) => localizeHref(lang, href), [lang]);
  const value = useMemo(() => ({ lang, t, lhref }), [lang, t, lhref]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
