const dropbox = require("../../services/dropbox");

module.exports = async (pathCloud) => {
  let response = await dropbox.instance.filesListFolder({
    path: pathCloud,
  });

  return response.result.entries.map((e) => e.name);
};
