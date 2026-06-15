import { Link } from "react-router-dom";

export default function NotFoundInner() {
  return (
    <div className="flex h-full items-center bg-white px-6 py-10 sm:px-12 lg:px-16">
      <div className="mx-auto w-full max-w-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">
          PettyCash Pro
        </p>
        <h1 className="mt-8 text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
          We couldn�t find the page you�re looking for. The link may be broken
          or the page may have moved.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-3xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-indigo-500/20 transition hover:bg-indigo-700"
          >
            Go back home
          </Link>
        </div>

        <div className="mt-12 rounded-4xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Tip
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Try checking the URL or navigating back to the dashboard from the
            home screen.
          </p>
        </div>
      </div>
    </div>
  );
}
