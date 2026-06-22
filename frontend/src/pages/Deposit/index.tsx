import type { ReactNode } from "react";
import History from "../../components/Deposit/History";
import { useCashManagement } from "../../lib/hook/cash-management-hook";
import CashManagementProvider from "../../lib/provider/CashManagementProvider";

function ActionButton({
  label,
  tone,
  icon,
  onClick,
}: Readonly<{
  label: string;
  tone: string;
  icon: ReactNode;
  onClick: () => void;
}>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-sm ${tone}`}
    >
      <span className="flex items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-white/15">
          {icon}
        </span>
        <span>{label}</span>
      </span>
      <span className="text-lg leading-none">›</span>
    </button>
  );
}

export default function CashManagementPage() {
  return (
    <CashManagementProvider>
      <CashManagementView />
    </CashManagementProvider>
  );
}

function CashManagementView() {
  const {
    cashBalance,
    isBalanceLoading,
    activeAction,
    amount,
    description,
    isSubmitting,
    formError,
    formSuccess,
    openForm,
    closeForm,
    setAmount,
    setDescription,
    submitMovement,
  } = useCashManagement();

  return (
    <div className="min-h-full space-y-6 rounded-4xl bg-slate-50 p-1 sm:p-0">
      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.8fr)]">
        <div className="relative overflow-hidden rounded-4xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-indigo-50 blur-2xl" />
          <div className="relative max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Current Fund Balance
            </p>
            <div className="mt-3 flex flex-wrap items-end gap-x-4 gap-y-2">
              <h1 className="text-4xl font-semibold tracking-tight text-indigo-700 sm:text-5xl">
                {isBalanceLoading || cashBalance === null
                  ? "Loading..."
                  : new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(cashBalance)}
              </h1>
            </div>
          </div>
        </div>

        <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-medium text-slate-700">Quick Actions</p>
          <div className="mt-4 space-y-3">
            <ActionButton
              label="Top-up Balance"
              tone="border-indigo-600 bg-indigo-600 text-white shadow-xl shadow-indigo-500/20"
              onClick={() => openForm("deposit")}
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="6" width="18" height="12" rx="2" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12h8M11 9l-3 3 3 3"
                  />
                </svg>
              }
            />
            <ActionButton
              label="Withdraw"
              tone="border-slate-200 bg-white text-slate-700"
              onClick={() => openForm("withdraw")}
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4"
                  stroke="currentColor"
                  strokeWidth="1.9"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 20h16M7 16V8m0 0L4 11m3-3 3 3M12 16V4m0 0-3 3m3-3 3 3M17 16V10m0 0-3 3m3-3 3 3"
                  />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {activeAction ? (
        <section className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                {activeAction === "deposit"
                  ? "Top-up Balance"
                  : "Withdraw Balance"}
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                {activeAction === "deposit"
                  ? "Add cash to the current balance"
                  : "Remove cash from the current balance"}
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Enter the amount and a short description, then submit to update
                the ledger.
              </p>
            </div>

            <button
              type="button"
              onClick={closeForm}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
            >
              Close
            </button>
          </div>

          <form
            className="mt-6 grid gap-4 md:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)]"
            onSubmit={submitMovement}
          >
            <label className="block text-sm font-medium text-slate-700">
              Amount
              <input
                type="number"
                min="1"
                step="0.01"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="Enter amount"
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                required
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Description
              <input
                type="text"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Add a note for this transaction"
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                maxLength={200}
              />
            </label>

            <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                {formError ? (
                  <p className="text-sm font-medium text-rose-600">
                    {formError}
                  </p>
                ) : null}
                {formSuccess ? (
                  <p className="text-sm font-medium text-emerald-600">
                    {formSuccess}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center justify-center rounded-3xl px-6 py-3 text-sm font-semibold text-white shadow-xl transition ${
                  activeAction === "deposit"
                    ? "bg-indigo-600 shadow-indigo-500/20 hover:bg-indigo-700"
                    : "bg-slate-900 shadow-slate-500/20 hover:bg-slate-800"
                } disabled:cursor-not-allowed disabled:opacity-70`}
              >
                {isSubmitting
                  ? "Saving..."
                  : activeAction === "deposit"
                    ? "Top-up Balance"
                    : "Withdraw Balance"}
              </button>
            </div>
          </form>
        </section>
      ) : null}

      <History />
    </div>
  );
}
