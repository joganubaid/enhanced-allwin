import type { Config } from "tailwindcss";

// The design is driven entirely by hand-written CSS in app/globals.css + app/pages.css;
// no Tailwind utility classes or @tailwind directives are used. Kept minimal so PostCSS
// stays happy without shipping an unused shadcn token theme.
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: { extend: {} },
  plugins: [],
} satisfies Config;
