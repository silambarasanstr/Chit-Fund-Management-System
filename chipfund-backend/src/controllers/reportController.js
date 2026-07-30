import * as reportService from "../services/reportService.js";

// ======================================
// Dashboard Report
// ======================================
export const getDashboardReport = async (req, res, next) => {
  try {
    const report = await reportService.getDashboardReport();

    res.status(200).json({
      success: true,
      message: "Dashboard report fetched successfully",
      data: report,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================
// Member Report
// ======================================
export const getMemberReport = async (req, res, next) => {
  try {
    const report = await reportService.getMemberReport();

    res.status(200).json({
      success: true,
      message: "Member report fetched successfully",
      data: report,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================
// Chit Group Report
// ======================================
export const getGroupReport = async (req, res, next) => {
  try {
    const report = await reportService.getGroupReport();

    res.status(200).json({
      success: true,
      message: "Group report fetched successfully",
      data: report,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================
// Payment Report
// ======================================
export const getPaymentReport = async (req, res, next) => {
  try {
    const report = await reportService.getPaymentReport(req.query);

    res.status(200).json({
      success: true,
      message: "Payment report fetched successfully",
      data: report,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================
// Auction Report
// ======================================
export const getAuctionReport = async (req, res, next) => {
  try {
    const report = await reportService.getAuctionReport();

    res.status(200).json({
      success: true,
      message: "Auction report fetched successfully",
      data: report,
    });
  } catch (error) {
    next(error);
  }
};