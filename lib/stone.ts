/* Allwin Marbles — procedural stone background generator (pure, ported from stone.js).
   Returns CSS `background` + `background-color` for a `.ph` tile, derived from its label.
   marble = seeded crossing veins; granite/quartz = speckle; mosaic = grid; dark = gold-veined ink. */

import { mulberry, hexA } from "@/lib/rng";

const ACCENT = "#6fa3cf"; // matches --stone-accent in globals.css (dark-tile glow)

type Pal = {
  lo: string; mid: string; hi: string; v1: string; v2: string;
  spark?: string; glow?: string;
};

const PAL: Record<string, Pal> = {
  white:  { lo: "#fcf9f3", mid: "#efe9db", hi: "#dbd2bb", v1: "#a99c7d", v2: "#cabfa4" },
  cream:  { lo: "#f9f2e2", mid: "#e9dcc1", hi: "#d3bd92", v1: "#a38655", v2: "#c6b184" },
  beige:  { lo: "#f4ebd8", mid: "#e0cfac", hi: "#c7b184", v1: "#9a7f50", v2: "#c2a878" },
  pink:   { lo: "#fcede8", mid: "#eccbc4", hi: "#d8a199", v1: "#bb6b72", v2: "#dd969c" },
  rose:   { lo: "#f9e7e1", mid: "#e6b9b0", hi: "#cd8c85", v1: "#a44b44", v2: "#c87970" },
  green:  { lo: "#eef3e8", mid: "#c3d2b6", hi: "#98b188", v1: "#4e7246", v2: "#86a376" },
  emerald:{ lo: "#e0efe4", mid: "#9cc1a8", hi: "#65a07e", v1: "#1c5f43", v2: "#4c8a68" },
  blue:   { lo: "#e9eff4", mid: "#bccdda", hi: "#96b2c6", v1: "#4a7488", v2: "#7f9fb4" },
  teal:   { lo: "#e3f0ee", mid: "#a7cdc8", hi: "#76aaa3", v1: "#236d65", v2: "#5a958d" },
  gold:   { lo: "#f9eccb", mid: "#e6cd8c", hi: "#caa64f", v1: "#977022", v2: "#c39b45" },
  grey:   { lo: "#efeeea", mid: "#cdccc7", hi: "#afada7", v1: "#726f68", v2: "#9c9a92" },
  brown:  { lo: "#f1e4d1", mid: "#d3b78f", hi: "#b48f66", v1: "#7a5632", v2: "#a37b50" },
  red:    { lo: "#f5dbd1", mid: "#dba593", hi: "#c17c68", v1: "#963b27", v2: "#b9644c" },
  black:  { lo: "#45454d", mid: "#26262c", hi: "#131316", v1: "#8c8c97", v2: "#55555f", spark: "#dcb55f" },
  dark:   { lo: "#322c22", mid: "#1d1812", hi: "#0e0b07", v1: "#cda455", v2: "#8c6a2c", glow: "#dcb55f" },
};

const MOSAIC_SETS = [
  ["#2f7a72", "#d6b664", "#bf5a3e", "#ece2cf", "#3a566b"],
  ["#b35b3f", "#e0c277", "#3d7068", "#f0e7d4", "#7a4a52"],
  ["#456f8f", "#cdb98e", "#8fae7a", "#f0ead9", "#c8954f"],
];

export function paletteFor(s: string): string {
  s = (s || "").toLowerCase();
  if (/galaxy|jet|midnight|\bblack\b/.test(s)) return "black";
  if (/golden|gold|divine/.test(s)) return "gold";
  if (/emerald/.test(s)) return "emerald";
  if (/green/.test(s)) return "green";
  if (/teal/.test(s)) return "teal";
  if (/blue|crystal|ocean|sky|aqua|pearl/.test(s)) return "blue";
  if (/ruby|imperial|\bred\b|cherry/.test(s)) return "red";
  if (/rose|pink/.test(s)) return "pink";
  if (/tan|coffee|brown|fantasy|cappuccino|adanga|walnut/.test(s)) return "brown";
  if (/silver|grey|gray|kumari|khumari/.test(s)) return "grey";
  if (/sand|beige|desert/.test(s)) return "beige";
  if (/ivory|cream/.test(s)) return "cream";
  return "white";
}

