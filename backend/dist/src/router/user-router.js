import { Router } from "express";
import AuthController from "../controller/AuthController.js";
const authrouter = Router();
const authCtrl = new AuthController();
authrouter.get("/user/:userId", authCtrl.getUserDetailById);
//# sourceMappingURL=user-router.js.map