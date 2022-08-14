const { Store } = require("../../../models");
const { dropbox, tokenweb } = require("../../../helpers");
const { parse } = require("path");

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
  try {
    let { name, location, inventory, galery } = req.body;
    let { authorization } = req.headers;
    let tokenData = tokenweb.verify(authorization.split(" ").pop());

    let register = new Store({
      name,
      inventory,
      location: {
        type: "Point",
        coordinates: [location.latitude, location.longitude],
      },
      owner: tokenData._id,
    });

    await dropbox.createfolder(`/pulperia_v2/store/${register._id}`);

    if (galery) {
      for (let i = 0; i < galery.length; i++) {
        let newPath = `/pulperia_v2/store/${register._id}/${
          parse(galery[i].path).base
        }`;
        await dropbox.move(galery[i].path, newPath);
        galery[i].path = newPath;
      }

      register.pictures = galery;
    }
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
  } catch (error) {
    console.error(error);
    res.status(403).json({
      status: 403,
      error: error,
    });
  }
};
