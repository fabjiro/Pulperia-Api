module.exports = {
  validatorResult: require("./validator.helper"),
  dropbox: {
    move: require("./dropbox/move"),
    upload: require("./dropbox/upload"),
    shared: require("./dropbox/sharedlink"),
    createfolder: require("./dropbox/createfolder"),
    delete: require("./dropbox/delete"),
    list: require("./dropbox/list"),
  },
  sharp: require("./sharp"),
  tokenweb: require("./tokenweb"),
};
