const { Product, Store, Categorie } = require("../../../models");
const { ObjectId } = require("mongoose").mongo;

/** @type {import("express").RequestHandler} */
exports.products = async (req, res) => {
  let { _id, categorie } = req.params;
  let { products } = req.body;

  let reg_store = await Store.findById({ _id });

  if (reg_store) {
    if (await Store.find({ "inventory.categorie": ObjectId(categorie) })) {
      let index = reg_store.inventory.findIndex(
        (item) => item.categorie == categorie
      );
      for (let i = 0; i < products.length; i++) {
        let item = ObjectId(products[i]);
        // si Product pertenece a la categoria
        if (await Product.findOne({ _id: item, categorie })) {
          // si item no pertence al array
          if (
            !(await Store.findOne({ "inventory.products": ObjectId(item) }))
          ) {
            reg_store.inventory[index].products.push(item);
          }
        }
      }

      await reg_store.save();

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

/** @type {import("express").RequestHandler} */
exports.categorie = async (req, res) => {
  let { _id } = req.params;
  let { products, categorie } = req.body;

  let reg_store = await Store.findById({ _id });
  if (reg_store) {
    if (await Categorie.exists({ _id: categorie })) {
      if (
        !(await Store.findOne({
          "inventory.categorie": ObjectId(categorie),
        }))
      ) {
        if (products) {
          let temp_products = [];
          for (let i = 0; i < products.length; i++) {
            let item = products[i];
            if (await Product.findOne({ _id: item, categorie })) {
              temp_products.push(ObjectId(item));
            }
          }

          reg_store.inventory.push({
            categorie: ObjectId(categorie),
            products: temp_products,
          });
        } else {
          reg_store.inventory.push({
            categorie: ObjectId(categorie),
            products: [],
          });
        }
      }
      await reg_store.save();
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
      smg: "categorie not avalaible",
    });
  }

  return res.status(403).json({
    status: 403,
    smg: "store not avalaible",
  });
};
