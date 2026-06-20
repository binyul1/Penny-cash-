import { Router } from "express";
import { healthCheck } from "../controller/TestController.ts";
import authRouter from "./auth-router.ts"
import cashRequestRouter from "./cash-Request-router.ts"

const router: Router = Router();


router.get("/", healthCheck);
router.use("/auth", authRouter);
router.use("/cash", cashRequestRouter)

export default router;
