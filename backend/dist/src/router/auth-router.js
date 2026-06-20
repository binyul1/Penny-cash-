import { Router } from "express";
import AuthController from "../controller/AuthController.js";
import AuthCheck from "../middleware/Auth.js";
import { bodyValidator } from "../middleware/Validators.js";
import { LoginSchema } from "../request/auth-request.js";
const authCtrl = new AuthController();
const authRouter = Router();
authRouter.post("/login", bodyValidator(LoginSchema), authCtrl.login);
authRouter.get("/me", AuthCheck(), authCtrl.getLoggedInUserDetail);
export default authRouter;
//# sourceMappingURL=auth-router.js.map