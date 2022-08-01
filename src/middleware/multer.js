const multer = require("multer");
const { join } = require("path");
const crypto = require("crypto");
const path = require("path");

const extensions = ["jpg", "png"];

module.exports = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, join(__dirname, "../temp/"));
    },
    filename: (req, file, cb) => {
      cb(null, `${crypto.randomUUID() + path.extname(file.originalname)}`);
    },
  }),
});
