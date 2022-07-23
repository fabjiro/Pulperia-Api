const dropbox = require("../../services/dropbox");
const sharedlink = require("./sharedlink");
const list = require("./list");
const { createReadStream } = require("fs");

module.exports = async (pathLocal, pathCloud) => {
  // let list_file =  await list(pathCloud)

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
