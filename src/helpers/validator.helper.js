const { validationResult } = require("express-validator");

/** @type {import("express").RequestHandler} */
module.exports = (req, res, next) => {
  try {
    validationResult(req).throw();
    next();
  } catch (err) {
    let error = err.array();
    let list = [error[0]];

    for (let i = 0; i < error.length; i++) {
      if (error[i].param != list[list.length - 1].param) {
        list.push(error[i]);
      }
    }

    res.status(403).json({
      error: list,
    });
  }
};
