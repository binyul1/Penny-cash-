import { createContext } from "react";
import type { ICashManagementContext } from "../types/cashmanagement-types";

const CashManagementContext = createContext<ICashManagementContext>({
  cashBalance: null,
  transactions: [],
  isBalanceLoading: true,
  isHistoryLoading: true,
  activeAction: null,
  amount: "",
  description: "",
  isSubmitting: false,
  formError: null,
  formSuccess: null,
  openForm() {},
  closeForm() {},
  setAmount() {},
  setDescription() {},
  async submitMovement() {},
  async refreshLedger() {},
});

export default CashManagementContext;
