"use client";

import { useMemo } from "react";
import { stoneStyle, type StoneOpts } from "@/lib/stone";

interface StoneProps extends StoneOpts {
  label: string;
  className?: string;
}

/** Procedural marble/granite/quartz `.ph` tile (replaces the vanilla stone.js painter). */
export function Stone({ label, className = "", material, pal, dark }: StoneProps) {
  const s = useMemo(() => stoneStyle(label, { material, pal, dark }), [label, material, pal, dark]);
  return (
    <div
      className={`ph stone ${className}`.trim()}
      style={{ background: s.background, backgroundColor: s.backgroundColor }}
      aria-hidden="true"
    >
      <span className="gloss" />
    </div>
  );
}
