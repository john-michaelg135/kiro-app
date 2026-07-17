"use client";

import { useEffect } from "react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  function handleRetry() {
    // Try React error boundary reset first
    reset();
  }

  function handleHardReload() {
    // Full browser reload — fixes network disconnect recovery
    window.location.reload();
  }

  return (
    <div className="text-center py-16">
      <div className="text-4xl mb-3">⚠️</div>
      <h2
        className="text-lg font-semibold"
        style={{ color: "rgb(var(--color-on-surface))" }}
      >
        Something went wrong
      </h2>
      <p
        className="text-sm mt-1 max-w-md mx-auto"
        style={{ color: "rgb(var(--color-on-surface-variant))" }}
      >
        {error.message || "Failed to load data. Check your connection and try again."}
      </p>
      <div className="flex items-center justify-center gap-3 mt-6">
        <button
          onClick={handleRetry}
          className="px-5 py-2.5 rounded-[var(--radius-full)] font-medium text-sm transition-all duration-200 hover:scale-105 active:scale-95"
          style={{ background: "rgb(var(--color-primary))", color: "rgb(var(--color-on-primary))" }}
        >
          Try again
        </button>
        <button
          onClick={handleHardReload}
          className="px-5 py-2.5 rounded-[var(--radius-full)] font-medium text-sm border transition-all duration-200 hover:scale-105 active:scale-95"
          style={{ borderColor: "rgb(var(--color-outline))", color: "rgb(var(--color-on-surface))" }}
        >
          Reload page
        </button>
      </div>
    </div>
  );
}
