import { Router } from "express";
import CashdepositController from "../controller/CashDepositController.js";
import AuthCheck from "../middleware/Auth.js";
import { bodyValidator } from "../middleware/Validators.js";
import { CashDepositSchema } from "../request/cash-deposit-request.js";
import uploader from "../middleware/Uploader.js";
import { CashWithdrawSchema } from "../request/cash-withdraw-request.js";
const cashdepositRouter = Router();
const cashdepositCtrl = new CashdepositController();
cashdepositRouter.post("/", AuthCheck(["admin"]), uploader().none(), bodyValidator(CashDepositSchema), cashdepositCtrl.createDeposit);
cashdepositRouter.post("/withdraw", AuthCheck(["admin"]), uploader().none(), bodyValidator(CashWithdrawSchema), cashdepositCtrl.withdrawCash);
cashdepositRouter.get("/balance", AuthCheck(["admin"]), cashdepositCtrl.getBalance);
cashdepositRouter.get("/history", AuthCheck(["admin"]), cashdepositCtrl.getDeposits);
export default cashdepositRouter;
//# sourceMappingURL=cash-deposit.js.map