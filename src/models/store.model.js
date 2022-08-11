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
        type: {
          type: String,
          enum: ["Point"], // 'location.type' must be 'Point'
          required: true,
        },
        coordinates: {
          type: [Number],
          required: true,
        },
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