export function materialFor(s: string): string {
  s = (s || "").toLowerCase();
  if (/mosaic/.test(s)) return "mosaic";
  if (/quartz|sparkle/.test(s)) return "quartz";
  if (/granite|galaxy|alaska|angola|pearl|imperial red/.test(s)) return "granite";
  return "marble";
}

function lights(dark: boolean, p: Pal): string {
  if (dark) {
    return (
      `radial-gradient(95% 75% at 72% 22%, ${hexA(p.glow || ACCENT, 0.26)}, transparent 55%),` +
      `radial-gradient(80% 80% at 14% 92%, ${hexA(p.glow || ACCENT, 0.1)}, transparent 55%)`
    );
  }
  return (
    "radial-gradient(120% 95% at 22% 14%, rgba(255,255,255,.36), transparent 46%)," +
    "radial-gradient(120% 110% at 86% 94%, rgba(0,0,0,.17), transparent 55%)"
  );
}

function baseGrad(p: Pal): string {
  return `linear-gradient(135deg, ${p.lo} 0%, ${p.mid} 50%, ${p.hi} 100%)`;
}

function veins(p: Pal, rnd: () => number, dark: boolean): string[] {
  const cols = dark
    ? [hexA(p.v1, 0.5), hexA(p.v2, 0.42), hexA(p.glow || ACCENT, 0.3)]
    : [hexA(p.v1, 0.3), hexA(p.v2, 0.22), hexA(p.v1, 0.16)];
  const out: string[] = [];
  const angles = [108 + rnd() * 26, 146 + rnd() * 24, 58 + rnd() * 28];
  for (let i = 0; i < 3; i++) {
    const n = 2 + Math.floor(rnd() * 2);
    const stops: string[] = [];
    let pos = 6 + rnd() * 14;
    for (let j = 0; j < n; j++) {
      const w = (dark ? 0.5 : 0.4) + rnd() * 1.0;
      const c = cols[(i + j) % cols.length];
      stops.push(`transparent ${pos.toFixed(1)}%`);
      stops.push(`${c} ${(pos + w * 0.3).toFixed(1)}%`);
      stops.push(`transparent ${(pos + w).toFixed(1)}%`);
      pos += w + 13 + rnd() * 22;
      if (pos > 96) break;
    }
    out.push(`linear-gradient(${angles[i].toFixed(0)}deg, ${stops.join(", ")})`);
  }
  out.push(`radial-gradient(45% 60% at ${(18 + rnd() * 60).toFixed(0)}% ${(16 + rnd() * 64).toFixed(0)}%, ${hexA(p.lo, dark ? 0.35 : 0.55)}, transparent 62%)`);
  out.push(`radial-gradient(40% 50% at ${(20 + rnd() * 60).toFixed(0)}% ${(20 + rnd() * 60).toFixed(0)}%, ${hexA(p.hi, 0.35)}, transparent 60%)`);
  return out;
}

function speckle(p: Pal, rnd: () => number): string[] {
  const L = [
    `radial-gradient(${hexA(p.v1, 0.55)} 0 0.8px, transparent 1.3px) 0 0 / 5px 5px`,
    `radial-gradient(${hexA(p.v2, 0.5)} 0 1px, transparent 1.5px) 2px 3px / 8px 8px`,
    `radial-gradient(${hexA(p.lo, 0.6)} 0 0.7px, transparent 1.2px) 1px 4px / 6px 7px`,
    `radial-gradient(${hexA(p.hi, 0.45)} 0 1px, transparent 1.6px) 3px 1px / 10px 9px`,
  ];
  if (p.spark) {
    L.unshift(`radial-gradient(${hexA(p.spark, 0.95)} 0 1px, transparent 1.5px) 5px 2px / 14px 14px`);
    L.unshift("radial-gradient(#ffffff 0 0.7px, transparent 1.1px) 9px 7px / 17px 16px");
  }
  return L;
}

