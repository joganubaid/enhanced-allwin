/* Procedural veined-marble texture painted to a <canvas> (ported from marble-tex.js).
   Used as a Three.js CanvasTexture map. Client-only (uses document/canvas). */

type Pal = { base: [string, string, string]; vein: string; veinHi: string; spec: string; dark?: boolean };

const PALS: Record<string, Pal> = {
  white:  { base: ["#fbfaf6", "#f1eee6", "#e4ded0"], vein: "#b9b09a", veinHi: "#ffffff", spec: "#cfc6b2" },
  cream:  { base: ["#f8f2e6", "#efe5cf", "#e2d3b5"], vein: "#b69a6c", veinHi: "#fff8ea", spec: "#cdb88f" },
  azure:  { base: ["#eef3f7", "#dfe9f0", "#cbdae6"], vein: "#3e6e96", veinHi: "#ffffff", spec: "#9fc0d6" },
  grey:   { base: ["#f1f0ec", "#e0dfd9", "#cbcac3"], vein: "#7d7a72", veinHi: "#ffffff", spec: "#b3b1a9" },
  gold:   { base: ["#faf1d8", "#f0dfae", "#e3c97f"], vein: "#a07e2c", veinHi: "#fff6dc", spec: "#d8bd6f" },
  green:  { base: ["#eef3e9", "#d8e3cd", "#bcceac"], vein: "#4e7246", veinHi: "#f3f8ec", spec: "#9ab487" },
  rose:   { base: ["#faeee9", "#f0d6cd", "#e0b3a8"], vein: "#a85c52", veinHi: "#fff3ee", spec: "#d49b8f" },
  black:  { base: ["#2b2d33", "#212229", "#16171c"], vein: "#cdb45f", veinHi: "#f4e6b8", spec: "#54555f", dark: true },
};

function mulberry(a: number): () => number {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function hexA(hex: string, a: number) {
  let h = hex.replace("#", ""); if (h.length === 8) h = h.slice(0, 6);
  const r = parseInt(h.substr(0, 2), 16), g = parseInt(h.substr(2, 2), 16), b = parseInt(h.substr(4, 2), 16);
  return `rgba(${r},${g},${b},${a})`;
}

type Pt = [number, number];
function veinPath(rnd: () => number, a: Pt, b: Pt, disp: number, depth: number, pts: Pt[]) {
  if (depth <= 0) { pts.push(b); return; }
  const mx = (a[0] + b[0]) / 2 + (rnd() - 0.5) * disp;
  const my = (a[1] + b[1]) / 2 + (rnd() - 0.5) * disp;
  veinPath(rnd, a, [mx, my], disp * 0.55, depth - 1, pts);
  veinPath(rnd, [mx, my], b, disp * 0.55, depth - 1, pts);
}
function strokePts(ctx: CanvasRenderingContext2D, pts: Pt[], color: string, w: number) {
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) {
    const xc = (pts[i - 1][0] + pts[i][0]) / 2, yc = (pts[i - 1][1] + pts[i][1]) / 2;
    ctx.quadraticCurveTo(pts[i - 1][0], pts[i - 1][1], xc, yc);
  }
  ctx.lineCap = "round"; ctx.lineJoin = "round";
  ctx.strokeStyle = color; ctx.lineWidth = w; ctx.stroke();
}
function drawVein(ctx: CanvasRenderingContext2D, rnd: () => number, W: number, H: number, p: Pal, opts: { disp?: number; maxW?: number }) {
  const edge = rnd();
  let a: Pt, b: Pt;
  if (edge < 0.5) { a = [-40, rnd() * H]; b = [W + 40, rnd() * H]; }
  else { a = [rnd() * W, -40]; b = [rnd() * W, H + 40]; }
  const pts: Pt[] = [a];
  veinPath(rnd, a, b, opts.disp || 220, 6, pts);
  const base = 1 + rnd() * (opts.maxW || 5);
  strokePts(ctx, pts, hexA(p.vein, p.dark ? 0.18 : 0.1), base * 4.5);
  strokePts(ctx, pts, hexA(p.vein, p.dark ? 0.5 : 0.28), base * 1.8);
  strokePts(ctx, pts, hexA(p.vein, p.dark ? 0.85 : 0.5), base * 0.7);
  ctx.globalCompositeOperation = "lighter";
  strokePts(ctx, pts.map((q) => [q[0] + 1.5, q[1] - 1.5] as Pt), hexA(p.veinHi, p.dark ? 0.4 : 0.22), base * 0.5);
  ctx.globalCompositeOperation = "source-over";
  const branches = 1 + Math.floor(rnd() * 3);
  for (let k = 0; k < branches; k++) {
    const si = 2 + Math.floor(rnd() * (pts.length - 3));
    const sp = pts[si];
    const dir = [(rnd() - 0.5) * W * 0.5, (rnd() - 0.5) * H * 0.5];
    const bp: Pt = [sp[0] + dir[0], sp[1] + dir[1]];
    const hp: Pt[] = [sp];
    veinPath(rnd, sp, bp, 90, 4, hp);
    strokePts(ctx, hp, hexA(p.vein, p.dark ? 0.4 : 0.2), 0.6 + rnd() * 1.2);
  }
}

