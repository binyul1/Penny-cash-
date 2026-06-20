import { Router } from "express";
import { healthCheck } from "../controller/TestController.js";
import authRouter from "./auth-router.js";
import cashRequestRouter from "./cash-Request-router.js";
const router = Router();
router.get("/", healthCheck);
router.use("/auth", authRouter);
router.use("/cash", cashRequestRouter);
export default router;
//# sourceMappingURL=router.js.map