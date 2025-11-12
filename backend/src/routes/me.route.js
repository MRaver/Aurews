import express from "express";
import { protectRoute } from "../middlewares/auth.middlewares.js";
import { getProfile, updateProfile } from "../controllers/me.controller.js";

/*Quản lý thông tin cá nhân */
const router = express.Router();
router.use(protectRoute);
// === Profile & Preferences ===
/**
 * @route   GET /api/me
 * @desc    Lấy thông tin profile của user đang đăng nhập
 */
router.get("/", getProfile);
/**
 * @route   PUT /api/me
 * @desc    Cập nhật profile (fullName, bio, avatar)
 */
router.put("/", updateProfile);
// /**
//  * @route   GET /api/me/preferences
//  * @desc    Lấy cài đặt (preferences)
//  */
// router.get("/preferences", getPreferences);
// /**
//  * @route   PUT /api/me/preferences
//  * @desc    Cập nhật cài đặt (preferences)
//  */
// router.put("/preferences", updatePreferences);
// // === Bookmarks (Bài đã lưu) ===
// /**
//  * @route   GET /api/me/bookmarks
//  * @desc    Lấy danh sách bài viết đã lưu
//  */
// router.get("/bookmarks", getBookmarks);
// /**
//  * @route   POST /api/me/bookmarks/:postId
//  * @desc    Lưu (bookmark) một bài viết
//  */
// router.post("/bookmarks/:postId", saveBookmark);
// /**
//  * @route   DELETE /api/me/bookmarks/:postId
//  * @desc    Bỏ lưu (un-bookmark) một bài viết
//  */
// router.delete("/bookmarks/:postId", deleteBookmark);
// // === Following (Theo dõi tác giả) ===
// /**
//  * @route   POST /api/me/follow/:authorId
//  * @desc    Theo dõi một tác giả
//  */
// router.post("/follow/:authorId", followAuthor);
// /**
//  * @route   DELETE /api/me/follow/:authorId
//  * @desc    Bỏ theo dõi một tác giả
//  */
// router.delete("/follow/:authorId", unfollowAuthor);
export default router;
