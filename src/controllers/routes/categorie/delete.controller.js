const { Categorie, Product } = require("../../../models");
const { dropbox } = require("../../../helpers");
const SocketCategorieSend = require("../../socket/categorie.send");

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
  let { _id } = req.params;
  if (await Categorie.exists({ _id })) {
    let products = await Product.find({ categorie: _id });
    await Promise.all(
      products.map(async (item) => {
        let product = await Product.findById({ _id: item._id });
        await dropbox.delete(product.pictures.front.path);
        await Product.findByIdAndDelete({ _id: product._id });
      })
    );
    await Categorie.findByIdAndDelete({ _id });

    SocketCategorieSend();
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
