const { Dropbox } = require("dropbox");

module.exports = {
  instance: null,
  config: function (token) {
    if (!this.instance) {
      this.instance = new Dropbox({ accessToken: token });
    }
    return this.instance;
  },
};
