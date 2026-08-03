import express from "express";
import {
  createPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
  getMyPayments,
} from "../controllers/paymentController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);



// Member
router.get("/my-payments", getMyPayments);



router.post("/", createPayment);

router.get("/", getPayments);

router.get("/:id", getPaymentById);

router.put("/:id", updatePayment);

router.delete("/:id", deletePayment);

export default router;