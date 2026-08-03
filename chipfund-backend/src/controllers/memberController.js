import * as memberService from "../services/memberService.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from "../constants/messages.js";
import asyncHandler from "express-async-handler";

// Create Member
export const createMember = async (req, res) => {
  try {
    const member = await memberService.createMember({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: SUCCESS_MESSAGES.MEMBER_CREATED,
      data: member,
    });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Members
export const getMembers = async (req, res) => {
  try {
    const members = await memberService.getMembers();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.MEMBERS_FETCHED,
      count: members.length,
      data: members,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Member
export const getMemberById = async (req, res) => {
  try {
    const member = await memberService.getMemberById(req.params.id);

    if (!member) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: ERROR_MESSAGES.MEMBER_NOT_FOUND,
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.MEMBER_FETCHED,
      data: member,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
      error: error.message,
    });
  }
};

// Update Member
export const updateMember = async (req, res) => {
  try {
    const member = await memberService.updateMember(req.params.id, req.body);

    if (!member) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: ERROR_MESSAGES.MEMBER_NOT_FOUND,
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.MEMBER_UPDATED,
      data: member,
    });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Member
export const deleteMember = async (req, res) => {
  try {
    const member = await memberService.deleteMember(req.params.id, req.user.id);

    if (!member) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: ERROR_MESSAGES.MEMBER_NOT_FOUND,
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.MEMBER_DELETED,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
      error: error.message,
    });
  }
};

export const bulkDeleteMembers = asyncHandler(async (req, res) => {
  const { ids } = req.body;

  const result = await memberService.bulkDeleteMembers(ids, req.user.id);

  res.status(200).json({
    success: true,
    message: `${result.modifiedCount} members deleted successfully.`,
    data: result,
  });
});

export const importMembers = asyncHandler(async (req, res) => {
  const result = await memberService.bulkCreateMembers(req.body, req.user.id);

  res.status(201).json({
    success: true,
    message: "Members imported successfully",
    ...result,
  });
});
