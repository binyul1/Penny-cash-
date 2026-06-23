import { Router } from "express";
import AuthController from "../controller/AuthController.js";
import AuthCheck from "../middleware/Auth.js";
import { bodyValidator } from "../middleware/Validators.js";
import { LoginSchema, UserRegisterSchema } from "../request/auth-request.js";
import cloudinaryUploader from "../middleware/CloudinaryUploader.js";
const authCtrl = new AuthController();
const authRouter = Router();
authRouter.post("/login", bodyValidator(LoginSchema), authCtrl.login);
authRouter.post("/register", cloudinaryUploader("/users").single("image"), bodyValidator(UserRegisterSchema), authCtrl.register);
authRouter.get("/me", AuthCheck(), authCtrl.getLoggedInUserDetail);
export default authRouter;
//# sourceMappingURL=auth-router.js.map