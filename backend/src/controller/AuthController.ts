import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import AuthService from "../services/AuthService.ts";
import UserModel from "../model/UserModel.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Secrets } from "../config/app-env.ts";
import { type AuthRequest } from "../types/Request.ts";

class AuthController {
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const credentials = req.body;

      const userDetail = await UserModel.findOne({
        $or: [
          { username: credentials.username },
          { email: credentials.username },
        ],
      });
      if (!userDetail) {
        throw { code: 404, message: "User not found" };
      }

      if (!bcrypt.compareSync(credentials.password, userDetail.password)) {
        throw { code: 401, message: "Invalid credentials" };
      }
      const expiresInMinutes: number =
        Number(credentials.expiresInMinutes) || 180;

      const token = jwt.sign(
        { sub: userDetail._id, typ: "Bearer" },
        Secrets.jwtSecret as string,
        { expiresIn: `${expiresInMinutes}m` },
      );
      res.json({
        data: token,
        message: "Login success",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await AuthService.mapUserDataForRegistration(req);

      // db operation
      const user = await AuthService.storeUser(data);
      res.json({
        data: user,
        message: "User Registered",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  getUserDetailById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    // this function or route is only accessed by loggedin User =>
    try {
      const params = req.params;
      const query = req.query;

      const data = {
        id: params.userId,
        query: query,
      };
      res.json({
        data: data,
        message: "User Detail",
        meta: null,
      });
    } catch (exceptation) {
      next(exceptation);
    }
  };

  getLoggedInUserDetail = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    const loggedInUser = req.loggedInUser;
    res.json({
      data: loggedInUser,
      message: "User Detail",
      meta: null,
    });
  };
}
export default AuthController;
