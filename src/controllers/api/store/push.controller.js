const { Product, Store } = require("../../../models");
const { ObjectId } = require("mongoose").mongo;

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
  let { _id, categorie } = req.params;
  let { products } = req.body;

  let reg_store = await Store.findById({ _id });

  if (reg_store) {
    if (await Store.find({ "inventory.categorie": ObjectId(categorie) })) {
      let result = reg_store.inventory.filter(
        (item) => item.categorie == categorie
      )[0];

      for (let i = 0; i < products.length; i++) {
        let item = products[i].toString();
        if (await Product.findOne({ _id: item, categorie })) {
          if (
            !(await Store.findOne({ "inventory.products": ObjectId(item) }))
          ) {
            await Store.updateOne(
              {
                _id: result._id,
              },
              {
                $push: { products: item },
              }
            );
          }
        }
      }

      return res.status(200).json({
        status: 200,
        smg: "great :)",
        data: await Store.findById({ _id }).select([
          "-createdAt",
          "-updatedAt",
          "-pictures.path",
        ]),
      });
    }

    return res.status(403).json({
      status: 403,
      smg: "category not valid in this store",
    });
  }
  return res.status(403).json({
    status: 403,
    smg: "store not avalaible",
  });
};
