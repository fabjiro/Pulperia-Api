const dropbox = require("../../services/dropbox");

/**
 * @param {String} path
 */
module.exports = async (path) => {
  await dropbox.instance.filesCreateFolderV2({
    path,
  });
};
