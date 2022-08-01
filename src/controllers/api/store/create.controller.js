const { Store } = require("../../../models");
const { dropbox, sharp } = require("../../../helpers");
const { unlinkSync } = require("fs");

/** @type {import("express").RequestHandler} */
module.exports = async (req, res) => {
  let { name, owner, location, inventory } = req.body;
  let galery = req.files;
  let galery_links = [];

  location = JSON.parse(location);
  inventory = JSON.parse(inventory);

  let register = new Store({
    name,
    owner,
    location,
    inventory,
  });

  await dropbox.createfolder(`/pulperia_v2/store/${register._id}`);

  for (let item in galery) {
    item = galery[item];

    await sharp(item);
    let tem_dat = await dropbox.upload(
      item.path,
      `/pulperia_v2/store/${register._id}/${item.filename}`
    );

    unlinkSync(item.path);

    galery_links.push({
      link: tem_dat.link,
      path: tem_dat.path,
    });
  }

  register.pictures = galery_links;

  await register.save();

  return res.status(200).json({
    status: 200,
    smg: "great :)",
    data: register,
  });
};
