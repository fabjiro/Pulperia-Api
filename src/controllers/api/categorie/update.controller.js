const { Categorie } = require("../../../models");
const SocketCategorieSend = require("../../socket/categorie.send");
const state = require("../../state.controller");

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
  let { _id, title } = req.body;

  let resgister = await Categorie.findByIdAndUpdate(
    {
      _id,
    },
    {
      title,
    }
  );

  if (resgister) {
    SocketCategorieSend();
    await state.onChange();
    return res.status(200).json({
      status: 200,
      smg: "great! :)",
      data: await Categorie.findById({ _id }).select([
        "-createdAt",
        "-updatedAt",
      ]),
    });
  }

  return res.status(403).json({
    status: 403,
    smg: "register not avalaible",
  });
};
