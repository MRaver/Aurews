import mongoose from "mongoose";
const commentSchema = new mongoose.Schema(
  {
    // Bài viết được bình luận
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
      index: true,
    },
    // Người bình luận
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    // Nội dung
    text: {
      type: String,
      required: true,
      trim: true,
    },

    // Dành cho trả lời (Reply): 'parentComment' trỏ đến bình luận gốc
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },

    // Dùng cho Xóa Mềm (Soft Delete)
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, collection: "comments" }
);

commentSchema.post("save", async function (doc) {
  try {
    // Tăng bộ đếm "comments" trên model Post
    if (this._wasNew) {
      // Tăng bộ đếm "comments" trên model Post
      await Post.findByIdAndUpdate(doc.post, { $inc: { comments: 1 } });
    }
  } catch (error) {
    console.error("Error in increase comment counter:", error);
  }
});
commentSchema.post("remove", async function (doc) {
  try {
    // Giảm bộ đếm "comments" trên model Post
    await Post.findByIdAndUpdate(doc.post, { $inc: { comments: -1 } });

    // (Nâng cao): Xóa tất cả các bình luận con (replies)
    if (!doc.parentComment) {
      await mongoose.model("Comment").deleteMany({ parentComment: doc._id });
    }
  } catch (error) {
    console.error("Error in decrease comment counter:", error);
  }
});
const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
