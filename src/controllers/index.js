module.exports = {
  routes: {
    categorie: {
      create: require("./routes/categorie/create.controller"),
      edit: require("./routes/categorie/update.controller"),
      delete: require("./routes/categorie/delete.controller"),
      all: require("./routes/categorie/get.controller").all,
      id: require("./routes/categorie/get.controller").id,
      product: require("./routes/categorie/get.controller").product,
    },
    product: {
      create: require("./routes/product/create.controller"),
      delete: require("./routes/product/delete.cotroller"),
      all: require("./routes/product/get.controller").all,
      id: require("./routes/product/get.controller").id,
    },
  },
};
