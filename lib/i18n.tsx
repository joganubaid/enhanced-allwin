"use client";

import {
  createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode,
} from "react";
import { I18N, type Lang } from "./dict";

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nCtx | null>(null);
const RTL: Lang[] = ["ar"];
const STORAGE_KEY = "allwin-lang";

function getInitial(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s === "en" || s === "ar") return s;
  } catch {}
  return "en";
}

function applyDir(l: Lang) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = l;
  document.documentElement.dir = RTL.includes(l) ? "rtl" : "ltr";
}

export function I18nProvider({
  children,
  initialLang,
}: {
  children: ReactNode;
  initialLang?: Lang;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang ?? "en");

  // Apply the persisted locale after mount (keeps SSR output = "en", no mismatch).
  useEffect(() => {
    const l = getInitial();
    setLangState(l);
    applyDir(l);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch {}
    try { document.cookie = "locale=" + l + "; path=/; max-age=31536000"; } catch {}
    applyDir(l);
  }, []);

  const t = useCallback(
    (key: string) => {
      const d = I18N[lang] || I18N.en;
      return d[key] ?? I18N.en[key] ?? key;
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
