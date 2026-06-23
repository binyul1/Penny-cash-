import { Router } from "express";
import { CashRequestSchema, CashRequestStatusUpdateSchema } from "../request/cash-request.js";
import { bodyValidator } from "../middleware/Validators.js";
import CashReqController from "../controller/CashReqController.js";
import AuthCheck from "../middleware/Auth.js";
import cloudinaryUploader from "../middleware/CloudinaryUploader.js";
const cashRequestRouter = Router();
const cashReqCtrl = new CashReqController();
cashRequestRouter.post("/create", AuthCheck(), cloudinaryUploader("/Invoice").single("Invoice"), bodyValidator(CashRequestSchema), cashReqCtrl.createCash);
cashRequestRouter.put("/status/:id", AuthCheck(["admin"]), bodyValidator(CashRequestStatusUpdateSchema), cashReqCtrl.updateCashRequestStatus);
cashRequestRouter.get("/expenses", AuthCheck(), cashReqCtrl.getCashRequests);
cashRequestRouter.delete("/delete/:id", AuthCheck(["admin"]), cashReqCtrl.deleteCashRequest);
cashRequestRouter.get("/expense/:id", AuthCheck(), cashReqCtrl.getCashRequestById);
export default cashRequestRouter;
//# sourceMappingURL=cash-request-router.js.map