const dropbox = require("../../services/dropbox");
const { parse } = require('path');

module.exports = async (pathCloud = '') => {

  if (parse(pathCloud).ext) {
    pathCloud = parse(pathCloud).dir;
  }

  let response = await dropbox.instance.filesListFolder({
    path: pathCloud,
  });

  return response.result.entries.map((e) => e.name);
};
