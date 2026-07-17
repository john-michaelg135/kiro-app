"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "rgb(var(--color-surface))", color: "rgb(var(--color-on-surface))" }}
    >
      <div className="text-center max-w-sm">
        <div className="text-5xl mb-4">⚠️</div>
        <h1 className="text-xl font-bold mb-2">Something went wrong</h1>
        <p className="text-sm mb-6" style={{ color: "rgb(var(--color-on-surface-variant))" }}>
          {error.message || "An unexpected error occurred. This might be a network issue."}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-[var(--radius-full)] font-medium text-sm transition-all duration-200"
            style={{ background: "rgb(var(--color-primary))", color: "rgb(var(--color-on-primary))" }}
          >
            Try again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 rounded-[var(--radius-full)] font-medium text-sm border transition-all duration-200"
            style={{ borderColor: "rgb(var(--color-outline))", color: "rgb(var(--color-on-surface))" }}
          >
            Reload page
          </button>
        </div>
      </div>
    </div>
  );
}