export function makeMarbleCanvas(opts: { size?: number; tall?: boolean; pal?: string; seed?: number }): HTMLCanvasElement {
  const W = opts.size || 1024;
  const H = opts.tall ? Math.round(W * 1.5) : W;
  const p = PALS[opts.pal || "white"] || PALS.white;
  const rnd = mulberry((opts.seed || 1) * 131 + 7);

  const cv = document.createElement("canvas");
  cv.width = W; cv.height = H;
  const ctx = cv.getContext("2d")!;

  const ang = rnd() * Math.PI;
  const g = ctx.createLinearGradient(0, 0, Math.cos(ang) * W, Math.sin(ang) * H);
  g.addColorStop(0, p.base[0]); g.addColorStop(0.5, p.base[1]); g.addColorStop(1, p.base[2]);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

  const clouds = 5 + Math.floor(rnd() * 4);
  for (let c = 0; c < clouds; c++) {
    const cx = rnd() * W, cy = rnd() * H, cr = (0.25 + rnd() * 0.5) * W;
    const rg = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr);
    const tone = rnd() > 0.5 ? p.base[0] : p.base[2];
    rg.addColorStop(0, hexA(tone, p.dark ? 0.5 : 0.7));
    rg.addColorStop(1, hexA(tone, 0));
    ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H);
  }

  const nMajor = 2 + Math.floor(rnd() * 3);
  for (let i = 0; i < nMajor; i++) drawVein(ctx, rnd, W, H, p, { disp: 200 + rnd() * 160, maxW: 6 });
  const nMinor = 5 + Math.floor(rnd() * 6);
  for (let j = 0; j < nMinor; j++) drawVein(ctx, rnd, W, H, p, { disp: 120 + rnd() * 120, maxW: 1.6 });

  const dots = Math.floor((W * H) / 1400);
  for (let d = 0; d < dots; d++) {
    const x = rnd() * W, y = rnd() * H, rr = rnd() * 1.1;
    const light = rnd() > 0.5;
    ctx.fillStyle = hexA(light ? p.spec : p.vein, 0.04 + rnd() * 0.1);
    ctx.beginPath(); ctx.arc(x, y, rr, 0, 6.283); ctx.fill();
  }

  const vg = ctx.createRadialGradient(W * 0.5, H * 0.4, W * 0.2, W * 0.5, H * 0.5, W * 0.85);
  vg.addColorStop(0, "rgba(255,255,255,0)");
  vg.addColorStop(1, p.dark ? "rgba(0,0,0,0.35)" : "rgba(60,52,40,0.10)");
  ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);

  return cv;
}
