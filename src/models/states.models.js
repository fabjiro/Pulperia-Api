const mongoose = require("mongoose");

module.exports = mongoose.model(
  "States",
  new mongoose.Schema(
    {
      datas: String,
    },
    {
      collection: "states",
      timestamps: true,
      versionKey: false,
    }
  )
);
