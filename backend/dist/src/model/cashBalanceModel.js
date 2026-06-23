import mongoose from "mongoose";
const cashBalanceSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
        default: "main",
    },
    balance: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    },
}, {
    autoCreate: true,
    autoIndex: true,
    timestamps: true,
});
const CashBalanceModel = mongoose.model("CashBalance", cashBalanceSchema);
export default CashBalanceModel;
//# sourceMappingURL=cashBalanceModel.js.map