import { Router } from "express";
import AuthController from "../controller/AuthController.ts";




const authrouter = Router()
const authCtrl = new AuthController()

authrouter.get("/user/:userId", authCtrl.getUserDetailById);