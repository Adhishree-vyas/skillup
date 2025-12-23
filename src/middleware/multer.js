import multer from "multer";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();

// absolute uploads path
const uploadDir = path.join(__dirname, "src", "uploads");

// ensure folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log("📁 Saving to:", uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    //  console.log("📄 File received:", file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export default upload;
