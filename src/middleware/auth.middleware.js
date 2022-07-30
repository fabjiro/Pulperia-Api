const { verify } = require('../helpers').tokenweb;

/** @type {import("express").RequestHandler} */
module.exports = (req, res, next) => {
  if (req.headers.authorization) {
    let tokenData = verify(req.headers.authorization.split(' ').pop());
    if (tokenData._id) {
      return next();
    }
  }

  return res.status(403).json({
    status: 403,
    smg: "required authentication"
  })
}