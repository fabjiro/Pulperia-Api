const { Product } = require("../../../models");

/** @type {import("express").RequestHandler} */
const all = async (req, res) => {
  let data = await Product.find().select([
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
    smg: "registers not avalaible",
  });
};

/** @type {import("express").RequestHandler} */
const id = async (req, res) => {
  let { _id } = req.params;
  let data = await Product.findById({ _id }).select([
    "-pictures.front.path",
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
const find = async (req, res) => {
  let { text } = req.params;

  // let registers = await Product.find({ $text: { $search: text } });
  let registers = await Product.find({
    name: { $regex: text, $options: "i" },
  }).select(["-pictures.front.path", "-createdAt", "-updatedAt"]);

  // "".includes(text);
  if (registers.length > 0) {
    return res.status(200).json({
      status: 200,
      smg: "great :)",
      data: registers,
    });
  }

  return res.status(203).json({
    status: 203,
    smg: `product "${text}" not found`,
  });
};

module.exports = {
  all,
  id,
  find,
};
