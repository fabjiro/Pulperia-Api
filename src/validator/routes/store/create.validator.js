const { check } = require("express-validator");
const { validatorResult } = require("../../../helpers");

module.exports = [
  check("name", "name string required").isString().exists(),
  // check("owner", "owner id required").isMongoId().exists(),
  // check("galery", "array type").isArray(),
  // check("galery.*.path", "string required").isString(),
  // check("galery.*.link", "link required").isURL(),
  check("location.latitude", "latitude required").isString().exists(),
  check("location.longitude", "longitude required").isString().exists(),
  validatorResult,
];
