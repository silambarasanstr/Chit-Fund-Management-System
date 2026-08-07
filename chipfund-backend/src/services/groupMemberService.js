import GroupMember from "../models/GroupMember.js";
import Member from "../models/Member.js";
import ChitGroup from "../models/ChitGroup.js";

// Create Group Member
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


// Get All Group Members
export const getAllGroupMembers = async () => {
  const groupMembers = await GroupMember.find()
    .populate({
      path: "member",
      select: "name phone email",
      match: { isDeleted: { $ne: true } },
    })
    .populate("chitGroup", "groupName chitAmount")
    .select("-__v")
    .sort({ createdAt: -1 });

  return groupMembers.filter((item) => item.member);
};


// Get Group Member By Id
export const getGroupMemberById = async (id) => {
  console.log(id, "getGroupMemberById");
  const groupMember = await GroupMember.findById(id)
    .populate({
      path: "member",
      select: "name phone email",
      match: { isDeleted: { $ne: true } },
    })
    .populate("chitGroup", "groupName chitAmount")
    .select("-__v");

  if (!groupMember || !groupMember.member) {
    throw new Error("Group Member not found");
  }

  return groupMember;
};


// Update Group Member
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

// Delete Group Member
export const deleteGroupMember = async (id) => {
  const groupMember = await GroupMember.findByIdAndDelete(id);

  if (!groupMember) {
    throw new Error("Group Member not found");
  }

  return groupMember;
};

// Get Members By Group
export const getMembersByGroup = async (groupId) => {
  console.log(groupId, "getMembersGroup");

  const groupMembers = await GroupMember.find({
    chitGroup: groupId,
  })
    .populate({
      path: "chitGroup",
      select: "groupName chitAmount",
    })
    .populate({
      path: "member",
      select: "memberId name phone email",
      match: {
        isDeleted: { $ne: true },
        status: "Active",
      },
    })
    .select("-__v")
    .sort({ createdAt: -1 });

  return groupMembers.filter((item) => item.member);
};

// Get Groups By Member
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
