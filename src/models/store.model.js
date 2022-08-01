const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Store",
  new mongoose.Schema(
    {
      name: String,
      owner: mongoose.Types.ObjectId,
      pictures: [
        {
          link: String,
          path: String,
        },
      ],
      location: {
        latitude: String,
        longitude: String,
      },
      inventory: [
        {
          categorie: mongoose.Types.ObjectId,
          products: [mongoose.Types.ObjectId],
        },
      ],
    },
    {
      collection: "store",
      timestamps: true,
      versionKey: false,
    }
  )
);
