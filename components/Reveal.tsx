"use client";

import {
  createElement, useEffect, useState, type CSSProperties, type ElementType, type ReactNode,
} from "react";
import { useInView } from "./useInView";

interface RevealProps {
  as?: ElementType;
  delay?: 1 | 2 | 3 | 4 | 0;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/** Fade-up-on-scroll wrapper (replaces the vanilla IntersectionObserver reveal). */
export function Reveal({ as = "div", delay = 0, className = "", style, children }: RevealProps) {
  // Progressive enhancement: render content fully visible on the server and
  // before hydration. Only apply the hidden `reveal` (opacity:0) state once we
  // are mounted on the client, so content is never stuck hidden if JS fails.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { ref, inView } = useInView<HTMLElement>({
    threshold: 0.12,
    rootMargin: "0px 0px -8% 0px",
  });

  const cls = [
    mounted ? "reveal" : "",
    mounted && delay ? `d${delay}` : "",
    inView ? "in" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return createElement(as, { ref, className: cls, style }, children);
}
