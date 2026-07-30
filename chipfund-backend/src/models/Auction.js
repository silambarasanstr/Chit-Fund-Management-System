import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema(
  {
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

    auctionDate: {
      type: Date,
      required: true,
    },

    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      default: null,
    },

    winningBid: {
      type: Number,
      default: 0,
      min: 0,
    },

    dividendPerMember: {
      type: Number,
      default: 0,
      min: 0,
    },

    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
    },

    remarks: {
      type: String,
      trim: true,
      maxlength: 300,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Auction", auctionSchema);