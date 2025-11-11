import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
/**
 * @desc    Middleware kiểm tra user đã đăng nhập chưa
 */
export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthenticated" });
    }
    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
      const user = await User.findbyId(decoded.userId).select("-password");
      if (!user)
        return res
          .status(401)
          .json({ success: false, message: "User not found" });
      if (req.user.isBanned) {
        return res.status(403).json({ success: false, message: "Banned user" });
      }
      req.user = user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Unauthorized - Access token expired" });
      }
      throw error;
    }
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

/**
 * @desc    Middleware kiểm tra vai trò (phân quyền)
 * @example authorize('admin') // Chỉ admin
 * @example authorize('admin', 'author') // Admin hoặc Author
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role) && req.user) {
      next();
    } else
      return res.status(403).json({ success: false, message: "Access Denied" });
  };
};
