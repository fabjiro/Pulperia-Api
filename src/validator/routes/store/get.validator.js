const { check } = require("express-validator");
const { validatorResult } = require("../../../helpers");

const zone = [
  check("latitude").isString().exists(),
  check("longitude").isString().exists(),
  // check("radius").isString(),
  validatorResult,
];

module.exports = {
  zone,
};
