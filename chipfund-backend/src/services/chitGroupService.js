import ChitGroup from "../models/ChitGroup.js";

export const createChitGroup = async (data) => {
  return await ChitGroup.create(data);
};

export const getAllChitGroups = async () => {
  return await ChitGroup.find().populate(
    "createdBy",
    "name email role"
  );
};

export const getChitGroupById = async (id) => {
  return await ChitGroup.findById(id).populate(
    "createdBy",
    "name email role"
  );
};

export const updateChitGroup = async (id, data) => {
  return await ChitGroup.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).populate(
    "createdBy",
    "name email role"
  );
};

export const deleteChitGroup = async (id) => {
  return await ChitGroup.findByIdAndDelete(id).populate(
    "createdBy",
    "name email role"
  );
};