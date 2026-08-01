import express from "express";
import {
  createGroupMember,
  getAllGroupMembers,
  getGroupMemberById,
  updateGroupMember,
  deleteGroupMember,
  getMembersByGroup,
  getGroupsByMember,
} from "../controllers/groupMemberController.js";

const router = express.Router();

router.post("/", createGroupMember);

router.get("/", getAllGroupMembers);

router.get("/group/:groupId", getMembersByGroup);

router.get("/member/:memberId", getGroupsByMember);

router.get("/:id", getGroupMemberById);

router.put("/:id", updateGroupMember);

router.delete("/:id", deleteGroupMember);

export default router;
