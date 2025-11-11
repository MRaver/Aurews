// OPTIMIZED POST MODEL FOR NEWS SCRAPER DATA
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    // === BASIC INFO ===
    source: {
      type: String,
      required: true,
      trim: true,
      index: true,
      description: "News source name (e.g., 'Bbc', 'Cnn')",
    }, // [cite: 1]

    sourceUrl: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      description: "Original article URL",
    }, // [cite: 2]

    // === CATEGORIZATION ===
    category: {
      type: String,
      required: true,
      enum: [
        "news",
        "technology",
        "sports",
        "entertainment",
        "business",
        "health",
        "politics",
        "science",
        "other",
      ], // [cite: 3]
      index: true,
      description: "Article category",
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    // === CONTENT ===
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 300,
      index: "text",
      description: "Article title",
    },

    slug: {
      type: String,
      unique: true, //
      trim: true,
      lowercase: true,
      index: true,
      description: "URL-friendly slug",
    },

    summary: {
      type: String,
      trim: true,
      maxLength: 1000,
      description: "Brief summary or excerpt",
    },

    text: {
      type: String,
      required: true,
      index: "text", //
      description: "Full article content",
    },

    // === CONTENT METRICS ===
    chars: {
      type: Number,
      default: 0, //
      description: "Total character count",
    },

    words: {
      type: Number,
      default: 0,
      description: "Total word count",
    },

    readTime: {
      type: Number,
      default: 1,
      description: "Estimated reading time in minutes",
    },

    // === AUTHOR INFO ===

    // author: Dùng cho dữ liệu cào (scraped)
    author: {
      name: {
        type: String,
        trim: true,
        default: "Unknown", //
      },
      avatar: String,
      bio: String,
    },

    // TỐI ƯU HÓA: Thêm liên kết đến model User (cho tác giả nội bộ)
    // Trường này sẽ là null cho các bài cào, không ảnh hưởng JSON
    authorUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
      default: null,
      description: "Link to internal User model (if posted by internal author)",
    },

    // === MEDIA ===
    thumbnail: {
      type: String,
      description: "Main thumbnail image URL",
    },

    images: [
      {
        url: {
          type: String,
          required: true,
        },
        caption: String,
        alt: String,
      },
    ],

    videos: [
      {
        url: String,
        thumbnail: String,
        duration: Number, // [cite: 7]
        caption: String,
      },
    ],

    // === TIMESTAMPS ===
    publishTime: {
      type: Date,
      required: true,
      index: true,
      description: "Original publication date from source",
    },

    updatedTime: {
      type: Date,
      description: "Last update time from source",
    },

    scrapedAt: {
      type: Date,
      default: Date.now,
      description: "When this article was scraped",
    },

    // === ENGAGEMENT METRICS ===
    views: {
      type: Number,
      default: 0, // [cite: 8]
    },

    likes: {
      type: Number,
      default: 0,
    },

    shares: {
      type: Number,
      default: 0,
    },

    comments: {
      type: Number,
      default: 0,
    },

    // === STATUS & MODERATION ===
    status: {
      type: String,
      enum: ["draft", "published", "archived", "deleted"],
      default: "published",
      index: true, // [cite: 9]
    },

    featured: {
      type: Boolean,
      default: false,
      index: true,
    },

    verified: {
      type: Boolean,
      default: false,
      description: "Content verified by moderator",
    },

    // === SEO ===
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },

    // === LOCATION (if relevant) ===
    location: {
      country: String,
      city: String,
      coordinates: {
        // [cite: 10]
        lat: Number,
        lng: Number,
      },
    },

    // === LANGUAGE ===
    language: {
      type: String,
      default: "en",
      enum: ["en", "vi", "other"],
    },
  },
  {
    timestamps: true, // Adds createdAt & updatedAt automatically
    collection: "posts",
  }
);

// === INDEXES for Performance ===
// (Giữ nguyên các index của bạn, chúng rất tốt)
postSchema.index({ category: 1, publishTime: -1 }); // [cite: 11]
postSchema.index({ source: 1, publishTime: -1 });
postSchema.index({ featured: 1, publishTime: -1 }); // [cite: 12]
postSchema.index({ status: 1, publishTime: -1 });
postSchema.index({ "author.name": 1 });
postSchema.index({ tags: 1 });
postSchema.index({ views: -1 }); // [cite: 13]
postSchema.index({ scrapedAt: -1 });

// Full-text search index
postSchema.index({ title: "text", text: "text", summary: "text" }); // [cite: 13]

// === VIRTUAL FIELDS ===
postSchema.virtual("engagement").get(function () {
  return this.views + this.likes * 2 + this.shares * 3 + this.comments * 4;
}); // [cite: 14]

postSchema.virtual("imageCount").get(function () {
  return this.images ? this.images.length : 0;
}); // [cite: 15]

// === METHODS ===
// (Instance method)
postSchema.methods.incrementViews = async function () {
  this.views += 1;
  return this.save();
}; // [cite: 15-16]

postSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.engagement = this.engagement;
  obj.imageCount = this.imageCount;
  return obj;
}; // [cite: 16-17]

// === STATIC METHODS ===

// TỐI ƯU HÓA: Thêm .select() để loại bỏ các trường nặng
const LIGHTWEIGHT_PROJECTION = "-text -images -videos -seo -location -__v";

postSchema.statics.findFeatured = function (limit = 10) {
  return this.find({ status: "published", featured: true })
    .sort({ publishTime: -1 })
    .limit(limit)
    .select(LIGHTWEIGHT_PROJECTION); // <-- TỐI ƯU HÓA
}; //

postSchema.statics.findByCategory = function (category, limit = 20) {
  return this.find({ status: "published", category })
    .sort({ publishTime: -1 })
    .limit(limit)
    .select(LIGHTWEIGHT_PROJECTION); // <-- TỐI ƯU HÓA
}; //

postSchema.statics.findBySource = function (source, limit = 20) {
  return this.find({ status: "published", source })
    .sort({ publishTime: -1 })
    .limit(limit)
    .select(LIGHTWEIGHT_PROJECTION); // <-- TỐI ƯU HÓA
}; // [cite: 19]

postSchema.statics.searchPosts = function (keyword, limit = 50) {
  return this.find(
    { $text: { $search: keyword }, status: "published" },
    { score: { $meta: "textScore" } }
  )
    .sort({ score: { $meta: "textScore" } })
    .limit(limit)
    .select(LIGHTWEIGHT_PROJECTION); // <-- TỐI ƯU HÓA
}; // [cite: 20]

// TỐI ƯU HÓA: Thêm phương thức tĩnh để tăng view hiệu quả
// Phương thức này không cần tải toàn bộ document vào bộ nhớ
postSchema.statics.incrementViewsCount = function (postId) {
  return this.findByIdAndUpdate(postId, { $inc: { views: 1 } });
};

// (Các hàm aggregate không cần thay đổi, chúng đã chọn lọc trường)
postSchema.statics.getStatsByCategory = async function () {
  return this.aggregate([
    { $match: { status: "published" } },
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
        avgWords: { $avg: "$words" },
        avgReadTime: { $avg: "$readTime" },
        totalViews: { $sum: "$views" },
      },
    },
    { $sort: { count: -1 } },
  ]);
};

postSchema.statics.getStatsBySource = async function () {
  return this.aggregate([
    { $match: { status: "published" } },
    {
      $group: {
        _id: "$source",
        count: { $sum: 1 },
        avgWords: { $avg: "$words" },
        totalViews: { $sum: "$views" },
      },
    },
    { $sort: { count: -1 } },
  ]);
};

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
