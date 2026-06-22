import { useContext } from "react";
import CashManagementContext from "../../contex/CashManagementContext";

export const useCashManagement = () => {
  const cashManagementContext = useContext(CashManagementContext);

  return {
    ...cashManagementContext,
  };
};
