import type { FormEvent } from "react";

export type CashManagementAction = "deposit" | "withdraw";

export type CashHistoryItem = {
  _id: string;
  transactionType?: CashManagementAction;
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

export interface ICashManagementContext {
  cashBalance: number | null;
  transactions: CashHistoryItem[];
  isBalanceLoading: boolean;
  isHistoryLoading: boolean;
  activeAction: CashManagementAction | null;
  amount: string;
  description: string;
  isSubmitting: boolean;
  formError: string | null;
  formSuccess: string | null;
  openForm: (action: CashManagementAction) => void;
  closeForm: () => void;
  setAmount: (amount: string) => void;
  setDescription: (description: string) => void;
  submitMovement: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  refreshLedger: () => Promise<void>;
}
