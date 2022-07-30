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
         }
      })
    }
  }
  return res.status(403).json({
    status: 403,
    smg: "user or password not valid",
  })
}