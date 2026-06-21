import { useEffect, useState } from "react";
import axiosInstance from "../../config/apiClient";

type CashHistoryItem = {
  _id: string;
  transactionType?: "deposit" | "withdraw";
  amount: number;
  description?: string;
  balanceAfterTransaction?: number;
  createdAt?: string;
  depositdBy?: {
    name?: string;
    email?: string;
    username?: string;
    role?: string;
  };
};

export default function History() {
  const [transactions, setTransactions] = useState<CashHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const loadHistory = async () => {
      try {
        const response = (await axiosInstance.get(
          "/deposit/history",
        )) as CashHistoryItem[];
        if (isActive) {
          setTransactions(Array.isArray(response) ? response : []);
        }
      } catch {
        if (isActive) {
          setTransactions([]);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadHistory();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <section className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4 sm:px-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Liquidity Ledger
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Track all top-ups and withdrawals from the cash ledger.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left">
          <thead className="bg-slate-50/80 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">
            <tr>
              <th className="px-5 py-4 sm:px-6">Date & Time</th>
              <th className="px-5 py-4 sm:px-6">Type</th>
              <th className="px-5 py-4 sm:px-6">Reference</th>
              <th className="px-5 py-4 sm:px-6">Description</th>
              <th className="px-5 py-4 sm:px-6">Amount</th>
              <th className="px-5 py-4 sm:px-6">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-sm">
            {isLoading ? (
              <tr>
                <td
                  className="px-5 py-8 text-sm text-slate-500 sm:px-6"
                  colSpan={6}
                >
                  Loading history...
                </td>
              </tr>
            ) : transactions.length ? (
              transactions.map((transaction) => {
                const isDeposit = transaction.transactionType === "deposit";
                const createdAt = transaction.createdAt
                  ? new Date(transaction.createdAt)
                  : null;
                const date = createdAt
                  ? createdAt.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "--";
                const time = createdAt
                  ? createdAt.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "--";

                return (
                  <tr
                    key={transaction._id}
                    className="transition hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-4 sm:px-6">
                      <div className="text-sm font-medium text-slate-900">
                        {date}
                      </div>
                      <div className="mt-1 text-xs text-slate-500">{time}</div>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <span
                        className={`inline-flex items-center gap-2 font-medium ${isDeposit ? "text-emerald-600" : "text-rose-600"}`}
                      >
                        <span className="h-2 w-2 rounded-full bg-current" />
                        {isDeposit ? "Fund Top-up" : "Withdrawal"}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-mono text-xs text-slate-500 sm:px-6">
                      {transaction.depositdBy?.username ??
                        transaction.depositdBy?.name ??
                        "-"}
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <span className="inline-flex items-center gap-2 text-slate-500">
                        {transaction.description?.trim() ||
                          (isDeposit ? "Cash top-up" : "Cash withdrawal")}
                      </span>
                    </td>
                    <td
                      className={`px-5 py-4 font-semibold sm:px-6 ${isDeposit ? "text-emerald-600" : "text-slate-700"}`}
                    >
                      {isDeposit ? "+" : "-"}$
                      {Number(transaction.amount).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-600">
                        Completed
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  className="px-5 py-8 text-sm text-slate-500 sm:px-6"
                  colSpan={6}
                >
                  No cash history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-5 py-4 text-sm text-slate-500 sm:px-6">
        <p>
          Showing {transactions.length} transaction
          {transactions.length === 1 ? "" : "s"}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-full border border-slate-200 px-3 py-1.5 text-slate-400 transition hover:bg-slate-50 hover:text-slate-700"
          >
            ‹
          </button>
          <button
            type="button"
            className="rounded-full border border-slate-200 px-3 py-1.5 text-slate-400 transition hover:bg-slate-50 hover:text-slate-700"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
