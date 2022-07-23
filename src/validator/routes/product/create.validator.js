const { check } = require("express-validator");
const { validatorResult } = require("../../../helpers");
const formats = ["png", "jpg", "jpeg"];

module.exports = [
  check("name", "string not empty").exists().isString().notEmpty(),
  check("categorie", "mongo id").isMongoId().notEmpty().exists(),
  check("front", "required image").custom((value, { req }) => {
    if (req.file) {
      let extension = req.file.mimetype.split("/").pop();
      if (!formats.includes(extension)) throw new Error();
      return true;
    }
    throw new Error();
  }),
  validatorResult,
];
