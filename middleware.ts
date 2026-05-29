import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/* Locale routing:
   - English is served at the root (/about) but rendered by the /en/* tree
     via an internal rewrite — so existing URLs never change (no redirects).
   - Arabic lives under /ar/* and passes through.
   - Direct hits on /en/* are 308-redirected to the bare path to avoid
     duplicate-content (canonical English is the unprefixed URL).
   The active locale is also surfaced via the `x-locale` response header. */

// Paths that must never be locale-rewritten (metadata routes + static assets).
const PASSTHROUGH = new Set([
  "/opengraph-image",
  "/sitemap.xml",
  "/robots.txt",
  "/manifest.webmanifest",
  "/icon.svg",
  "/favicon.ico",
]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/assets") ||
    PASSTHROUGH.has(pathname) ||
    /\.[a-zA-Z0-9]+$/.test(pathname) // any file with an extension
  ) {
    return NextResponse.next();
  }

  // Arabic: pass through, tag the locale.
  if (pathname === "/ar" || pathname.startsWith("/ar/")) {
    const res = NextResponse.next();
    res.headers.set("x-locale", "ar");
    return res;
  }

  // Canonicalize explicit /en/* back to the bare path.
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/en/, "") || "/";
    return NextResponse.redirect(url, 308);
  }

  // Everything else = English at the root → rewrite to the /en/* tree.
  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  const res = NextResponse.rewrite(url);
  res.headers.set("x-locale", "en");
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
