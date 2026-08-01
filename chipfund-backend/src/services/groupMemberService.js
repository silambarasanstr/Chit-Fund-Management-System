import GroupMember from "../models/GroupMember.js";
import Member from "../models/Member.js";
import ChitGroup from "../models/ChitGroup.js";

// ===============================
// Create Group Member
// ===============================
export const createGroupMember = async (data) => {
  const { chitGroup, member } = data;

  // Check group exists
  const group = await ChitGroup.findById(chitGroup);
  if (!group) {
    throw new Error("Chit Group not found");
  }

  // Check member exists
  const memberExists = await Member.findById(member);
  if (!memberExists) {
    throw new Error("Member not found");
  }

  // Check duplicate member
  const duplicate = await GroupMember.findOne({
    chitGroup,
    member,
  });

  if (duplicate) {
    throw new Error("Member already exists in this group");
  }

  // Check group limit
  const count = await GroupMember.countDocuments({
    chitGroup,
  });

  if (count >= group.totalMembers) {
    throw new Error("Group is already full");
  }

  // Auto Member Number
  data.memberNumber = count + 1;

  const groupMember = await GroupMember.create(data);

  return await GroupMember.findById(groupMember._id)
    .populate("member", "name phone email")
    .populate("chitGroup", "groupName chitAmount");
};

// ===============================
// Get All
// ===============================
export const getAllGroupMembers = async () => {
  return await GroupMember.find()
    .populate("member", "name phone email")
    .populate("chitGroup", "groupName chitAmount");
};

// ===============================
// Get By Id
// ===============================
export const getGroupMemberById = async (id) => {
  const groupMember = await GroupMember.findById(id)
    .populate("member", "name phone email")
    .populate("chitGroup", "groupName chitAmount");

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
    .populate("chitGroup", "groupName chitAmount");

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
  }).populate("member", "memberId name phone email");
};

// ===============================
// Get Groups By Member
// ===============================
// export const getGroupsByMember = async (memberId) => {
//   return await GroupMember.find({
//     member: memberId,
//   }).populate("chitGroup", "groupName chitAmount");
// };


export const getGroupsByMember = async (memberId) => {

  const groups = await GroupMember.find({
    member: memberId,
  })
    .populate("member", "name memberId phone")
    .populate(
      "chitGroup",
      "groupName chitAmount duration status"
    );

  console.log("Member ID:", memberId);
  console.log("Groups Found:", groups);

  return groups;
};
