import { useCallback, useEffect, useState, type ReactNode } from "react";
import axiosInstance from "../../config/apiClient";
import CashManagementContext from "../../contex/CashManagementContext";
import type {
  CashHistoryItem,
  CashManagementAction,
} from "../../types/cashmanagement-types";

const CashManagementProvider = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  const [cashBalance, setCashBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<CashHistoryItem[]>([]);
  const [isBalanceLoading, setIsBalanceLoading] = useState(true);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const [activeAction, setActiveAction] = useState<CashManagementAction | null>(
    null,
  );
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const loadBalance = useCallback(async () => {
    setIsBalanceLoading(true);

    try {
      const response = (await axiosInstance.get("/deposit/balance")) as {
        balance?: number;
        data?: {
          balance?: number;
        };
      };
      const value = Number(response?.balance ?? response?.data?.balance ?? 0);

      setCashBalance(Number.isFinite(value) ? value : 0);
    } catch {
      setCashBalance(0);
    } finally {
      setIsBalanceLoading(false);
    }
  }, []);

  const loadHistory = useCallback(async () => {
    setIsHistoryLoading(true);

    try {
      const response = await axiosInstance.get("/deposit/history");
      setTransactions(Array.isArray(response) ? response : []);
    } catch {
      setTransactions([]);
    } finally {
      setIsHistoryLoading(false);
    }
  }, []);

  const refreshLedger = useCallback(async () => {
    await Promise.all([loadBalance(), loadHistory()]);
  }, [loadBalance, loadHistory]);

  useEffect(() => {
    const initializeLedger = setTimeout(() => {
      void refreshLedger();
    }, 0);

    return () => {
      clearTimeout(initializeLedger);
    };
  }, [refreshLedger]);

  const resetFormState = () => {
    setAmount("");
    setDescription("");
    setFormError(null);
    setFormSuccess(null);
  };

  const openForm = (action: CashManagementAction) => {
    setActiveAction(action);
    resetFormState();
  };

  const closeForm = () => {
    setActiveAction(null);
    resetFormState();
  };

  const submitMovement = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!activeAction) {
      return;
    }

    setIsSubmitting(true);
    setFormError(null);
    setFormSuccess(null);

    try {
      const endpoint =
        activeAction === "deposit" ? "/deposit" : "/deposit/withdraw";

      await axiosInstance.post(endpoint, {
        amount,
        description,
      });

      await refreshLedger();
      setFormSuccess(
        activeAction === "deposit"
          ? "Cash topped up successfully."
          : "Cash withdrawn successfully.",
      );
      setAmount("");
      setDescription("");
    } catch (exception) {
      const message =
        exception && typeof exception === "object" && "data" in exception
          ? String(
              (exception as { data?: { message?: string } }).data?.message ??
                "Unable to complete transaction",
            )
          : "Unable to complete transaction";

      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CashManagementContext.Provider
      value={{
        cashBalance,
        transactions,
        isBalanceLoading,
        isHistoryLoading,
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
        refreshLedger,
      }}
    >
      {children}
    </CashManagementContext.Provider>
  );
};

export default CashManagementProvider;
