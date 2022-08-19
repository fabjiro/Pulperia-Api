const { Product, Categorie } = require("../../../models");
const { dropbox, sharp, tokenweb } = require("../../../helpers");
const { unlinkSync } = require("fs");
const SocketProductSend = require("../../socket/product.send");
const state = require("../../state.controller");

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
  const { categorie, name } = req.body;
  let { authorization } = req.headers;

  const front = req.file;
  try {
    if (!(await Categorie.findById({ _id: categorie })))
      return res.status(403).json({
        status: 403,
        smg: "categorie not avalaible",
      });

    await sharp(front);

    let data_upload = await dropbox.upload(
      front.path,
      `/pulperia_v2/product/${front.filename}`
    );

    // remove file on local disk
    unlinkSync(front.path);

    let register = new Product({
      name: name,
      categorie: categorie,
      pictures: {
        front: {
          link: data_upload.link,
          path: data_upload.path,
        },
      },
      creator: tokenweb.verify(authorization.split(" ").pop())._id,
    });

    await register.save();

    SocketProductSend();
    await state.onChange();

    return res.status(200).json({
      status: 200,
      smg: "great! :)",
      data: await Product.findById({ _id: register._id }).select([
        "-pictures.front.path",
        "-createdAt",
        "-updatedAt",
      ]),
    });
  } catch (error) {
    console.error(error);
    unlinkSync(front.path);
    res.status(404).json({
      status: 404,
      smg: "error on create register",
    });
  }
};
