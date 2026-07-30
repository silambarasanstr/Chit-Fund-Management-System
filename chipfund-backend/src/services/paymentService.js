import Payment from "../models/Payment.js";

export const createPayment = async (data) => {
  return await Payment.create(data);
};

export const getPayments = async () => {
  return await Payment.find()
    .populate("member", "name memberCode")
    .populate("chitGroup", "groupName")
    .populate("installment", "installmentNo")
    .populate("collectedBy", "name")
    .sort({ createdAt: -1 });
};

export const getPaymentById = async (id) => {
  return await Payment.findById(id)
    .populate("member")
    .populate("chitGroup")
    .populate("installment")
    .populate("collectedBy");
};

export const updatePayment = async (id, data) => {
  return await Payment.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deletePayment = async (id) => {
  return await Payment.findByIdAndDelete(id);
};