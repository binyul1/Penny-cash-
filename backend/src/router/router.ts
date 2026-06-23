import { Router } from "express";
import { healthCheck } from "../controller/TestController.ts";
import authRouter from "./auth-router.ts";
import cashRequestRouter from "./cash-request-router.ts";
import cashdepositRouter from "./cash-deposit.ts";

const router: Router = Router();

router.get("/", healthCheck);
router.use("/auth", authRouter);
router.use("/cash", cashRequestRouter);
router.use("/deposit", cashdepositRouter);

export default router;
