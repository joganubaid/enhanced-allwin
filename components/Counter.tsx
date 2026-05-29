"use client";

import { useState } from "react";
import { useInView } from "./useInView";

/** Counts up to `to` once scrolled into view. */
export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);

  const { ref } = useInView<HTMLSpanElement>({ threshold: 0.5 }, () => {
    const dur = 1400;
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });

  return <span ref={ref}>{val}{suffix}</span>;
}
