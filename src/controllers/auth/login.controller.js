const { User } = require("../../models");
const { tokenweb } = require("../../helpers");
const bcrypt = require("bcryptjs");

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
  let { email, password } = req.body;

  let register = await User.findOne({ email });
  if (register) {
    if (await bcrypt.compare(password, register.password)) {
      return res.status(200).json({
        status: 200,
        smg: "grat :)",
        data: {
          token: tokenweb.generate(register),
          email: email,
          username: register.username,
        },
      });
    }
  }
  return res.status(200).json({
    status: 203,
    smg: "user or password not valid",
  });
};
