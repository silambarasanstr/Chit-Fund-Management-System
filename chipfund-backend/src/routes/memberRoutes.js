import express from "express";
import {
  createMember,
  getMembers,
  getMemberById,
  updateMember,
  deleteMember,
} from "../controllers/memberController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizeRoles.js";

const router = express.Router();

// Authentication
// router.use(authMiddleware);

// Authorization (Admin only)
// router.use(authorizeRoles("admin"));

// ===============================
// Member Routes
// ===============================
router.post("/", createMember);

router.get("/", getMembers);

router.get("/:id", getMemberById);

router.put("/:id", updateMember);

router.delete("/:id", deleteMember);

export default router;