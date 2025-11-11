const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = "uploads/";
    if (file.fieldname === "identityCard") uploadPath += "identity/";
    else if (file.fieldname === "certificates") uploadPath += "certificates/";
    else if (file.fieldname === "portfolio") uploadPath += "portfolio/";
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
}); // Giới hạn 10MB

// Middleware upload cho đơn ứng tuyển
export const authorApplicationUpload = upload.fields([
  { name: "identityCard", maxCount: 1 },
  { name: "certificates", maxCount: 5 },
  { name: "portfolio", maxCount: 10 },
]);
// --- Kết thúc Cấu hình Multer ---
