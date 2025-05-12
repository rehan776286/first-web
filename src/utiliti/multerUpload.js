import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./storage");
  },
  filename: (res, file, cb) => {
    const filePath = Date.now() + path.extname(file.originalname);
    cb(null, filePath);
  },
});

const fileFilter = (req, file, cb) => {
  const allowFile = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "video/mp4",
    "video/webm",
  ];
  if (!allowFile.includes(file.mimetype)) {
    return cb(new Error("file unsuported"));
  }
  cb(null, true);
};

const uploader = multer({ storage, fileFilter });

export default uploader;
