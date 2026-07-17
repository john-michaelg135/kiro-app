export default function DashboardLoading() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="h-7 w-40 rounded-lg" style={{ background: "rgb(var(--color-surface-container-high))" }} />
          <div className="h-4 w-24 mt-2 rounded-lg" style={{ background: "rgb(var(--color-surface-container-high))" }} />
        </div>
        <div className="h-10 w-36 rounded-full" style={{ background: "rgb(var(--color-surface-container-high))" }} />
      </div>
      <div className="flex gap-2 mb-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-8 w-20 rounded-full" style={{ background: "rgb(var(--color-surface-container-high))" }} />
        ))}
      </div>
      {[...Array(4)].map((_, i) => (
        <div key={i} className="p-5 rounded-[var(--radius-xl)] border" style={{ background: "rgb(var(--color-surface-container))", borderColor: "rgb(var(--color-outline-variant))" }}>
          <div className="h-5 w-48 rounded-lg mb-2" style={{ background: "rgb(var(--color-surface-container-high))" }} />
          <div className="h-4 w-64 rounded-lg" style={{ background: "rgb(var(--color-surface-container-high))" }} />
        </div>
      ))}
    </div>
  );
}
