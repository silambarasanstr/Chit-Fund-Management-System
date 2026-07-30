import Bid from "../models/Bid.js";

export const createBid = async (data) => {
  return await Bid.create(data);
};

export const getAllBids = async () => {
  return await Bid.find()
    .populate("auction")
    .populate("member");
};

export const getBidById = async (id) => {
  return await Bid.findById(id)
    .populate("auction")
    .populate("member");
};

export const updateBid = async (id, data) => {
  return await Bid.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteBid = async (id) => {
  return await Bid.findByIdAndDelete(id);
};