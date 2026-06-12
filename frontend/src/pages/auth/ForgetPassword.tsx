import { Link } from "react-router-dom";
import AuthPageShell from "../../components/auth/AuthShell";
import AuthPromoPanel from "../../components/auth/AuthPromoPanel";

export default function ForgetPassword() {
  return (
    <AuthPageShell rightPanel={<AuthPromoPanel />}>
      <div className="flex items-center gap-3 mb-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-indigo-600 text-white shadow-xl shadow-indigo-500/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm1 15h-2v-2h2Zm0-4h-2V7h2Z" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">
            PettyCash Pro
          </p>
        </div>
      </div>

      <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
        Forgot your password?
      </h1>
      <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
        No worries, we&#39;ll send you reset instructions.
      </p>

      <form className="mt-10 space-y-6">
        <label className="block text-sm font-medium text-slate-700">
          Email Address
          <div className="mt-3 relative">
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M2.25 6.75A2.25 2.25 0 0 1 4.5 4.5h15a2.25 2.25 0 0 1 2.25 2.25v10.5A2.25 2.25 0 0 1 19.5 19.5h-15A2.25 2.25 0 0 1 2.25 17.25V6.75Zm1.5.375v10.125c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75V7.125l-8.25 5.175L3.75 7.125Zm8.25 4.005L19.5 7.125H4.5l7.5 4.755Z" />
              </svg>
            </span>
            <input
              type="email"
              autoComplete="email"
              placeholder="name@company.com"
              className="mt-1 w-full rounded-3xl border border-slate-200 bg-slate-50 px-12 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>
        </label>

        <button
          type="submit"
          className="mt-2 inline-flex w-full items-center justify-center rounded-3xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-indigo-500/20 transition hover:bg-indigo-700"
        >
          Send Reset Link
        </button>
      </form>

      <div className="mt-8 text-sm text-slate-600">
        <Link
          to="/"
          className="inline-flex items-center font-semibold text-indigo-600 hover:text-indigo-700"
        >
          ← Back to sign in
        </Link>
      </div>

      <p className="mt-10 text-xs text-slate-400">
        © 2024 PettyCash Pro. All rights reserved.
      </p>
    </AuthPageShell>
  );
}
