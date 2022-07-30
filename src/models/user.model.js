const mongoose = require("mongoose");

module.exports = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      username:String,
      email: {
        type: String,
        unique: true
      },
      password: String,
      photo: String,
      role: {
        type: String,
        default: "user"
      }
    },
    {
      collection: "user",
      timestamps: true,
      versionKey: false,
    }
  )
);
