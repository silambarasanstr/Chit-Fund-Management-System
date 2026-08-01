import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    memberId: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    name: {
      type: String,
      required: [true, "Member name is required"],
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
      match: [/^[6-9]\d{9}$/, "Invalid phone number"],
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },

    address: {
      type: String,
      trim: true,
      required: [true, "Address is required"],
    },

    aadhaarNumber: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      match: [/^\d{12}$/, "Invalid Aadhaar number"],
    },

    panNumber: {
      type: String,
      uppercase: true,
      trim: true,
      sparse: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive", "Blocked"],
      default: "Active",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ==========================
    // Soft Delete Fields
    // ==========================
    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },

    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Member", memberSchema);