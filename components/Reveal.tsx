"use client";

import {
  createElement, useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode,
} from "react";

interface RevealProps {
  as?: ElementType;
  delay?: 1 | 2 | 3 | 4 | 0;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/** Fade-up-on-scroll wrapper (replaces the vanilla IntersectionObserver reveal). */
export function Reveal({ as = "div", delay = 0, className = "", style, children }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = ["reveal", delay ? `d${delay}` : "", shown ? "in" : "", className]
    .filter(Boolean)
    .join(" ");
  return createElement(as, { ref, className: cls, style }, children);
}
