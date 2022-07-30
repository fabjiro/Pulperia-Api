const { User } = require("../../../models");
const { tokenweb } = require("../../../helpers");
const bcrypt = require("bcryptjs");

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
  let { password, email } = req.body;

  if (await User.exists({ email }))
    return res.status(404).json({
      status: 404,
      smg: "email already use",
    });

  let register = new User(req.body);
  register.password = await bcrypt.hash(password, await bcrypt.genSalt(10));

  await register.save();

  return res.status(200).json({
    status: 200,
    smg: "great :)",
    data: register,
    token: tokenweb.generate(register),
  });
};
