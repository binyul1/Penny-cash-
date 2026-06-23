import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        originalName: String,
        filename: String,
        size: Number,
        destination: String,
    },
}, {
    autoCreate: true,
    autoIndex: true,
    timestamps: true,
});
const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
//# sourceMappingURL=UserModel.js.map