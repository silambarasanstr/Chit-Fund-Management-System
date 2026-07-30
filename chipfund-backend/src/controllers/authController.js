import asyncHandler from "express-async-handler";
import * as authService from "../services/authService.js";

// @desc    Register User
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result.user,
    token: result.token,
  });
});

// @desc    Login User
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const result = await authService.loginUser(req.body);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result.user,
    token: result.token,
  });
});

// @desc    Get Current Logged In User
// @route   GET /api/auth/me
// @access  Private
export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await authService.getCurrentUser(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});