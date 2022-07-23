const { check } = require("express-validator");
const { validatorResult } = require("../../../helpers");

module.exports = [
  check("title", "string not empty").exists().isString().notEmpty(),
  validatorResult,
];
