import express from "express";
import {
  createInstallment,
  getInstallments,
  getInstallment,
  updateInstallment,
  deleteInstallment,
  payInstallment,
  getMyInstallments,
} from "../controllers/installmentController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizeRoles.js";

const router = express.Router();

router.use(authMiddleware);

// Admin Only
router.post("/", authorizeRoles("admin"), createInstallment);
router.put("/:id", authorizeRoles("admin"), updateInstallment);
router.delete("/:id", authorizeRoles("admin"), deleteInstallment);
router.post("/:id/pay", authorizeRoles("admin"), payInstallment);

// Admin & Member
router.get("/", getInstallments);

// Logged-in member installments
router.get("/my-installments", getMyInstallments);

// Single installment
router.get("/:id", getInstallment);

export default router;