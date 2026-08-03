import express from "express";
import { getDashboard } from "../controllers/dashboardController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizeRoles.js";

const router = express.Router();
router.get("/", getDashboard);

export default router;