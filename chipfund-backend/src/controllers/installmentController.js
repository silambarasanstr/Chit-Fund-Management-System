import * as installmentService from "../services/installmentService.js";

// Create
export const createInstallment = async (req, res) => {
  try {
    const installment = await installmentService.createInstallment(req.body);

    res.status(201).json({
      success: true,
      message: "Installment created successfully",
      data: installment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All
export const getInstallments = async (req, res) => {
  try {
    const installments = await installmentService.getAllInstallments();

    res.status(200).json({
      success: true,
      count: installments.length,
      data: installments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get One
export const getInstallment = async (req, res) => {
  try {
    const installment = await installmentService.getInstallmentById(
      req.params.id,
    );

    if (!installment) {
      return res.status(404).json({
        success: false,
        message: "Installment not found",
      });
    }

    res.status(200).json({
      success: true,
      data: installment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update
export const updateInstallment = async (req, res) => {
  try {
    const installment = await installmentService.updateInstallment(
      req.params.id,
      req.body,
    );

    if (!installment) {
      return res.status(404).json({
        success: false,
        message: "Installment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Installment updated successfully",
      data: installment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete
export const deleteInstallment = async (req, res) => {
  try {
    const installment = await installmentService.deleteInstallment(
      req.params.id,
    );

    if (!installment) {
      return res.status(404).json({
        success: false,
        message: "Installment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Installment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Pay Installment
export const payInstallment = async (req, res) => {
  try {
    const installment = await installmentService.payInstallment(req.params.id);

    res.status(200).json({
      success: true,
      message: "Installment paid successfully",
      data: installment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyInstallments = async (req, res) => {
  try {
    console.log(req.user,"===> user");
    const installments = await installmentService.getMyInstallmentsService(
      req.user.id,
    );

    res.status(200).json({
      success: true,
      count: installments.length,
      data: installments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
