/* Shared deterministic PRNG + color helpers for the procedural stone generators.
   Single source of truth for `stone.ts` (CSS gradients) and `marble-tex.ts` (canvas texture),
   which previously each carried a copy-pasted (and drifted) copy of these. */

/** Mulberry32 — fast, seeded, deterministic PRNG. Returns a function yielding floats in [0, 1). */
export function mulberry(a: number): () => number {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Converts a hex color (3/6/8 digits, with/without leading `#`) to an `rgba(...)` string with alpha `a`. */
export function hexA(hex: string, a: number): string {
  let h = hex.replace("#", "");
  if (h.length === 8) h = h.slice(0, 6);
  const r = parseInt(h.substr(0, 2), 16), g = parseInt(h.substr(2, 2), 16), b = parseInt(h.substr(4, 2), 16);
  return `rgba(${r},${g},${b},${a})`;
}
