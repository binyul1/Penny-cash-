import { Router } from "express";
import CashReqController from "../controller/CashReqController.ts";

const cashRequestRouter = Router()

const cashReqCtrl = new CashReqController();

cashRequestRouter.post("/create",cashReqCtrl.createCash )

export default cashRequestRouter;