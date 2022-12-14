const sharp = require("sharp");
const { readFileSync } = require("fs");

/* Resizing the image to 864x1080 and converting it to png. */
module.exports = async (file) => {
  await sharp(readFileSync(file.path))
    .toFormat("png")
    .png({
      quality: 75,
    })
    .toFile(file.path);
  return true;
};
