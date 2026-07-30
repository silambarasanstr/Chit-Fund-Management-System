import express from "express";
import {
  createAuction,
  getAuctions,
  getAuctionById,
  updateAuction,
  deleteAuction,
} from "../controllers/auctionController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizeRoles.js";

const router = express.Router();

router.post("/", authMiddleware, authorizeRoles("admin"), createAuction);

router.get("/", authMiddleware, getAuctions);

router.get("/:id", authMiddleware, getAuctionById);

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  updateAuction
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteAuction
);

export default router;