const { Product } = require("../../../models");
const { dropbox } = require("../../../helpers");
const SocketProductSend = require("../../socket/product.send");
const state = require("../../state.controller");

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
  try {
    let { _id } = req.params;

    let register = await Product.findById({ _id });
    if (register) {
      await dropbox.delete(register.pictures.front.path);
      await Product.findByIdAndDelete({ _id });

      SocketProductSend();
      await state.onChange();

      return res.status(200).json({
        status: 200,
        smg: "great! :)",
      });
    }

    return res.status(403).json({
      status: 403,
      smg: "register not avalaible",
    });
  } catch (error) {
    console.error(`error -> ${error}`);
    res.status(404).json({
      status: 404,
      smg: "error on deleting",
    });
  }
};
