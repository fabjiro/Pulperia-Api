module.exports = {
  api: {
    categorie: {
      create: require("./api/categorie/create.controller"),
      edit: require("./api/categorie/update.controller"),
      delete: require("./api/categorie/delete.controller"),
      all: require("./api/categorie/get.controller").all,
      id: require("./api/categorie/get.controller").id,
      product: require("./api/categorie/get.controller").product,
    },
    product: {
      create: require("./api/product/create.controller"),
      delete: require("./api/product/delete.cotroller"),
      all: require("./api/product/get.controller").all,
      id: require("./api/product/get.controller").id,
    },
    states: {
      onChange: require("./state.controller").onChange,
      get: require("./state.controller").get,
    },
    users: {
      create: require("./api/user/create.controller"),
      all: require("./api/user/list").all,
      id: require("./api/user/list").id,
      update: require("./api/user/update")
    }
  },
  auth: {
    login: require("./auth/login.controller")
  }
};
