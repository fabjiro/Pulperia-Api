const dropbox = require("../../services/dropbox");

module.exports = async (pathCloud) => {
  try {
    await dropbox.instance.filesDeleteV2({
      path: pathCloud,
    });
  } catch (error) {
    return false;
  }
  return true;
};
