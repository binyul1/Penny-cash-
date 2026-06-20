import { Router } from "express";
import { healthCheck } from "../controller/TestController.ts";
import AuthController from "../controller/AuthController.ts";
import AuthCheck from "../middleware/Auth.ts";
import { bodyValidator } from "../middleware/Validators.ts";
import z from "zod"

const router: Router = Router();

const authCtrl = new AuthController();

const LoginSchema = z.object({
    username: z.string().nonempty().nonoptional(),
    password: z.string().nonempty().nonoptional()
})

router.get("/", healthCheck);

router.post("/auth/login", bodyValidator(LoginSchema), authCtrl.login);

router.get("/auth/me", AuthCheck(), authCtrl.getLoggedInUserDetail)

router.get("/user/:userId", authCtrl.getUserDetailById);

export default router;
