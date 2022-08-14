module.exports = {
  routes: {
    id: require("./routes/id.validator"),
    categorie: {
      create: require("./routes/categorie/create.validator"),
      edit: require("./routes/categorie/edit.validator"),
    },
    product: {
      create: require("./routes/product/create.validator"),
    },
    user: {
      create: require("./routes/user/create.validator"),
    },
    store: {
      push: require("./routes/store/push.validator"),
      create: require("./routes/store/create.validator"),
      get: require("./routes/store/get.validator"),
    },
  },
};
