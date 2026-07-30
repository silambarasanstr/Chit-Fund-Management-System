import Auction from "../models/Auction.js";

export const createAuction = async (data) => {
  return await Auction.create(data);
};

export const getAuctions = async () => {
  return await Auction.find()
    .populate("chitGroup", "groupName")
    .populate("installment", "installmentNo")
    .populate("winner", "memberCode fullName");
};

export const getAuctionById = async (id) => {
  return await Auction.findById(id)
    .populate("chitGroup", "groupName")
    .populate("installment", "installmentNo")
    .populate("winner", "memberCode fullName");
};

export const updateAuction = async (id, data) => {
  return await Auction.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteAuction = async (id) => {
  return await Auction.findByIdAndDelete(id);
};