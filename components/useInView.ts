"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

type Cb = (inView: boolean) => void;

/**
 * Module-level shared IntersectionObserver. One observer instance is created per
 * distinct options signature, backed by a Map of element → callback, so every
 * Reveal / Counter on the page reuses a single observer instead of allocating
 * its own.
 */
const registries = new Map<string, { io: IntersectionObserver; cbs: Map<Element, Cb> }>();

function keyFor(options: IntersectionObserverInit) {
  return `${options.threshold ?? 0}|${options.rootMargin ?? ""}`;
}

function getRegistry(options: IntersectionObserverInit) {
  const key = keyFor(options);
  let reg = registries.get(key);
  if (!reg) {
    const cbs = new Map<Element, Cb>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        cbs.get(e.target)?.(e.isIntersecting);
      });
    }, options);
    reg = { io, cbs };
    registries.set(key, reg);
  }
  return reg;
}

function observe(el: Element, cb: Cb, options: IntersectionObserverInit) {
  const reg = getRegistry(options);
  reg.cbs.set(el, cb);
  reg.io.observe(el);
}

function unobserve(el: Element, options: IntersectionObserverInit) {
  const reg = registries.get(keyFor(options));
  if (!reg) return;
  reg.cbs.delete(el);
  reg.io.unobserve(el);
}

/**
 * Reveals once: returns `inView: true` after the element first scrolls into
 * view, then stops observing it (preserving the original unobserve-after-first
 * behavior). If IntersectionObserver is unavailable, the element is treated as
 * visible immediately so content never gets stuck hidden.
 *
 * `onReveal` is invoked once, on first reveal.
 */
export function useInView<T extends HTMLElement>(
  options: IntersectionObserverInit = {},
  onReveal?: () => void
): { ref: RefObject<T | null>; inView: boolean } {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  // Keep the latest callback without re-subscribing the observer.
  const onRevealRef = useRef(onReveal);
  onRevealRef.current = onReveal;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      onRevealRef.current?.();
      return;
    }

    const cb: Cb = (visible) => {
      if (!visible) return;
      setInView(true);
      onRevealRef.current?.();
      unobserve(el, options);
    };
    observe(el, cb, options);
    return () => unobserve(el, options);
    // The caller passes a stable literal `options`; subscribe once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}
