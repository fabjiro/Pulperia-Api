const { User } = require("../../../models");

/** @type {import("express").RequestHandler} */
exports.all = async (req, res) => {
  let data = await User.find().select([ "-createdAt",
  "-updatedAt",]);
  return res.status(200).json({
    status: 200,
    smg: "great :)",
    data: data,
    length: data.length,
  })
}

/** @type {import("express").RequestHandler} */
exports.id = async (req, res) => {
  let { _id } = req.params;

  let register = await User.findById({ _id }).select([ "-createdAt",
  "-updatedAt",]);
  
  if (register) {
    return res.status(200).json({
      status: 200,
      smg: "great :)",
      data: register,
    })
  }
  return res.status(403).json({
    status: 403,
    smg: "register not avalaible",
  })
}