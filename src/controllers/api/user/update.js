const { User } = require("../../../models");
const bcrypt = require("bcryptjs");

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
  let { password, username, email } = req.body;
  let { _id } = req.params;

  if (await User.exists({ _id })) {
    if (password) {
      await User.findByIdAndUpdate({ _id }, {
        password : await bcrypt.hash(password, await bcrypt.genSalt(10)),
      });
    }

    if (username) {
      await User.findByIdAndUpdate({ _id }, {
        username,
      });
    }

    return res.status(200).json({
      status: 200,
      smg: "great :)",
      data: await User.findById({ _id }).select([ "-createdAt",
  "-updatedAt",]),
    });
  }
  return res.status(403).json({
    status: 403,
    smg: "register not available"
  })
}