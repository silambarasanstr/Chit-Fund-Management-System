import * as auctionService from "../services/auctionService.js";

export const createAuction = async (req, res) => {
  try {
    const auction = await auctionService.createAuction(req.body);

    res.status(201).json({
      success: true,
      message: "Auction created successfully",
      data: auction,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAuctions = async (req, res) => {
  try {
    const auctions = await auctionService.getAuctions();

    res.json({
      success: true,
      count: auctions.length,
      data: auctions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAuctionById = async (req, res) => {
  try {
    const auction = await auctionService.getAuctionById(req.params.id);

    if (!auction) {
      return res.status(404).json({
        success: false,
        message: "Auction not found",
      });
    }

    res.json({
      success: true,
      data: auction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateAuction = async (req, res) => {
  try {
    const auction = await auctionService.updateAuction(
      req.params.id,
      req.body
    );

    if (!auction) {
      return res.status(404).json({
        success: false,
        message: "Auction not found",
      });
    }

    res.json({
      success: true,
      message: "Auction updated successfully",
      data: auction,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteAuction = async (req, res) => {
  try {
    const auction = await auctionService.deleteAuction(req.params.id);

    if (!auction) {
      return res.status(404).json({
        success: false,
        message: "Auction not found",
      });
    }

    res.json({
      success: true,
      message: "Auction deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};