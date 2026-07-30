import express from "express";

import {
  getDashboardReport,
  getMemberReport,
  getGroupReport,
  getPaymentReport,
  getAuctionReport,
} from "../controllers/reportController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizeRoles.js";

const router = express.Router();

// Protect all report routes
router.use(authMiddleware);

// Admin only
router.use(authorizeRoles("admin"));

// Dashboard
router.get("/dashboard", getDashboardReport);

// Members Report
router.get("/members", getMemberReport);

// Groups Report
router.get("/groups", getGroupReport);

// Payments Report
router.get("/payments", getPaymentReport);

// Auctions Report
router.get("/auctions", getAuctionReport);

export default router;