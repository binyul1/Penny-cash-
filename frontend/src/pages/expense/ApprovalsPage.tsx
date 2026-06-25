import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import axiosInstance from "../../config/apiClient";

type ExpenseItem = {
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

export default function ApprovalsPage() {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadExpenses = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/cash/expenses");
      const allExpenses = Array.isArray(response) ? response : [];
      setExpenses(
        allExpenses.filter((expense) => expense.status === "pending"),
      );
    } catch (error) {
      console.error(error);
      toast.error("Unable to load expense requests");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadExpenses();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [loadExpenses]);

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      setUpdatingId(id);
      await axiosInstance.put(`/cash/status/${id}`, { status });
      toast.success(`Expense ${status}`);
      await loadExpenses();
    } catch (error) {
      console.error(error);
      toast.error("Unable to update expense status");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
          Expense Approvals
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-950">
          Review and approve requests
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Review each expense request, approve it, or reject it directly from
          here.
        </p>
      </div>

      <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        {loading ? (
          <div className="text-sm text-slate-500">Loading expenses...</div>
        ) : expenses.length === 0 ? (
          <div className="text-sm text-slate-500">
            No expense requests found.
          </div>
        ) : (
          <div className="space-y-4">
            {expenses.map((expense) => (
              <div
                key={expense._id}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-semibold text-slate-900">
                        {expense.title}
                      </h2>
                      <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">
                        {expense.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">
                      {expense.notes || "No notes provided"}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                      <span>Amount: {expense.amount}</span>
                      <span>Category: {expense.category}</span>
                      <span>
                        Submitted by:{" "}
                        {expense.createdBy?.name ||
                          expense.createdBy?.email ||
                          "Unknown"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => updateStatus(expense._id, "approved")}
                      disabled={
                        updatingId === expense._id ||
                        expense.status === "approved"
                      }
                      className="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {updatingId === expense._id ? "Updating..." : "Approve"}
                    </button>
                    <button
                      type="button"
                      onClick={() => updateStatus(expense._id, "rejected")}
                      disabled={
                        updatingId === expense._id ||
                        expense.status === "rejected"
                      }
                      className="rounded-2xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {updatingId === expense._id ? "Updating..." : "Reject"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
