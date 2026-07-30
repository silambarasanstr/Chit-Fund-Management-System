import * as dashboardService from "../services/dashboardService.js";

export const getDashboard = async (req, res) => {
  try {
    const dashboard = await dashboardService.getDashboard();

    res.status(200).json({
      success: true,
      message: "Dashboard fetched successfully",
      data: dashboard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};