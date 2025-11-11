// models/AuthorApplication.js
import mongoose from "mongoose";

const authorApplicationSchema = new mongoose.Schema(
  {
    // Liên kết 1-1 chặt chẽ với User
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // Đảm bảo mỗi user chỉ có 1 đơn
      index: true,
    },

    // Trạng thái đơn
    status: {
      type: String,
      enum: ["none", "pending", "approved", "rejected"],
      default: "none",
    },
    submittedAt: Date,
    reviewedAt: Date,
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    motivation: {
      type: String,
      maxlength: 1000,
      description: "Why want to become author",
    },
    experience: {
      type: String,
      maxlength: 2000,
      description: "Writing experience and background",
    },

    documents: {
      identityCard: {
        url: String,
        fileName: String,
        uploadedAt: Date,
        require: true,
      },
      certificates: [
        {
          url: String,
          fileName: String,
          title: String,
          uploadedAt: Date,
        },
      ],
      portfolio: [
        {
          url: String,
          fileName: String,
          fileType: String,
          title: String,
          description: String,
          uploadedAt: Date,
        },
      ],
    },

    externalLinks: {
      sampleArticles: [
        {
          url: String,
          title: String,
          description: String,
        },
      ],
      socialMedia: {
        twitter: String,
        linkedin: String,
        facebook: String,
        website: String,
        other: String,
      },
    },

    adminNotes: String,
    rejectionReason: String,
  },
  { timestamps: true, collection: "author_applications" }
);

const AuthorApplication = mongoose.model(
  "AuthorApplication",
  authorApplicationSchema
);
export default AuthorApplication;
