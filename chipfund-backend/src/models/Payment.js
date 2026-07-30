import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },

    chitGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChitGroup",
      required: true,
    },

    installment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Installment",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    paymentDate: {
      type: Date,
      default: Date.now,
    },

    paymentMode: {
      type: String,
      enum: ["Cash", "UPI", "Bank Transfer", "Cheque"],
      required: true,
    },

    transactionId: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Completed",
    },

    remarks: {
      type: String,
      trim: true,
      default: "",
    },

    collectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Payment", paymentSchema);