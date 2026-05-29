"use client";

import { type CSSProperties, type ReactNode } from "react";
import { Stone } from "./Stone";
import { useLightbox, type LightboxItem } from "./Lightbox";

/* Small client island: a zoomable image tile that opens the lightbox.
   Lets the surrounding page body stay a Server Component — only this button
   (and the Stone image) ship as client JS. */
export function LightboxTile({
  items,
  index,
  label,
  src,
  sizes,
  className = "",
  style,
  children,
}: {
  items: LightboxItem[];
  index: number;
  label: string;
  src?: string;
  sizes?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const lb = useLightbox();
  return (
    <button className={className} style={style} onClick={() => lb.open(items, index)} aria-label={label}>
      <Stone label={label} src={src} sizes={sizes} />
      {children}
    </button>
  );
}
