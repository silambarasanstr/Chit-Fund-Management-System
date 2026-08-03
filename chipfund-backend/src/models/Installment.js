import mongoose from "mongoose";

const installmentSchema = new mongoose.Schema(
  {
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChitGroup",
      required: true,
    },

    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },

    installmentNo: {
      type: Number,
      required: true,
      min: 1,
    },

    dueAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    paidAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    paymentDate: {
     type: Date,
    },

    status: {
      type: String,
      enum: ["Pending", "Paid", "Late"],
      default: "Pending",
    },

    remarks: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Installment", installmentSchema);