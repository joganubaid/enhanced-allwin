"use client";

import Image from "next/image";
import { useMemo } from "react";
import { stoneStyle, stoneColor, type StoneOpts } from "@/lib/stone";

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
  // With a real photo the procedural gradient is hidden behind it, so skip the expensive
  // stoneStyle() build entirely and use a cheap solid placeholder colour. Reserve the full
  // procedural gradient for the no-photo fallback (where it's also the loading placeholder).
  const style = useMemo(
    () =>
      src
        ? { backgroundColor: stoneColor(label, { material, pal, dark }) }
        : stoneStyle(label, { material, pal, dark }),
    [src, label, material, pal, dark],
  );
  return (
    <div className={`ph stone ${className}`.trim()} style={style}>
      {src && (
        <Image
          src={src}
          alt={label}
          fill
          sizes={sizes}
          quality={62}
          priority={priority}
          style={{ objectFit: "cover" }}
        />
      )}
      <span className="gloss" />
    </div>
  );
}
