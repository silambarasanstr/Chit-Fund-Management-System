import express from "express";
import {
  createMember,
  getMembers,
  getMemberById,
  updateMember,
  deleteMember,
  bulkDeleteMembers,
  importMembers,
} from "../controllers/memberController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizeRoles.js";

const router = express.Router();

// Protect all member routes
router.use(authMiddleware);
router.use(authorizeRoles("admin"));

// Bulk APIs
router.post("/bulk-import", importMembers);
router.delete("/bulk-delete", bulkDeleteMembers);

router.post("/", createMember);
router.get("/", getMembers);
router.get("/:id", getMemberById);
router.put("/:id", updateMember);
router.delete("/:id", deleteMember);

export default router;
