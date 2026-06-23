import mongoose from "mongoose";


const RequestSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      originalName: String,
      filename: String,
      size: Number,
      destination: String,
    },
    category: {
      type: String,
      enum: ["Office Supplies", "Grocery", "Toiletries","Transport"],
      required: true,
    },
    status:{
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    }
},{
    autoCreate: true,
    autoIndex: true,
    timestamps: true,
  });

  const RequestModel = mongoose.model("CashRequest", RequestSchema);

export default RequestModel;