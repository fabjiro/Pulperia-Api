const { Store } = require("../../../models");
const { dropbox } = require("../../../helpers");

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
  let { _id } = req.params;
  let registe = await Store.findByIdAndDelete(_id);

  if (registe) {
    await dropbox.delete(`/pulperia_v2/store/${registe._id}`);
    return res.status(200).json({
      status: 200,
      smg: "great :)",
    });
  }

  return res.status(403).json({
    status: 403,
    smg: "register not avalaible",
  });
};
