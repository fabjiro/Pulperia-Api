module.exports = {
  validatorResult: require("./validator.helper"),
  dropbox: {
    upload: require("./dropbox/upload"),
    shared: require("./dropbox/sharedlink"),
    delete: require("./dropbox/delete"),
    list: require("./dropbox/list"),
  },
  sharp: require("./sharp"),
};
