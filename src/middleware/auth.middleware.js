const { verify } = require('../helpers').tokenweb;
// const {  User } = require("../models");

/** @type {import("express").RequestHandler} */
module.exports = async (req, res, next) => {
  if (req.headers.authorization) {
    let tokenData = verify(req.headers.authorization.split(' ').pop());

    // let userData = await User.findById({_id: tokenData._id});

    // if(userData.role == "app"){
    //   return res.status(203).json({
    //     status: 203,
    //     smg: "required authentication"
    //   })
    // }

    if (tokenData._id) {
      return next();
    }
  }

  return res.status(203).json({
    status: 203,
    smg: "required authentication"
  })
}