import * as groupMemberService from "../services/groupMemberService.js";

// Create
export const createGroupMember = async (req, res) => {
  try {
    const groupMember = await groupMemberService.createGroupMember(req.body);

    res.status(201).json({
      success: true,
      message: "Member added to group successfully",
      data: groupMember,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All
export const getAllGroupMembers = async (req, res) => {
  try {
    const data = await groupMemberService.getAllGroupMembers();

    res.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get One
export const getGroupMemberById = async (req, res) => {
  try {
    const data = await groupMemberService.getGroupMemberById(req.params.id);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update
export const updateGroupMember = async (req, res) => {
  try {
    const data = await groupMemberService.updateGroupMember(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      message: "Group Member updated successfully",
      data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete
export const deleteGroupMember = async (req, res) => {
  try {
    await groupMemberService.deleteGroupMember(req.params.id);

    res.json({
      success: true,
      message: "Group Member deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Members By Group
export const getMembersByGroup = async (req, res) => {
  try {
    const data = await groupMemberService.getMembersByGroup(
      req.params.groupId
    );

    res.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Groups By Member
export const getGroupsByMember = async (req, res) => {
  try {
    const data = await groupMemberService.getGroupsByMember(
      req.params.memberId
    );

    res.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};