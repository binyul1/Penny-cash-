import type { Request } from "express";
import bcrypt from "bcryptjs";
import UserModel from "../model/UserModel.ts";
import type { IUserRegisterData } from "../request/auth-request.ts";

class AuthService {
  static async mapUserDataForRegistration(req: Request) {
    const data = req.body;
    if (!data.role) {
      data.role = "user";
    }
    data.password = bcrypt.hashSync(data.password, 12);
    if (req.file) {
      data.image = {
        originalName: req.file.originalname,
        filename: req.file.filename,
        size: req.file.size,
        destination: req.file.destination,
      };
    }
    return data as IUserRegisterData;
  }

  static async storeUser(data: IUserRegisterData) {
    const user = new UserModel(data);
    return await user.save();
  }
}

export default AuthService;
