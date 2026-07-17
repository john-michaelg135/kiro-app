import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "rgb(var(--color-surface))", color: "rgb(var(--color-on-surface))" }}
    >
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-2" style={{ color: "rgb(var(--color-primary))" }}>404</h1>
        <h2 className="text-xl font-semibold mb-2">Page not found</h2>
        <p className="text-sm mb-6" style={{ color: "rgb(var(--color-on-surface-variant))" }}>
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-flex px-5 py-2.5 rounded-[var(--radius-full)] font-medium text-sm"
          style={{ background: "rgb(var(--color-primary))", color: "rgb(var(--color-on-primary))" }}
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
