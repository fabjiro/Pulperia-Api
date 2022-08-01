const { Store, Categorie } = require("../../../models");

/** @type {import("express").RequestHandler} */
exports.all = async (req, res) => {
  let registers = await Store.find().select([
    "-createdAt",
    "-updatedAt",
    "-pictures.path",
  ]);

  if (registers.length > 0) {
    return res.status(200).json({
      status: 200,
      smg: "great :)",
      data: registers,
      length: registers.length,
    });
  }

  return res.status(403).json({
    status: 403,
    smg: "registers not avalaibles",
  });
};

/** @type {import("express").RequestHandler} */
exports.id = async (req, res) => {
  let { _id } = req.params;

  let register = await Store.findById({ _id }).select([
    "-createdAt",
    "-updatedAt",
    "-pictures.path",
  ]);

  if (register) {
    return res.status(200).json({
      status: 200,
      smg: "great :)",
      data: register,
    });
  }

  return res.status(403).json({
    status: 403,
    smg: "register not avalaible",
  });
};

/** @type {import("express").RequestHandler} */
exports.categories = async (req, res) => {
  let { _id, param } = req.params;

  let reg_store = await Store.findById({ _id }).select([
    "-createdAt",
    "-updatedAt",
    "-pictures.path",
  ]);

  if (reg_store) {
    if (param) {
      if (param == "verbose") {
        let tem_data = [];
        for (let item in reg_store.inventory) {
          tem_data.push(
            await Categorie.findById({ _id: item.Categorie }).select([
              "-createdAt",
              "-updatedAt",
            ])
          );
        }

        return res.status(200).json({
          status: 200,
          smg: "great :)",
          data: tem_data,
          length: tem_data.length,
        });
      }
    }
    return res.status(200).json({
      status: 200,
      smg: "great :)",
      data: reg_store,
    });
  }

  return res.status(403).json({
    status: 403,
    smg: "register not avalaible",
  });
};
