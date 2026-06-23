import { Router } from "express";
import AuthController from "../controller/AuthController.ts";
import AuthCheck from "../middleware/Auth.ts";
import { bodyValidator } from "../middleware/Validators.ts";
import { LoginSchema, UserRegisterSchema } from "../request/auth-request.ts";
import uploader from "../middleware/Uploader.ts";
import cloudinaryUploader from "../middleware/CloudinaryUploader.ts";

const authCtrl = new AuthController();

const authRouter = Router()

authRouter.post("/login", bodyValidator(LoginSchema), authCtrl.login);
authRouter.post("/register", cloudinaryUploader("/users").single("image"), bodyValidator(UserRegisterSchema), authCtrl.register);
authRouter.get("/me", AuthCheck(), authCtrl.getLoggedInUserDetail)

export default authRouter;