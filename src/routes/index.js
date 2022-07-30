module.exports = {
  api: {
    categorie: require("./api/categorie.route"),
    product: require("./api/product.route"),
    states: require("./api/state.route"),
    users: require("./api/user.route"),
  },
  auth: {
   login: require("./auth/login.route"),
  }
};
