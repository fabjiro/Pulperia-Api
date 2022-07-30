const { check } = require("express-validator");
const { validatorResult } = require("../../../helpers");
const formats = ["png", "jpg", "jpeg"];

module.exports = [
  check("username").isString().exists().notEmpty(),
  check("email").isString().notEmpty().exists(),
  check("password").isString().notEmpty().exists(),
  check("photo", "required image").custom((value, { req }) => {
    if (req.file) {
      let extension = req.file.mimetype.split("/").pop();
      if (!formats.includes(extension)) throw new Error();
      return true;
    }
    return true;
  }),
  validatorResult,
];
