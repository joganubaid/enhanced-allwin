/* Inline SVG icons (ported from the design's chrome.js ICON set). */
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

export const PhoneIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden="true" focusable="false" {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
export const PinIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true" focusable="false" {...p}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
export const MailIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true" focusable="false" {...p}>
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" />
  </svg>
);
export const WaIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.8 14.03c-.24.68-1.42 1.31-1.95 1.36-.5.05-1.13.27-3.82-.8-3.21-1.27-5.25-4.56-5.41-4.77-.16-.21-1.3-1.72-1.3-3.28 0-1.56.82-2.33 1.11-2.65.29-.32.63-.4.84-.4.21 0 .42 0 .6.01.19.01.45-.07.7.54.24.61.84 2.11.91 2.27.07.16.12.34.02.55-.1.21-.15.34-.29.52-.15.18-.31.4-.44.54-.15.15-.3.31-.13.61.17.3.77 1.27 1.65 2.06 1.13 1.01 2.09 1.32 2.39 1.47.3.15.47.13.64-.08.17-.21.74-.86.94-1.16.2-.3.4-.25.67-.15.27.1 1.71.81 2 .96.29.15.49.22.56.34.07.12.07.7-.17 1.38z" />
  </svg>
);
export const TgIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M21.94 4.36 18.6 19.8c-.25 1.1-.9 1.38-1.83.86l-5.05-3.72-2.44 2.35c-.27.27-.5.5-1.02.5l.36-5.14L17 5.6c.4-.36-.09-.56-.62-.2L6.07 12.1l-4.98-1.56c-1.08-.34-1.1-1.08.23-1.6L20.55 2.8c.9-.33 1.69.2 1.39 1.56z" />
  </svg>
);
export const UpIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" focusable="false" {...p}><path d="m18 15-6-6-6 6" /></svg>
);
export const CloseIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true" focusable="false" {...p}><path d="M18 6 6 18M6 6l12 12" /></svg>
);
export const PrevIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true" focusable="false" {...p}><path d="m15 18-6-6 6-6" /></svg>
);
export const NextIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true" focusable="false" {...p}><path d="m9 18 6-6-6-6" /></svg>
);
export const CheckIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true" focusable="false" {...p}><path d="M20 6 9 17l-5-5" /></svg>
);
