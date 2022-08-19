const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Product",
  new mongoose.Schema(
    {
      name: String,
      categorie: mongoose.Types.ObjectId,
      pictures: {
        front: {
          link: String,
          path: String,
        },
      },
      creator: mongoose.Types.ObjectId,
    },
    {
      collection: "product",
      timestamps: true,
      versionKey: false,
    }
  )
);
