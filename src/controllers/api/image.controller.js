const { dropbox, sharp } = require("../../helpers");
const { unlinkSync } = require("fs");

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
  let images = req.files;
  let result = [];

  for (let i = 0; i < images.length; i++) {
    await sharp(images[i]);
    result.push(
      await dropbox.upload(
        images[i].path,
        `/pulperia_v2/store/${images[i].filename}`
      )
    );
    unlinkSync(images[i].path);
  }

  return res.status(200).json({
    status: 200,
    smg: "great :)",
    data: result,
    length: result.length,
  });
};
