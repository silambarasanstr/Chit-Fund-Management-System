import * as bidService from "../services/bidService.js";

export const createBid = async (req, res) => {
  try {
    const bid = await bidService.createBid(req.body);

    res.status(201).json({
      success: true,
      data: bid,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllBids = async (req, res) => {
  try {
    const bids = await bidService.getAllBids();

    res.json({
      success: true,
      count: bids.length,
      data: bids,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBidById = async (req, res) => {
  try {
    const bid = await bidService.getBidById(req.params.id);

    if (!bid) {
      return res.status(404).json({
        success: false,
        message: "Bid not found",
      });
    }

    res.json({
      success: true,
      data: bid,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBid = async (req, res) => {
  try {
    const bid = await bidService.updateBid(req.params.id, req.body);

    if (!bid) {
      return res.status(404).json({
        success: false,
        message: "Bid not found",
      });
    }

    res.json({
      success: true,
      data: bid,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBid = async (req, res) => {
  try {
    const bid = await bidService.deleteBid(req.params.id);

    if (!bid) {
      return res.status(404).json({
        success: false,
        message: "Bid not found",
      });
    }

    res.json({
      success: true,
      message: "Bid deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};