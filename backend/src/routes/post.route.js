import express from "express";
import { authorize, protectRoute } from "../middlewares/auth.middlewares.js";
import { addComment, deleteComment, getComments, switchLike } from "../controllers/post.controller.js";

const router = express.Router;


//POST INTERACTION
/**
 * @route   POST /api/posts/:postId/like
 * @desc    Thích hoặc Bỏ thích (Toggle) một bài viết
 * @access  Private
 */
router.post('/posts/:postId/like',protectRoute, switchLike)

//POST COMMENT
/**
 * @route   POST /api/posts/:postId/comments
 * @desc    Thêm một bình luận mới (hoặc reply)
 * @access  Private
 */
router.post('/posts/:postId/comments',protectRoute, addComment)

/**
 * @route   GET /api/posts/:postId/comments
 * @desc    Lấy tất cả bình luận của một bài viết
 * @access  Public
 */
router.get('/posts/:postId/comments',protectRoute, getComments)

/**
 * @route   DELETE /api/comments/:commentId
 * @desc    Xóa một bình luận (chỉ chủ sở hữu hoặc admin)
 * @access  Private
 */
router.delete("/comments/:commentId", protectRoute, authorize("admin", "author"),deleteComment);