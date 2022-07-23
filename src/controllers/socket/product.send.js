const { Product } = require("../../models");
const { Socket } = require("../../services");

module.exports = async () => {
  Socket.io.emit("product:get", await Product.find());
};
