const { Store, Product } = require("../../../models");

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
  let { _id } = req.params;

  let store_register = await Store.findById({ _id });
  if (store_register) {
    let result = [];
    for (let i = 0; i < store_register.inventory.length; i++) {
      let item_i = store_register.inventory[i];
      result.push({
        categorie: item_i.categorie,
        products: await Product.find({
          _id: { $in: store_register.inventory[i].products },
        }).select([
          "-pictures.front.path",
          "-createdAt",
          "-updatedAt",
          "-categorie",
        ]),
      });
    }

    return res.status(200).json({
      status: 200,
      smg: "great :)",
      data: result,
      length: result.length,
    });
  }

  return res.status(403).json({
    status: 403,
    smg: "store not avalaible",
  });
};
