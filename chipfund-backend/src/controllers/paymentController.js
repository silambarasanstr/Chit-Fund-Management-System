import * as paymentService from "../services/paymentService.js";

export const createPayment = async (req, res) => {
  console.log(req.body,"===>xxxcreatePayment");
  try {
    const payment = await paymentService.createPayment(req.body);

    res.status(201).json({
      success: true,
      message: "Payment created successfully",
      data: payment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPayments = async (req, res) => {
  console.log( req.query,"===>getPayments");
  try {
    const payments = await paymentService.getPayments();

    res.json({
      success: true,
      count: payments.length,
      data: payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPaymentById = async (req, res) => {
  try {
    const payment = await paymentService.getPaymentById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.json({
      success: true,
      data: payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePayment = async (req, res) => {
  try {
    const payment = await paymentService.updatePayment(
      req.params.id,
      req.body
    );

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.json({
      success: true,
      message: "Payment updated successfully",
      data: payment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deletePayment = async (req, res) => {
  try {
    const payment = await paymentService.deletePayment(req.params.id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.json({
      success: true,
      message: "Payment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




export const getMyPayments = async (req, res) => {
  console.log(req.user.id,"===>userIdPayment2");
  try {
    const payments = await paymentService.getMyPaymentsService(req.user.id);

    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


