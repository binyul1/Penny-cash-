import AuthService from "../services/AuthService.js";
import UserModel from "../model/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Secrets } from "../config/app-env.js";
class AuthController {
    constructor() {
        this.login = async (req, res, next) => {
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
                const expiresInMinutes = Number(credentials.expiresInMinutes) || 180;
                const token = jwt.sign({ sub: userDetail._id, typ: "Bearer" }, Secrets.jwtSecret, { expiresIn: `${expiresInMinutes}m` });
                res.json({
                    data: token,
                    message: "Login success",
                    meta: null,
                });
            }
            catch (exception) {
                next(exception);
            }
        };
        this.register = async (req, res, next) => {
            try {
                const data = await AuthService.mapUserDataForRegistration(req);
                // db operation
                const user = await AuthService.storeUser(data);
                res.json({
                    data: user,
                    message: "User Registered",
                    meta: null,
                });
            }
            catch (exception) {
                next(exception);
            }
        };
        this.getUserDetailById = async (req, res, next) => {
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
            }
            catch (exceptation) {
                next(exceptation);
            }
        };
        this.getLoggedInUserDetail = async (req, res, next) => {
            const loggedInUser = req.loggedInUser;
            res.json({
                data: loggedInUser,
                message: "User Detail",
                meta: null,
            });
        };
    }
}
export default AuthController;
//# sourceMappingURL=AuthController.js.map