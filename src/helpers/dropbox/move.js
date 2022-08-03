const dropbox = require("../../services/dropbox");

/**
 *
 * @param {String} from
 * @param {String} to
 */
module.exports = async (from, to) => {
  await dropbox.instance.filesMoveV2({
    from_path: from,
    to_path: to,
  });

  return true;
};
