import jwt from "jsonwebtoken";
import { redis } from "../lib/redis.js";
import User from "../models/user.model.js";
import { generateTokens, storeRefreshToken } from "../lib/token.js";
import { setCookies } from "../lib/cookie.js";

export const register = async (req, res) => {
  try {
    const { email, password, username, fullName } = req.body;
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email or username already exists",
      });
    }

    const user = new User({
      email,
      password,
      username,
      fullName,
      role: "reader",
    });
    await user.save();
    const { accessToken, refreshToken } = generateTokens(user._id);

    await storeRefreshToken(user._id, refreshToken);
    setCookies(res, accessToken, refreshToken);
    const sendInfo = await User.findById(user._id);
    res
      .status(200)
      .json({ success: true, message: "Register successful", user: sendInfo });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check if account is active
    if (user.isBanned) {
      return res.status(403).json({
        success: false,
        message: "Banned account",
      });
    }
    user.lastLogin = Date.now();
    await user.save();
    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);
    setCookies(res, accessToken, refreshToken);

    const sendInfo = await User.findById(user._id);
    res
      .status(200)
      .json({ success: true, message: "Login successful", user: sendInfo });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const logout = async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    if (!accessToken || !refreshToken) {
      res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const decodedRefresh = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );
    const decodedAccess = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET
    );
    if (decodedAccess.userId !== decodedRefresh.userId)
      return res.status(403).json({ success: false, message: "Action denied" });
    await redis.del(`refresh_token:${decodedRefresh.userId}`);
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error:", error: error.message });
    console.log("Error in logout controller:", error.message);
  }
};
export const refreshToken = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error in refreshToken controller: ", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
