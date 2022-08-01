const sharp = require("sharp");
const { readFileSync } = require("fs");

/* Resizing the image to 864x1080 and converting it to png. */
module.exports = async (file) => {
  await sharp(readFileSync(file.path))
    .resize({
      width: 864,
      height: 1080,
      fit: "contain",
    })
    .jp2({
      quality: 75,
    })
    .jpeg({
      quality: 75,
    })
    .png({
      quality: 75,
    })
    .toFile(file.path);
  return true;
};
