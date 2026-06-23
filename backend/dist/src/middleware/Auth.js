import jwt from "jsonwebtoken";
import { Secrets } from "../config/app-env.js";
import UserModel from "../model/UserModel.js";
const AuthCheck = (role = null) => {
    return async (req, res, next) => {
        try {
            let token = req.headers.authorization || null;
            if (!token) {
                throw { code: 401, message: "Unauthorized" };
            }
            else {
                token = token.replace("Bearer ", "");
                const data = jwt.verify(token, Secrets.jwtSecret);
                const userDetail = await UserModel.findById(data.sub);
                if (!userDetail) {
                    next({ code: 404, message: "User not found" });
                    return;
                }
                else {
                    const imageFileName = userDetail.image?.filename ?? null;
                    const imageFolder = userDetail.image?.destination
                        ? (userDetail.image.destination
                            .split(/[\\/]/)
                            .filter(Boolean)
                            .pop() ?? "User")
                        : null;
                    const imageUrl = imageFileName && imageFolder
                        ? `${req.protocol}://${req.get("host")}/uploads/${imageFolder}/${imageFileName}`
                        : null;
                    req.loggedInUser = {
                        _id: userDetail._id,
                        name: userDetail.name,
                        email: userDetail.email,
                        username: userDetail.username,
                        role: userDetail.role,
                        image: imageUrl,
                    };
                    if (!role ||
                        (role && role.includes(userDetail.role)) ||
                        userDetail.role === "admin") {
                        next();
                    }
                    else {
                        next({ code: 403, message: "Access Denied" });
                        return;
                    }
                }
            }
        }
        catch (exception) {
            if (exception instanceof jwt.TokenExpiredError) {
                next({ code: 401, message: "Token expired" });
            }
            else {
                next({ code: 401, message: "Invalid token" });
            }
        }
    };
};
export default AuthCheck;
//# sourceMappingURL=Auth.js.map