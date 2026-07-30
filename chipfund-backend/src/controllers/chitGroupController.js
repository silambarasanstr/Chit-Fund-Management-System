import * as chitGroupService from "../services/chitGroupService.js";

// Create
export const create = async (req, res) => {
  try {
    const chitGroup = await chitGroupService.createChitGroup({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Chit Group created successfully",
      data: chitGroup,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All
export const getAll = async (req, res) => {
  try {
    const groups = await chitGroupService.getAllChitGroups();

    res.json({
      success: true,
      count: groups.length,
      data: groups,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get By Id
export const getById = async (req, res) => {
  try {
    const group = await chitGroupService.getChitGroupById(req.params.id);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Chit Group not found",
      });
    }

    res.json({
      success: true,
      data: group,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update
export const update = async (req, res) => {
  try {
    const group = await chitGroupService.updateChitGroup(
      req.params.id,
      req.body
    );

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Chit Group not found",
      });
    }

    res.json({
      success: true,
      message: "Chit Group updated successfully",
      data: group,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete
export const remove = async (req, res) => {
  try {
    const group = await chitGroupService.deleteChitGroup(req.params.id);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Chit Group not found",
      });
    }

    res.json({
      success: true,
      message: "Chit Group deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};