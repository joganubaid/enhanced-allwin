"use client";

import {
  createContext, useCallback, useContext, useEffect, useRef, useState,
  type ReactNode, type CSSProperties, type TouchEvent as ReactTouchEvent,
} from "react";
import { Stone } from "./Stone";
import { CloseIcon, PrevIcon, NextIcon } from "./icons";
import { useI18n } from "@/lib/i18n";

export interface LightboxItem {
  label: string;
  material?: string;
  pal?: string;
  src?: string;
}

interface LightboxCtx {
  open: (items: LightboxItem[], idx: number) => void;
}

const Ctx = createContext<LightboxCtx | null>(null);

// minimum horizontal travel (px) for a swipe to register
const SWIPE_THRESHOLD = 40;

// Self-contained visually-hidden style for the SR-only announcement so it works
// even if a global `.sr-only` utility isn't present (CSS is owned elsewhere).
const SR_ONLY: CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};

export function useLightbox() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useLightbox must be used within LightboxProvider");
  return c;
}

export function LightboxProvider({ children }: { children: ReactNode }) {
  const { lang } = useI18n();
  const isRtl = lang === "ar";

  const [items, setItems] = useState<LightboxItem[]>([]);
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const openLb = useCallback((it: LightboxItem[], i: number) => {
    triggerRef.current = (document.activeElement as HTMLElement) ?? null;
    setItems(it);
    setIdx(i);
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);
  const go = useCallback(
    (d: number) => setIdx((p) => (items.length ? (p + d + items.length) % items.length : 0)),
    [items.length]
  );

  const hasMultiple = items.length > 1;

  useEffect(() => {
    if (!open) {
      triggerRef.current?.focus?.();
      return;
    }
    closeBtnRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { close(); return; }
      // Arrow navigation only when there's more than one image.
      // In RTL, ArrowLeft advances and ArrowRight goes back (reading order).
      if (hasMultiple && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
        const forward = isRtl ? e.key === "ArrowLeft" : e.key === "ArrowRight";
        go(forward ? 1 : -1);
        return;
      }
      if (e.key === "Tab") {
        const root = overlayRef.current;
        if (!root) return;
        const f = Array.from(root.querySelectorAll<HTMLElement>("button:not([disabled])"));
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, go, close, hasMultiple, isRtl]);

  const onTouchStart = useCallback((e: ReactTouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = e.changedTouches[0]?.clientX ?? null;
  }, []);

  const onTouchEnd = useCallback(
    (e: ReactTouchEvent<HTMLDivElement>) => {
      const start = touchStartXRef.current;
      touchStartXRef.current = null;
      if (start === null || !hasMultiple) return;
      const endX = e.changedTouches[0]?.clientX ?? start;
      const deltaX = endX - start;
      if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
      // Swiping left (deltaX < 0) advances in LTR, goes back in RTL.
      const forward = isRtl ? deltaX > 0 : deltaX < 0;
      go(forward ? 1 : -1);
    },
    [go, hasMultiple, isRtl]
  );

  const cur = items[idx];

  return (
    <Ctx.Provider value={{ open: openLb }}>
      {children}
      <div
        ref={overlayRef}
        className={`lightbox${open ? " open" : ""}`}
        role="dialog"
        aria-modal={open}
        aria-label={cur ? cur.label : "Image viewer"}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <button ref={closeBtnRef} className="lb-close" aria-label="Close" onClick={close}><CloseIcon /></button>
        {hasMultiple && (
          <>
            <button className="lb-nav lb-prev" aria-label="Previous" onClick={() => go(-1)}><PrevIcon /></button>
            <button className="lb-nav lb-next" aria-label="Next" onClick={() => go(1)}><NextIcon /></button>
          </>
        )}
        <div className="lightbox-inner" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          {cur && <Stone key={cur.src ?? idx} label={cur.label} material={cur.material} pal={cur.pal} src={cur.src} sizes="min(70vw, 760px)" priority />}
          <p className="lightbox-cap">{cur?.label}</p>
          {hasMultiple && (
            <p className="lightbox-count" aria-live="polite">
              <span aria-hidden="true">{idx + 1} / {items.length}</span>
              <span style={SR_ONLY}>{`Image ${idx + 1} of ${items.length}${cur ? ` — ${cur.label}` : ""}`}</span>
            </p>
          )}
        </div>
      </div>
    </Ctx.Provider>
  );
}
