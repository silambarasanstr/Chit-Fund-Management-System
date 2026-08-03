import Payment from "../models/Payment.js";
import Member from "../models/Member.js";

export const createPayment = async (data) => {
  console.log(data,"===>createPayment");
  return await Payment.create(data);
};

export const getPayments = async () => {
  console.log("===>getPayments");
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





export const getMyPaymentsService = async (userId) => {
  console.log(userId,"===>userIdPayment2");
  const member = await Member.findOne({ user: userId });
  console.log(member,"===>memberPayment2");
  if (!member) {
    throw new Error("Member not found");
  }
  console.log(member._id);
  const payments = await Payment.find({ member: member._id })
    .populate("member", "memberId name")
    .populate("chitGroup", "groupName chitAmount")
    .populate("installment", "installmentNo dueAmount status")
    .populate("collectedBy", "name email")
    .sort({ paymentDate: -1 });
    console.log(payments,"===>paymentsPayment2");

  return payments;
};