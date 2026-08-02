import * as groupMemberService from "../services/groupMemberService.js";

// Create
export const createGroupMember = async (req, res, next) => {
  try {
    const groupMember = await groupMemberService.createGroupMember(req.body);

    res.status(201).json({
      success: true,
      message: "Member added to group successfully",
      data: groupMember,
    });
  } catch (error) {
    next(error);
  }
};

// Get All
export const getAllGroupMembers = async (req, res, next) => {
  try {
    const groupMembers = await groupMemberService.getAllGroupMembers();
    res.json({
      success: true,
      count: groupMembers.length,
      data: groupMembers,
    });
  } catch (error) {
    next(error);
  }
};

// Get One
export const getGroupMemberById = async (req, res, next) => {
  try {
    const groupMember = await groupMemberService.getGroupMemberById(
      req.params.id,
    );

    res.status(200).json({
      success: true,
      data: groupMember,
    });
  } catch (error) {
    next(error);
  }
};

// Update
export const updateGroupMember = async (req, res, next) => {
  try {
    const data = await groupMemberService.updateGroupMember(
      req.params.id,
      req.body,
    );

    res.json({
      success: true,
      message: "Group Member updated successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// Delete
export const deleteGroupMember = async (req, res, next) => {
  try {
    await groupMemberService.deleteGroupMember(req.params.id);

    res.json({
      success: true,
      message: "Group Member deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Members By Group
export const getMembersByGroup = async (req, res, next) => {
  try {
    const members = await groupMemberService.getMembersByGroup(
      req.params.groupId,
    );

    res.status(200).json({
      success: true,
      count: members.length,
      data: members,
    });
  } catch (error) {
    next(error);
  }
};

// Groups By Member
export const getGroupsByMember = async (req, res, next) => {
  console.log("Member ID:", req.params.memberId);
  try {
    const groups = await groupMemberService.getGroupsByMember(
      req.params.memberId,
    );

    res.status(200).json({
      success: true,
      count: groups.length,
      data: groups,
    });
  } catch (error) {
    next(error);
  }
};
