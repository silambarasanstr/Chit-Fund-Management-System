import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running",
    timestamp: new Date(),
  });
});

export default router;