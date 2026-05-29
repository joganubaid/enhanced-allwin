"use client";

import {
  createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode,
} from "react";
import { Stone } from "./Stone";
import { CloseIcon, PrevIcon, NextIcon } from "./icons";

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

export function useLightbox() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useLightbox must be used within LightboxProvider");
  return c;
}

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<LightboxItem[]>([]);
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

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

  useEffect(() => {
    if (!open) {
      triggerRef.current?.focus?.();
      return;
    }
    closeBtnRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { close(); return; }
      if (e.key === "ArrowRight") { go(1); return; }
      if (e.key === "ArrowLeft") { go(-1); return; }
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
  }, [open, go, close]);

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
        <button className="lb-nav lb-prev" aria-label="Previous" onClick={() => go(-1)}><PrevIcon /></button>
        <button className="lb-nav lb-next" aria-label="Next" onClick={() => go(1)}><NextIcon /></button>
        <div className="lightbox-inner">
          {cur && <Stone key={cur.src ?? idx} label={cur.label} material={cur.material} pal={cur.pal} src={cur.src} sizes="min(70vw, 760px)" priority />}
          <p className="lightbox-cap">{cur?.label}</p>
        </div>
      </div>
    </Ctx.Provider>
  );
}
