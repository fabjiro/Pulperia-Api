const dropbox = require("../../services/dropbox");
const sharedlink = require("./sharedlink");
const list = require("./list");
const { createReadStream } = require("fs");
const { parse } = require("path");
const { randomUUID } = require("crypto");

/**
 *
 * @param {String} pathLocal
 * @param {String} pathCloud
 * @returns {Object}
 */
module.exports = async (pathLocal, pathCloud) => {
  let list_file = await list(pathCloud);
  let data_file = parse(pathCloud);

  while (list_file.includes(data_file.base)) {
    pathCloud.replace(data_file.name, randomUUID());
  }

  let response = await dropbox.instance.filesUpload({
    path: pathCloud,
    contents: createReadStream(pathLocal),
  });

  return {
    name: response["result"]["name"],
    path: response["result"]["path_display"],
    link: await sharedlink(pathCloud),
  };
};
