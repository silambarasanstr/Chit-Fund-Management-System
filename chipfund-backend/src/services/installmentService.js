import Installment from "../models/Installment.js";

// Create Installment
export const createInstallment = async (data) => {
  return await Installment.create(data);
};

// Get All Installments
export const getAllInstallments = async () => {
  return await Installment.find()
    .populate("group", "groupName")
    .populate("member", "name");
};

// Get Installment By ID
export const getInstallmentById = async (id) => {
  return await Installment.findById(id)
    .populate("group", "groupName")
    .populate("member", "name");
};

// Update Installment
export const updateInstallment = async (id, data) => {
  return await Installment.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// Delete Installment
export const deleteInstallment = async (id) => {
  return await Installment.findByIdAndDelete(id);
};

// Mark Installment as Paid
export const payInstallment = async (id) => {
  const installment = await Installment.findById(id);

  if (!installment) {
    throw new Error("Installment not found");
  }

  installment.paidAmount = installment.dueAmount;
  installment.paymentDate = new Date();
  installment.status = "Paid";

  return await installment.save();
};