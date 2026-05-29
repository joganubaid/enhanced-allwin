/* Locale primitives shared by server + client.
   English is served at the root (/about), Arabic under /ar (/ar/about). */
import { I18N, type Lang } from "./dict";

export const LOCALES: Lang[] = ["en", "ar"];
export const DEFAULT_LOCALE: Lang = "en";
export const RTL_LOCALES: Lang[] = ["ar"];

export function isLang(x: unknown): x is Lang {
  return x === "en" || x === "ar";
}

export function dirFor(lang: Lang): "rtl" | "ltr" {
  return RTL_LOCALES.includes(lang) ? "rtl" : "ltr";
}

/** OG/hreflang locale codes. */
export function ogLocale(lang: Lang): string {
  return lang === "ar" ? "ar_IN" : "en_IN";
}

/** Server-safe translator bound to a locale (mirrors the client context `t`). */
export function translator(lang: Lang) {
  const dict = I18N[lang] || I18N.en;
  return (key: string): string => dict[key] ?? I18N.en[key] ?? key;
}

/** Localize an internal path. EN stays at root; AR is prefixed with /ar.
    Accepts "/", "/about", etc. and is idempotent. */
export function localizeHref(lang: Lang, href: string): string {
  if (!href.startsWith("/")) return href; // external / hash / mailto / tel
  const clean = stripLocale(href);
  if (lang === "ar") return clean === "/" ? "/ar" : `/ar${clean}`;
  return clean;
}

/** Remove a leading /en or /ar segment, returning the bare path ("/", "/about"). */
export function stripLocale(path: string): string {
  const m = path.match(/^\/(en|ar)(\/.*)?$/);
  if (m) return m[2] || "/";
  return path;
}

/** Read the locale from a pathname (defaults to English). */
export function localeFromPath(path: string): Lang {
  return path === "/ar" || path.startsWith("/ar/") ? "ar" : "en";
}
