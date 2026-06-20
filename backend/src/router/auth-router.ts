import { Router } from "express";
import AuthController from "../controller/AuthController.ts";
import AuthCheck from "../middleware/Auth.ts";
import { bodyValidator } from "../middleware/Validators.ts";
import { LoginSchema } from "../request/auth-request.ts";

const authCtrl = new AuthController();

const authRouter = Router()

authRouter.post("/login", bodyValidator(LoginSchema), authCtrl.login);

authRouter.get("/me", AuthCheck(), authCtrl.getLoggedInUserDetail)

export default authRouter;