const { Categorie } = require("../../../models");
const SocketCategorieSend = require("../../socket/categorie.send");
const state = require("../../state.controller");

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
  try {
    let register = new Categorie(req.body);
    await register.save();

    SocketCategorieSend(); // server emit to client
    await state.onChange();

    return res.status(200).json({
      status: 200,
      smg: "great! :)",
      data: register,
    });
  } catch (error) {
    res.status(404).json({
      status: 400,
      smg: "error creating register",
    });
  }
};
