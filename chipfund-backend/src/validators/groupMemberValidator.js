import ChitGroup from "../models/ChitGroup.js";
import Member from "../models/Member.js";
import GroupMember from "../models/GroupMember.js";

export const validateGroupMember = async (req, res, next) => {
  try {
    const { chitGroup, member } = req.body;

    if (!chitGroup || !member) {
      return res.status(400).json({
        success: false,
        message: "Chit Group and Member are required",
      });
    }

    // Check group exists
    const group = await ChitGroup.findById(chitGroup);
    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Chit Group not found",
      });
    }

    // Check member exists
    const memberExists = await Member.findById(member);
    if (!memberExists) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    // Check duplicate member
    const duplicate = await GroupMember.findOne({
      chitGroup,
      member,
    });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: "Member already exists in this group",
      });
    }

    next();
  } catch (err) {
    next(err);
  }
};
