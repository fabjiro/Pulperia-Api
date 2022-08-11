const { verify } = require("../helpers").tokenweb;
const { User } = require("../models");
/** @type {import("express").RequestHandler} */
/**
 * @param {[String]} roles
 * @returns
 */
module.exports = (roles) => async (req, res, next) => {
  if (req.headers.authorization) {
    let tokenData = verify(req.headers.authorization.split(" ").pop());
    if (tokenData._id) {
      let user = await User.findById({ _id: tokenData._id });
      if (roles.includes(user.role)) {
        return next();
      }

      return res.status(203).json({
        status: 203,
        smg: "you don't have permissions",
      });
    }
  }
  return res.status(203).json({
    status: 203,
    smg: "required authentication",
  });
};
