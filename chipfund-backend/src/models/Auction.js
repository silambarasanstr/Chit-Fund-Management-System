import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema(
  {
    chitGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChitGroup",
      required: true,
    },

    installmentNo: {
      type: Number,
      required: true,
      min: 1,
    },

    auctionDate: {
      type: Date,
      required: true,
    },

    bidAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      default: null,
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
    versionKey: false,
  },
);



export default mongoose.model("Auction", auctionSchema);
