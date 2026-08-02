import GroupMember from "../models/GroupMember.js";
import Member from "../models/Member.js";
import ChitGroup from "../models/ChitGroup.js";

export const createGroupMember = async (data) => {
  // Auto Member Number
  const count = await GroupMember.countDocuments({
    chitGroup: data.chitGroup,
  });

  data.memberNumber = count + 1;

  const groupMember = await GroupMember.create(data);

  return await GroupMember.findById(groupMember._id)
    .populate("member", "name phone email")
    .populate("chitGroup", "groupName chitAmount")
    .select("-__v");
};

export const getAllGroupMembers = async () => {
  return await GroupMember.find()
    .populate("member", "name phone email")
    .populate("chitGroup", "groupName chitAmount")
    .select("-__v")
    .sort({ createdAt: -1 });
};

// ===============================
// Get By Id
// ===============================
export const getGroupMemberById = async (id) => {
  const groupMember = await GroupMember.findById(id)
    .populate("member", "name phone email")
    .populate("chitGroup", "groupName chitAmount")
    .select("-__v");

  if (!groupMember) {
    throw new Error("Group Member not found");
  }

  return groupMember;
};

// ===============================
// Update
// ===============================
export const updateGroupMember = async (id, data) => {
  const groupMember = await GroupMember.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  })
    .populate("member", "name phone email")
    .populate("chitGroup", "groupName chitAmount")
    .select("-__v");

  if (!groupMember) {
    throw new Error("Group Member not found");
  }

  return groupMember;
};

// ===============================
// Delete
// ===============================
export const deleteGroupMember = async (id) => {
  const groupMember = await GroupMember.findByIdAndDelete(id);

  if (!groupMember) {
    throw new Error("Group Member not found");
  }

  return groupMember;
};

// ===============================
// Get Members By Group
// ===============================
export const getMembersByGroup = async (groupId) => {
  return await GroupMember.find({
    chitGroup: groupId,
  })
    .populate("member", "memberId name phone email")
    .select("-__v")
    .sort({ createdAt: -1 });
};

export const getGroupsByMember = async (memberId) => {
  const groups = await GroupMember.find({
    member: memberId,
  })
    .populate("member", "name memberId phone")
    .populate("chitGroup", "groupName chitAmount duration status")
    .select("-__v")
    .sort({ createdAt: -1 });

  return groups;
};
