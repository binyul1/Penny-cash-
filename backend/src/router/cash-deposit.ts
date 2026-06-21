import { Router } from "express";
import CashdepositController from "../controller/CashDepositController.ts";
import AuthCheck from "../middleware/Auth.ts";
import { bodyValidator } from "../middleware/Validators.ts";
import { CashDepositSchema } from "../request/cash-deposit-request.ts";
import uploader from "../middleware/Uploader.ts";
import { CashWithdrawSchema } from "../request/cash-withdraw-request.ts";

const cashdepositRouter = Router();
const cashdepositCtrl = new CashdepositController();

cashdepositRouter.post(
  "/",
  AuthCheck(["admin"]),
  uploader().none(),
  bodyValidator(CashDepositSchema),
  cashdepositCtrl.createDeposit,
);

cashdepositRouter.post(
  "/withdraw",
  AuthCheck(["admin"]),
  uploader().none(),
  bodyValidator(CashWithdrawSchema),
  cashdepositCtrl.withdrawCash,
);

cashdepositRouter.get(
  "/balance",
  AuthCheck(["admin"]),
  cashdepositCtrl.getBalance,
);

cashdepositRouter.get(
  "/history",
  AuthCheck(["admin"]),
  cashdepositCtrl.getDeposits,
);

export default cashdepositRouter;
