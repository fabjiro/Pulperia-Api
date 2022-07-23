const { Product } = require("../../../models");
const { dropbox } = require("../../../helpers");
const SocketProductSend = require("../../socket/product.send");

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
  let { _id } = req.params;

  let register = await Product.findById({ _id });
  if (register) {
    await dropbox.delete(register.pictures.front.path);
    await Product.findByIdAndDelete({ _id });

    SocketProductSend();
    return res.status(200).json({
      status: 200,
      smg: "great! :)",
    });
  }

  return res.status(403).json({
    status: 403,
    smg: "register not avalaible",
  });
};
