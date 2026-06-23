import { Router } from "express";
import uploader from "../middleware/Uploader.ts";
import { CashRequestSchema, CashRequestStatusUpdateSchema } from "../request/cash-request.ts";
import { bodyValidator } from "../middleware/Validators.ts";
import CashReqController from "../controller/CashReqController.ts";
import AuthCheck from "../middleware/Auth.ts";
import cloudinaryUploader from "../middleware/CloudinaryUploader.ts";

const cashRequestRouter = Router()

const cashReqCtrl = new CashReqController();

cashRequestRouter.post("/create", AuthCheck(), cloudinaryUploader("/Invoice").single("Invoice"), bodyValidator(CashRequestSchema), cashReqCtrl.createCash)
cashRequestRouter.put("/status/:id", AuthCheck(["admin"]),bodyValidator(CashRequestStatusUpdateSchema), cashReqCtrl.updateCashRequestStatus)
cashRequestRouter.get("/expenses", AuthCheck(), cashReqCtrl.getCashRequests)
cashRequestRouter.delete("/delete/:id", AuthCheck(["admin"]), cashReqCtrl.deleteCashRequest)
cashRequestRouter.get("/expense/:id", AuthCheck(), cashReqCtrl.getCashRequestById)

export default cashRequestRouter;