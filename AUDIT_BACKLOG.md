# Enhanced-Allwin Prioritized Backlog

_67 verified-real improvements from an 81-agent audit (8 dimensions → adversarial verification → synthesis). Items deduplicated and merged._

---

## High impact — do regardless of effort

1. **Skip link + single `<main id="main">` landmark** — `app/layout.tsx`. WCAG 2.4.1 (Level A): keyboard/SR users must tab the whole nav on every page. Add off-screen `.skip-link` as first child of `<body>`, move `<main id="main">` into layout.
2. **Global `:focus-visible` ring for all controls** — `app/globals.css`. The `button{border:none}` reset + form-only focus styles mean nav links, tabs, gallery tiles, lightbox & FAB buttons show no keyboard focus. Add `:focus-visible{outline:2px solid var(--brass);outline-offset:2px}` + a cream variant for dark surfaces.
3. **Responsive lightbox sizing** — `app/globals.css`. Fixed 760px square with `object-fit:cover` crops photos and stays ~273px wide on a 390px phone. Switch to `max-width:min(92vw,760px); max-height:78vh; object-fit:contain` + a `≤768px` block.
4. **Founder portrait is a procedural swatch, not a photo** — `components/AboutClient.tsx`. The one `<Stone>` with no `src` on the trust page reads as broken. Add `public/assets/founder.jpg` (or a real workshop/quarry photo) and pass `src`.
5. **Homepage has no reliable H1** — `components/HomeClient.tsx` / `Showroom.tsx`. The only H1 is opacity-animated decorative overlay text. Add an always-present `<h1>` to main content; demote the showroom title.

---

## Quick wins — small effort, good payoff

### Performance
- **`next.config.js` images block** — no `images` config exists. Add `formats:['image/avif','image/webp']`, tuned `deviceSizes`/`imageSizes` (incl. ~96–128px swatches), long `minimumCacheTTL`.
- **Replace render-blocking Google Fonts `@import`** (`globals.css:5`) with `next/font/google` — self-hosts, drops the unused **Amiri** font every EN visitor downloads.
- **`quality={62}` on the Stone `<Image>`** — decorative textures don't need q75.

### SEO / Meta
- **OG / Twitter share image** — none exists; `summary_large_image` is empty so WhatsApp/Telegram shares (the primary CTA) have no preview. Drop `app/opengraph-image.jpg`.
- **OG image + twitter block in `generatePageMetadata`** (`lib/metadata.ts`) — 5 interior pages ship with none.
- **Complete LocalBusiness JSON-LD** — add image/logo, geo (coords already in config), Kerala branch, maps in `sameAs`.
- **Fix sitemap `lastModified`** (hardcoded date) and **`og:locale`** (`en_US` → `en_IN`).

### Accessibility
- **Icons** — default `aria-hidden="true"` + `focusable="false"` in `components/icons.tsx`.
- **Lightbox** — `aria-live` caption "Image N of M".
- **Lang toggle** — `aria-label` + `aria-pressed` (`Navbar.tsx`).
- **Form success** — `role="status"` + move focus to heading (`ContactForm.tsx`).

### UX polish
- **Hide dead lightbox arrows / bind keys only when `items.length>1`**.
- **RTL-mirror the lightbox** (logical `inset-inline`, swap arrow keys in Arabic).
- **Reveal progressive-enhancement** — content is `opacity:0` until JS hydrates.
- **Touch `:active` feedback + `@media(hover)` guards** for gallery tiles.
- **Replace contact-form `alert()` with inline `role="alert"` banner**.

### Mobile-responsive
- **44px tap targets** for `.tab` bar.
- **Safe-area insets** for floating buttons (`env(safe-area-inset-bottom)`).
- **2-up mobile columns** for `.cat-grid`/`.prod-grid` (they collapse to 1 sparse column).
- **Media-conditional `theme-color`** (single dark value clashes with light pages).

### Content-data
- **Fix mismatched spec copy** — "Alaska Pink Granite — Icy blue tones", "Black Cultured Marble — Rich red", etc.
- **Rename "Calcutta Royal Cultured" → "Calacatta"** (contradicts its own Arabic spec).
- **Stop projects reusing handicraft product photos** — repoint 5 projects to the unused `project-*` assets already shipped.

### Code-quality
- **Drop unused `homeCategories.n`** (`lib/catalog.ts`).
- **Hoist duplicated `pad()`** → `lib/format.ts`.
- **Dedup `mulberry`/`hexA`** across `stone.ts`/`marble-tex.ts` (already drifted — `#efehe8` typo).
- **Fix ProjectsClient render-time `running++` mutation** (derive index from offsets).
- **Shared `useScrollLock`** (Lightbox + Navbar both clobber body overflow).

### Security-robustness (`app/api/contact/route.ts` unless noted)
- **Validate JSON body field types/lengths** — non-string fields currently 500.
- **Escape `&`, strip CR/LF from subject** — header-injection / `sanitizeInput` gap.
- **Wrap Redis rate-limit in try/catch + in-memory fallback** — Upstash outage 500s the whole form.
- **Harden Resend** — strip CR/LF from `replyTo`, stop leaking `emailId` to client, log failures.
- **Validate the `locale` cookie** in `middleware.ts`.

---

## Nice to have — real but lower payoff / larger effort
- Pre-compress oversized source JPEGs (`marble-makrana-albeta.jpg` 1.28 MB et al.).
- CSP header (Report-Only first).
- Broaden reduced-motion coverage (Counter rAF, CSS transforms).
- Lightbox counter + swipe + key/Esc hint; bottom arrow bar on phones.
- Contact form `aria-describedby`/`aria-invalid` + focus first invalid.
- Descriptive alt text for galleries (a11y + image SEO).
- Heritage `.type-card` single-column on phones.
- Showroom mobile downgrade (shorter track, capped pixelRatio/shadows/slabs).
- Server-Component static chrome (needs server-side `t()`).
- Hreflang + locale-prefixed routes (Arabic invisible to search).
- Arabic English-LTR flash on load (seed lang/dir server-side).
- Typed Three.js / type-checked i18n keys.
- Product / ItemList JSON-LD.
- Catalog gaps: cultured/mosaic/quartz reuse generic photos; 56 shipped assets unreferenced; "Slabs & Natural Stone" category advertised but missing.

---

## ⭐ Do these 5 first
1. **Skip link + `<main id="main">`** — WCAG Level A, every page, tiny.
2. **Global `:focus-visible` ring** — site-wide keyboard a11y, one CSS rule.
3. **Responsive lightbox sizing** — unblocks the core gallery interaction on mobile.
4. **`next/image` config + OG share image + `next/font`** — faster images, working social previews, no render-blocking fonts.
5. **Founder photo** — removes a visibly broken element on the brand's trust page.
