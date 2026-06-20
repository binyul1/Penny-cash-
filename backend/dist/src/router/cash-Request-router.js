import { Router } from "express";
import CashReqController from "../controller/CashReqController.js";
import uploader from "../middleware/Uploader.js";
const cashRequestRouter = Router();
const cashReqCtrl = new CashReqController();
cashRequestRouter.post("/create", uploader("Invoice").single("Invoice"), cashReqCtrl.createCash);
export default cashRequestRouter;
//# sourceMappingURL=cash-Request-router.js.map