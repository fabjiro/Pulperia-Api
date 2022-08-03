const { Categorie, Product } = require("../../../models");

/** @type {import("express").RequestHandler} */
exports.all = async (req, res) => {
  let data = await Categorie.find().select(["-createdAt", "-updatedAt"]);
  if (data.length > 0) {
    return res.status(200).json({
      status: 200,
      smg: "great! :)",
      data: data,
      length: data.length,
    });
  }

  return res.status(403).json({
    status: 403,
    smg: "registers not avalaible",
  });
};

/** @type {import("express").RequestHandler} */
exports.id = async (req, res) => {
  let { _id } = req.params;
  let data = await Categorie.findById({ _id }).select([
    "-createdAt",
    "-updatedAt",
  ]);
  if (data) {
    return res.status(200).json({
      status: 200,
      smg: "great! :)",
      data: data,
    });
  }
  return res.status(403).json({
    status: 403,
    smg: "register not avalaible",
  });
};

/** @type {import("express").RequestHandler} */
exports.product = async (req, res) => {
  let { _id } = req.params;
  if (await Categorie.exists({ _id })) {
    let data = await Product.find({ categorie: _id }).select([
      "-pictures.front.path",
      "-createdAt",
      "-updatedAt",
    ]);

    if (data.length > 0) {
      return res.status(200).json({
        status: 200,
        smg: "great! :)",
        data: data,
        length: data.length,
      });
    }

    return res.status(403).json({
      status: 403,
      smg: "register not available",
    });
  }

  return res.status(403).json({
    status: 403,
    smg: "categorie register not available",
  });
};
