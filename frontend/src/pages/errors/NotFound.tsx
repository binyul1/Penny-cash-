import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-900">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex items-center bg-white px-6 py-10 sm:px-12 lg:px-16">
          <div className="mx-auto w-full max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">
              PettyCash Pro
            </p>
            <h1 className="mt-8 text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl">
              Page not found
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              We couldn�t find the page you�re looking for. The link may be broken or the page may have moved.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-3xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-indigo-500/20 transition hover:bg-indigo-700"
              >
                Go back home
              </Link>
              <Link
                to="/forget-password"
                className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
              >
                Reset password
              </Link>
            </div>

            <div className="mt-12 rounded-4xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Tip
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Try checking the URL or navigating back to the dashboard from the home screen.
              </p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-linear-to-br from-indigo-700 via-blue-700 to-violet-700 text-white">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_28%)]" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="relative flex h-full items-center justify-center px-6 py-10 sm:px-12">
            <div className="max-w-lg">
              <span className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
                Secure & Reliable
              </span>
              <h2 className="mt-8 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Your finances are still protected.
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/80 sm:text-base">
                PettyCash Pro keeps your data safe while you find the right page. Return to the home screen to continue managing expenses and approvals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
