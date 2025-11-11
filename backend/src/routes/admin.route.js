// import express from "express";
// import { authorize, protectRoute } from "../middlewares/auth.middlewares.js";
// const router = express.Router();
// router.use(protectRoute, authorize("admin"));

// // === Quản lý Đơn ứng tuyển ===

// /**
//  * @route   GET /api/admin/applications
//  * @desc    Lấy danh sách đơn ứng tuyển (chờ duyệt, đã duyệt...)
//  * @access  Admin
//  */
// router.get("/applications", getApplications);
// /**
//  * @route   PUT /api/admin/applications/:appId/approve
//  * @desc    Duyệt (chấp nhận) đơn xin làm tác giả
//  * @access  Admin
//  */
// router.put("/applications/:appId/approve", approveApplications);
// /**
//  * @route   PUT /api/admin/applications/:appId/reject
//  * @desc    Từ chối đơn xin làm tác giả
//  * @access  Admin
//  */
// router.put("/applications/:appId/reject", rejectApplications);

// // === Quản lý Người dùng ===
// /**
//  * @route   GET /api/admin/users
//  * @desc    Lấy danh sách người dùng (phân trang, lọc)
//  * @access  Admin
//  */
// router.get("/users", getUsers);
// /**
//  * @route   PUT /api/admin/users/:userId/ban
//  * @desc    Cấm (Ban) hoặc gỡ cấm một user
//  * @access  Admin
//  */
// router.put("/users/:userId/ban", switchBan);
// // === Quản lý Bài viết (Duyệt bài) ===
// /**
//  * @route   PUT /api/admin/posts/:postId/status
//  * @desc    Duyệt bài (chuyển 'draft' -> 'published' hoặc ngược lại)
//  * @access  Admin
//  */
// router.put("/posts/:postId/status", acceptPost);
// export default router;
