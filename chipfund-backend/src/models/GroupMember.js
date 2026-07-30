import mongoose from "mongoose";

const groupMemberSchema = new mongoose.Schema(
  {
    chitGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChitGroup",
      required: true,
    },

    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },

    memberNumber: {
      type: Number,
      required: true,
    },

    joinedDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

groupMemberSchema.index(
  {
    chitGroup: 1,
    member: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model("GroupMember", groupMemberSchema);