import mongoose from "mongoose";
import User from "../models/User.js";
import Member from "../models/Member.js";

export const validateCreateMember = async (req, res, next) => {
  try {
    const { user, memberId } = req.body;

    // Check User
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Please select a user",
      });
    }

    // Check ObjectId
    if (!mongoose.Types.ObjectId.isValid(user)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user",
      });
    }

    // Check User Exists
    const existingUser = await User.findById(user);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // One User = One Member
    if (existingUser.member) {
      return res.status(400).json({
        success: false,
        message: "This user already has a member profile",
      });
    }

    // Check Member ID
    const existingMember = await Member.findOne({ memberId });

    if (existingMember) {
      return res.status(400).json({
        success: false,
        message: "Member ID already exists",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};
