import mongoose from "mongoose";

const chitGroupSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
      trim: true,
    },

    chitAmount: {
      type: Number,
      required: true,
      min: 1000,
    },

    totalMembers: {
      type: Number,
      required: true,
      min: 2,
    },

    monthlyInstallment: {
      type: Number,
      required: true,
    },

    durationMonths: {
      type: Number,
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Upcoming", "Active", "Completed", "Cancelled"],
      default: "Upcoming",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("ChitGroup", chitGroupSchema);