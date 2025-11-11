// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    // === THÔNG TIN CƠ BẢN ===
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: { type: String, required: true, minlength: 6, select: false },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
      index: true,
    },
    fullName: { type: String, required: true, trim: true },
    avatar: { type: String, default: null },
    bio: { type: String, maxlength: 500, default: "" },

    // === VAI TRÒ & TRẠNG THÁI ===
    role: {
      type: String,
      enum: ["reader", "author", "admin"], //
      default: "reader",
      index: true,
    },
    isVerified: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
    bannedUntil: Date,
    banReason: String,
    lastLogin: Date,
    // === LIÊN KẾT 1-1 (TỐI ƯU HÓA) ===
    // Liên kết đến đơn ứng tuyển (nếu có)
    authorApplication: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AuthorApplication",
    },
    // Liên kết đến thống kê tác giả (nếu là author)
    authorStats: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AuthorStats",
    },
  },
  { timestamps: true }
);

// Hash password trước khi lưu
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// So sánh password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
