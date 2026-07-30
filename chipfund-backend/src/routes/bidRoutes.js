import express from "express";
import * as bidController from "../controllers/bidController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, bidController.createBid);

router.get("/", authMiddleware, bidController.getAllBids);

router.get("/:id", authMiddleware, bidController.getBidById);

router.put("/:id", authMiddleware, bidController.updateBid);

router.delete("/:id", authMiddleware, bidController.deleteBid);

export default router;