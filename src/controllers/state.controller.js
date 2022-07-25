const { States } = require("../models");
const crypto = require("crypto");

const onChange = async () => {
  await States.findByIdAndUpdate(
    { _id: "62dec56574993ed21da93afa" },
    {
      datas: crypto.randomUUID(),
    }
  );
};

/** @type {import("express").RequestHandler} */
const get = async (req, res) => {
  return res.status(200).json({
    status: 200,
    smg: "great! :)",
    data: await States.findById({ _id: "62dec56574993ed21da93afa" }).select([
      "-_id",
      "-updatedAt",
    ]),
  });
};

module.exports = {
  onChange,
  get,
};
