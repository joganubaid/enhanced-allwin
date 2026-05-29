"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="section center" style={{ minHeight: "82vh", display: "grid", placeItems: "center" }}>
      <div className="wrap" style={{ maxWidth: 560, marginInline: "auto" }}>
        <p className="eyebrow center">Something went wrong</p>
        <h1 className="display" style={{ fontSize: "clamp(40px,7vw,84px)", marginTop: 18 }}>
          An error occurred
        </h1>
        <p className="lead" style={{ marginTop: 18 }}>
          Please try again in a moment.
        </p>
        <button className="btn btn-primary" style={{ marginTop: 28 }} onClick={() => reset()}>
          Try again
        </button>
      </div>
    </main>
  );
}
