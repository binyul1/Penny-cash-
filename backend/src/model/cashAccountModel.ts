import mongoose from "mongoose";

const cashAccountSchema = new mongoose.Schema(
  {
    transactionType: {
      type: String,
      enum: ["deposit", "withdraw"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    depositdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    balanceAfterTransaction: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    autoCreate: true,
    autoIndex: true,
    timestamps: true,
  },
);

const CashAccountModel = mongoose.model("CashAccount", cashAccountSchema);

export default CashAccountModel;
