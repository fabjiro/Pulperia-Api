const { Store, User } = require("../../../models");

/** @type {import("express").RequestHandler} */
const all = async (req, res) => {
  let registers = await Store.find().select([
    "-createdAt",
    "-updatedAt",
    "-pictures.path",
    "-pictures._id",
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
const id = async (req, res) => {
  let { _id } = req.params;

  let register = await Store.findById({ _id }).select([
    "-createdAt",
    "-updatedAt",
    "-pictures.path",
    "-pictures._id",
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
const owner = async (req, res) => {
  let { _id } = req.params;
  if (await User.exists({ _id })) {
    let register = await Store.find({ owner: _id }).select([
      "-createdAt",
      "-updatedAt",
      "-pictures.path",
      "-pictures._id",
    ]);

    if (register.length > 0) {
      return res.status(200).json({
        status: 200,
        smg: "great :)",
        data: register,
        length: register.length,
      });
    }

    return res.status(403).json({
      status: 403,
      smg: "no store avalaible",
    });
  }

  return res.status(403).json({
    status: 403,
    smg: "owner not avalaible",
  });
};

/*
{
  location: {$near:{$geometry:{type: "Point", coordinates:[12.568608,-87.029474]},$maxDistance:100}}
}
*/

/** @type {import("express").RequestHandler} */
const zone = async (req, res) => {
  let { latitude, longitude, radius } = req.params;

  let registers = await Store.find({
    location: {
      $nearSphere: {
        $geometry: { type: "Point", coordinates: [latitude, longitude] },
        $maxDistance: radius || 400,
      },
    },
  }).select(["-createdAt", "-updatedAt", "-pictures.path", "-pictures._id"]);

  if (registers.length > 0) {
    return res.status(200).json({
      status: 200,
      smg: "great",
      data: registers,
      length: registers.length,
    });
  }

  return res.status(203).json({
    status: 203,
    smg: "in this zone store not avalaible",
  });
};

module.exports = {
  all,
  id,
  owner,
  zone,
};
