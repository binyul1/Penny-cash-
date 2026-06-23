import bcrypt from "bcryptjs";
import UserModel from "../model/UserModel.js";
class AuthService {
    static async mapUserDataForRegistration(req) {
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
        return data;
    }
    static async storeUser(data) {
        const user = new UserModel(data);
        return await user.save();
    }
}
export default AuthService;
//# sourceMappingURL=AuthService.js.map