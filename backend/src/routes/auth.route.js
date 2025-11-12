import express from "express";
import {
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middlewares.js";
const router = express.Router();
/**
 * @route   POST /api/auth/register
 * @desc    Đăng ký user mới (luôn là 'reader')
 * @access  Public
 */
router.post("/register", register);
/**
 * @route   POST /api/auth/login
 * @desc    Đăng nhập user
 * @access  Public
 */
router.post("/login", login);
/**
 * @route   POST /api/auth/logout
 * @desc    Dang xuat
 * @access  Private
 */
router.post("/logout",protectRoute, logout);
/**
 * @route   POST /api/auth/refresh-token
 * @desc    Refresh Token
 * @access  public
 */
router.post("/refresh-token", refreshToken);
export default router;
