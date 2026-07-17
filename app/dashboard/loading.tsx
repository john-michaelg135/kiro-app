export default function DashboardLoading() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 w-40 bg-slate-200 rounded-lg animate-pulse" />
        <div className="h-10 w-36 bg-slate-200 rounded-lg animate-pulse" />
      </div>
      <div className="flex gap-2 mb-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-8 w-24 bg-slate-200 rounded-lg animate-pulse" />
        ))}
      </div>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="h-5 w-48 bg-slate-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-64 bg-slate-100 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}
