import { Router } from "express";
import { healthCheck } from "../controller/TestController.js";
import authRouter from "./auth-router.js";
import cashRequestRouter from "./cash-request-router.js";
import cashdepositRouter from "./cash-deposit.js";
const router = Router();
router.get("/", healthCheck);
router.use("/auth", authRouter);
router.use("/cash", cashRequestRouter);
router.use("/deposit", cashdepositRouter);
export default router;
//# sourceMappingURL=router.js.map