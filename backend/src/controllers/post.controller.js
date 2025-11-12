import Comment from "../models/comment.model.js";
import Like from "../models/like.model.js";
import Post from "../models/post.model.js";

export const switchLike = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId } = req.params;
    const post = await Post.findOne({
      _id: postId,
      status: { $ne: "deleted" },
    });
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    const existingLike = await Like.findOne({ user: userId, post: postId });
    if (existingLike) {
      await existingLike.remove();
      return res.status(200).json({ success: true, message: "Post disliked" });
    }
    const newLike = new Like({ user: userId, post: postId });
    await newLike.save();
    res.status(201).json({ success: true, message: "Post liked" });
  } catch (error) {
    console.log("Error in switchLike controller:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const addComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId } = req.params;
    const { text, parentCommentId } = req.body;
    const post = await Post.findOne({
      _id: postId,
      status: { $ne: "deleted" },
    });
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    const comment = await Comment.findById({ parentCommentId });
    const newComment = new Comment({
      post: postId,
      user: userId,
      text: text,
      parentComment: comment ? parentCommentId : null,
    });
    await newComment.save();
    // Populate user info để hiển thị ngay lập hức ở frontend
    await newComment.populate("user", "username fullName avatar"); // De hien thi comment
    res
      .status(201)
      .json({ success: true, message: "Commented", data: newComment });
  } catch (error) {
    console.log("Error in addComment controller:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findOne({
      _id: postId,
      status: { $ne: "deleted" },
    });
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    const allComments = await Comment.find({ post: postId, isDeleted: false });
    // 2. Xử lý lồng nhau (threading)
    const commentMap = {};
    const topLevelComments = [];

    for (const comment of allComments) {
      commentMap[comment._id] = comment.toObject(); // Chuyển sang object
      commentMap[comment._id].replies = []; // Thêm mảng replies
    }

    for (const comment of allComments) {
      if (comment.parentComment) {
        // Đây là một reply
        if (commentMap[comment.parentComment]) {
          commentMap[comment.parentComment].replies.push(
            commentMap[comment._id]
          );
        }
      } else {
        // Đây là bình luận gốc (top-level)
        topLevelComments.push(commentMap[comment._id]);
      }
    }

    res.status(200).json({ success: true, data: topLevelComments });
  } catch (error) {
    onsole.log("Error in getComments controller:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const deleteComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { commentId } = req.params;
    const comment = await Comment.findOne({ _id: commentId, isDeleted: false });
    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }
    if (comment.user.toString() !== userId && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Action denied",
      });
    }
    comment.isDeleted = true;
    await comment.save();
    //giảm bộ đếm khi xóa mềm
    await Post.findByIdAndUpdate(comment.post, { $inc: { comments: -1 } });
    res.status(200).json({ success: true, message: "Comment deleted" });
  } catch (error) {
    onsole.log("Error in getComments controller:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
