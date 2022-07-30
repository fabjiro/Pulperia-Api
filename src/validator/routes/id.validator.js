const { check } = require("express-validator");
const { validatorResult } = require("../../helpers");

module.exports = [
  check("_id", "mongo id required").isMongoId().exists().notEmpty(),
  validatorResult,
];
