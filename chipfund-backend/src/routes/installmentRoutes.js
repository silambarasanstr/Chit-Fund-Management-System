import express from "express";
import {
  createInstallment,
  getInstallments,
  getInstallment,
  updateInstallment,
  deleteInstallment,
  payInstallment,
} from "../controllers/installmentController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizeRoles.js";

const router = express.Router();

router.use(authMiddleware);

// Admin Only
router.post("/", authorizeRoles("admin"), createInstallment);
router.put("/:id", authorizeRoles("admin"), updateInstallment);
router.delete("/:id", authorizeRoles("admin"), deleteInstallment);
router.patch("/:id/pay", authorizeRoles("admin"), payInstallment);

// Admin & Member
router.get("/", getInstallments);
router.get("/:id", getInstallment);

export default router;