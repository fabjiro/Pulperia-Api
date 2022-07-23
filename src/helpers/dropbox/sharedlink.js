const dropbox = require("../../services/dropbox");

module.exports = async (pathCloud) => {
  let response = await dropbox.instance.sharingCreateSharedLink({
    path: pathCloud,
  });
  response["result"]["url"] = response["result"]["url"].replace(
    "https://www.dropbox.com/",
    "https://dl.dropboxusercontent.com/"
  );

  return response["result"]["url"];
};
