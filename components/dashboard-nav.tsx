"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function DashboardNav({ email }: { email: string }) {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold text-slate-900 tracking-tight">
          JobTrack
        </h1>
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="hidden sm:inline text-sm text-slate-500 truncate max-w-[200px]">
            {email}
          </span>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-3 py-1.5 rounded-md hover:bg-slate-100"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
