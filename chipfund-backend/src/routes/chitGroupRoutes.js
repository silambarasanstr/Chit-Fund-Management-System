import express from "express";
import * as chitGroupController from "../controllers/chitGroupController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizeRoles.js";

const router = express.Router();

// Admin Only
router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  chitGroupController.create
);

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  chitGroupController.update
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  chitGroupController.remove
);

// Logged in Users
router.get(
  "/",
  authMiddleware,
  chitGroupController.getAll
);

router.get(
  "/:id",
  authMiddleware,
  chitGroupController.getById
);

export default router;