function sparkleLayers(p: Pal, rnd: () => number): string[] {
  return [
    "radial-gradient(#ffffff 0 1px, transparent 1.6px) 0 0 / 11px 11px",
    `radial-gradient(${hexA(p.spark || p.v2, 0.85)} 0 0.9px, transparent 1.4px) 4px 6px / 9px 9px`,
    `radial-gradient(${hexA(p.v1, 0.4)} 0 0.7px, transparent 1.2px) 2px 3px / 6px 6px`,
  ];
}

function mosaicBg(seed: number): string {
  const set = MOSAIC_SETS[seed % MOSAIC_SETS.length], S = 30, H = S / 2;
  const [c1, c2, c3, c4, c5] = set;
  return [
    `linear-gradient(45deg, ${c5} 25%, transparent 25% 75%, ${c5} 75%) ${H}px ${H}px / ${S}px ${S}px`,
    `linear-gradient(45deg, ${c3} 25%, transparent 25% 75%, ${c3} 75%) 0 0 / ${S}px ${S}px`,
    `repeating-linear-gradient(0deg, rgba(0,0,0,.16) 0 1.5px, transparent 1.5px ${H}px)`,
    `repeating-linear-gradient(90deg, rgba(0,0,0,.16) 0 1.5px, transparent 1.5px ${H}px)`,
    `linear-gradient(45deg, ${c2} 25%, transparent 25% 75%, ${c2} 75%) 0 0 / ${S}px ${S}px`,
    `linear-gradient(135deg, ${c4} 25%, transparent 25% 75%, ${c4} 75%) ${H}px 0 / ${S}px ${S}px`,
    `linear-gradient(${c1}, ${c1})`,
  ].join(", ");
}

function darkPalette(acc: string): Pal {
  return { lo: "#2e2920", mid: "#1b1712", hi: "#0f0c08", v1: acc, v2: acc, glow: acc };
}

function hash(str: string): number {
  let h = 0;
  str = str || "";
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function build(mat: string, palKey: string, seed: number, dark: boolean): { bg: string; color: string } {
  const p = dark ? darkPalette(ACCENT) : (PAL[palKey] || PAL.white);
  const rnd = mulberry(seed * 131 + 7);
  let bg: string;
  let color = p.mid;
  if (mat === "mosaic") { bg = mosaicBg(seed); color = "#cabfa4"; }
  else if (mat === "granite") bg = speckle(p, rnd).concat([lights(false, p), baseGrad(p)]).join(", ");
  else if (mat === "quartz") bg = sparkleLayers(p, rnd).concat([lights(false, p), baseGrad(p)]).join(", ");
  else bg = veins(p, rnd, dark).concat([lights(dark, p), baseGrad(p)]).join(", ");
  return { bg, color };
}

export interface StoneOpts {
  material?: string;
  pal?: string;
  dark?: boolean;
}

/** Returns { background, backgroundColor } for a `.ph` tile with the given label. */
export function stoneStyle(label: string, opts: StoneOpts = {}): { background: string; backgroundColor: string } {
  const mat = opts.material || materialFor(label);
  const palKey = opts.pal || paletteFor(label);
  const seed = (hash(label + mat) % 90) + 1;
  const out = build(mat, palKey, seed, !!opts.dark);
  return { background: out.bg, backgroundColor: out.color };
}

/** Cheap solid placeholder colour for a `.ph` tile — skips the expensive gradient build()
    entirely. Used when a real photo covers the tile (so only a flat fallback colour shows). */
export function stoneColor(label: string, opts: StoneOpts = {}): string {
  const mat = opts.material || materialFor(label);
  if (mat === "mosaic") return "#cabfa4";
  const p = opts.dark ? darkPalette(ACCENT) : (PAL[opts.pal || paletteFor(label)] || PAL.white);
  return p.mid;
}
