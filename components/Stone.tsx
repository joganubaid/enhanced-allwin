"use client";

import Image from "next/image";
import { useMemo } from "react";
import { stoneStyle, type StoneOpts } from "@/lib/stone";

interface StoneProps extends StoneOpts {
  label: string;
  className?: string;
  /** Real photo path (under /public). If omitted, the procedural marble texture is shown. */
  src?: string;
  sizes?: string;
  priority?: boolean;
}

/** A stone tile: shows a real photo when `src` is provided, otherwise a procedural
    marble/granite/quartz texture. The texture also acts as the placeholder while the photo loads. */
export function Stone({
  label,
  className = "",
  material,
  pal,
  dark,
  src,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 22vw",
  priority,
}: StoneProps) {
  const s = useMemo(() => stoneStyle(label, { material, pal, dark }), [label, material, pal, dark]);
  return (
    <div
      className={`ph stone ${className}`.trim()}
      style={{ background: s.background, backgroundColor: s.backgroundColor }}
    >
      {src && (
        <Image
          src={src}
          alt={label}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectFit: "cover" }}
        />
      )}
      <span className="gloss" />
    </div>
  );
}
