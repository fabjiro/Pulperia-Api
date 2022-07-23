const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Categorie",
  new mongoose.Schema(
    {
      title: String,
    },
    {
      collection: "categorie",
      timestamps: true,
      versionKey: false,
    }
  )
);
