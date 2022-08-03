const { Store } = require("../../../models");
const { dropbox } = require("../../../helpers");
const { parse } = require("path");

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
  let { name, owner, location, inventory, galery } = req.body;

  let register = new Store({
    name,
    owner,
    location,
    inventory,
  });

  await dropbox.createfolder(`/pulperia_v2/store/${register._id}`);

  for (let i = 0; i < galery.length; i++) {
    await dropbox.move(
      galery[i].path,
      `/pulperia_v2/store/${register._id}/${parse(galery[i].path).base}`
    );
    galery[i].path = `/pulperia_v2/store/${register._id}/${
      parse(galery[i].path).base
    }`;
  }

  register.pictures = galery;
  await register.save();

  return res.status(200).json({
    status: 200,
    smg: "great :)",
    data: await Store.findById({ _id: register._id }).select([
      "-createdAt",
      "-updatedAt",
      "-pictures.path",
      "-pictures._id",
    ]),
  });
};
