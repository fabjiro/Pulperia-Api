const { check } = require("express-validator");
const { validatorResult } = require("../../../helpers");

module.exports = [
  check("name", "name string required").isString().exists(),
  check("owner", "categorie id required").isMongoId().exists(),
  check("location.latitude", "latitude required").isString().exists(),
  check("location.longitude", "longitude required").isString().exists(),
  validatorResult,
];
