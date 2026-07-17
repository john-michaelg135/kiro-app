import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      <header className="px-6 py-4 flex items-center justify-between max-w-6xl mx-auto w-full">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          JobTrack
        </h1>
        <nav className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-3 py-2"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            Sign up
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Track every application.
            <br />
            <span className="text-slate-500">Land the right role.</span>
          </h2>
          <p className="mt-6 text-lg text-slate-600 max-w-lg mx-auto">
            A simple, private tracker for your job search. Add applications,
            update statuses, and keep your hunt organized — all in one place.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto bg-slate-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors text-center"
            >
              Get started free
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto border border-slate-300 text-slate-700 px-8 py-3 rounded-lg font-medium hover:border-slate-400 hover:bg-slate-50 transition-colors text-center"
            >
              I have an account
            </Link>
          </div>
        </div>
      </main>

      <footer className="px-6 py-6 text-center text-sm text-slate-400">
        Built with Next.js & Supabase
      </footer>
    </div>
  );
}
