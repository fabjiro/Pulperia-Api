const { check } = require("express-validator");
const { validatorResult } = require("../../../helpers");

const product = [
  check("_id", "store id required").isMongoId().exists(),
  check("categorie", "categorie id required").isMongoId().exists(),
  check("products", "array moongo id required").isArray({ min: 1 }).exists(),
  validatorResult,
];

const galery = [
  check("_id", "store id required").isMongoId().exists(),
  check("images").isArray().exists().notEmpty(),
  validatorResult,
];

module.exports = {
  product,
  galery,
};
