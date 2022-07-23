const { Categorie } = require("../../models");
const { Socket } = require("../../services");

module.exports = async () => {
  Socket.io.emit(
    "categorie:get",
    await Categorie.find().select(["-pictures.front.path"])
  );
};
