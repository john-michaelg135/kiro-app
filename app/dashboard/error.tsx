"use client";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="text-center py-16">
      <div className="text-4xl mb-3">⚠️</div>
      <h2 className="text-lg font-semibold text-slate-900">Something went wrong</h2>
      <p className="text-sm text-slate-500 mt-1">{error.message}</p>
      <button
        onClick={reset}
        className="mt-4 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
