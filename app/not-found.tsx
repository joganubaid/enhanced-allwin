import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section center" style={{ minHeight: "82vh", display: "grid", placeItems: "center" }}>
      <div className="wrap" style={{ maxWidth: 560, marginInline: "auto" }}>
        <p className="eyebrow center">Error 404</p>
        <h1 className="display" style={{ fontSize: "clamp(48px,9vw,110px)", marginTop: 18 }}>
          Page not found
        </h1>
        <p className="lead" style={{ marginTop: 18 }}>
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
        </p>
        <Link className="btn btn-primary" style={{ marginTop: 28 }} href="/">
          Back to home →
        </Link>
      </div>
    </main>
  );
}
