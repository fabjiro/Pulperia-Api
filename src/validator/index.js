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
      pushproduct: require("./routes/store/pushproduct.validator"),
      create: require("./routes/store/create.validator"),
    },
  },
};
