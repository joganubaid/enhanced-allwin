"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/config";
import { WaIcon, TgIcon, UpIcon } from "./icons";

export function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="floaters">
      <a className="floater wa" href={siteConfig.social.whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <WaIcon />
      </a>
      <a className="floater tg" href={siteConfig.social.telegramLink} target="_blank" rel="noopener noreferrer" aria-label="Telegram">
        <TgIcon />
      </a>
      <button
        className={`floater top${showTop ? " show" : ""}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <UpIcon />
      </button>
    </div>
  );
}
