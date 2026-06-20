import { Router } from "express";
import CashReqController from "../controller/CashReqController.ts";
import uploader from "../middleware/Uploader.ts";

const cashRequestRouter = Router()

const cashReqCtrl = new CashReqController();

cashRequestRouter.post("/create",uploader("Invoice").single("Invoice"),cashReqCtrl.createCash )

export default cashRequestRouter;