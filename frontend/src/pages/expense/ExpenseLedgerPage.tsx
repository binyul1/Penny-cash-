import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import axiosInstance from "../../config/apiClient";

type ExpenseRequest = {
  _id: string;
  title: string;
  amount: number;
  category: string;
  notes: string;
  status: "pending" | "approved" | "rejected";
  createdAt?: string;
  createdBy?: {
    name?: string;
    email?: string;
  };
};

export default function ExpenseLedgerPage() {
  const [requests, setRequests] = useState<ExpenseRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/cash/expenses");
      setRequests(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load expense requests");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadRequests();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [loadRequests]);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
          Expense Ledger
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-950">
          All expense requests
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Review every request made and its current approval status in a table.
        </p>
      </div>

      <section className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Requests</h2>
            <p className="mt-1 text-sm text-slate-500">
              Every request made by the team, with its latest status.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50/80 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">
              <tr>
                <th className="px-5 py-4 sm:px-6">Title</th>
                <th className="px-5 py-4 sm:px-6">Amount</th>
                <th className="px-5 py-4 sm:px-6">Category</th>
                <th className="px-5 py-4 sm:px-6">Requested By</th>
                <th className="px-5 py-4 sm:px-6">Status</th>
                <th className="px-5 py-4 sm:px-6">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-sm">
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-8 text-sm text-slate-500 sm:px-6"
                  >
                    Loading requests...
                  </td>
                </tr>
              ) : requests.length ? (
                requests.map((request) => {
                  const createdAt = request.createdAt
                    ? new Date(request.createdAt)
                    : null;
                  const date = createdAt
                    ? createdAt.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "--";

                  return (
                    <tr
                      key={request._id}
                      className="transition hover:bg-slate-50/70"
                    >
                      <td className="px-5 py-4 sm:px-6">
                        <div className="font-medium text-slate-900">
                          {request.title}
                        </div>
                        <div className="mt-1 text-xs text-slate-500">
                          {request.notes || "No notes"}
                        </div>
                      </td>
                      <td className="px-5 py-4 font-semibold text-slate-700 sm:px-6">
                        $
                        {Number(request.amount).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td className="px-5 py-4 text-slate-600 sm:px-6">
                        {request.category}
                      </td>
                      <td className="px-5 py-4 text-slate-600 sm:px-6">
                        {request.createdBy?.name ||
                          request.createdBy?.email ||
                          "Unknown"}
                      </td>
                      <td className="px-5 py-4 sm:px-6">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${
                            request.status === "approved"
                              ? "bg-emerald-50 text-emerald-600"
                              : request.status === "rejected"
                                ? "bg-rose-50 text-rose-600"
                                : "bg-amber-50 text-amber-600"
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-500 sm:px-6">
                        {date}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-8 text-sm text-slate-500 sm:px-6"
                  >
                    No expense requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
