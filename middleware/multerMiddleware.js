import multer from "multer";
import DataParser from "datauri/parser.js";
import path from "path";
import sharp from "sharp";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/uploads");
//   },
//   filename: (req, file, cb) => {
//     const fileName = file.originalname;
//     cb(null, fileName);
//   },
// });
// const upload = multer({ storage });

const storage = multer.memoryStorage();

const upload = multer({ storage });

const parser = new DataParser();

export const formatImage = async (file) => {
  const fileExtension = path.extname(file.originalname).toString();
  const resizedImageBuffer = await sharp(file.buffer)
    .resize({ width: 500, height: 500 })
    .jpeg({ quality: 70 }) // Adjust quality as needed
    .toBuffer();

  return parser.format(fileExtension, resizedImageBuffer).content;
};

export default upload;
