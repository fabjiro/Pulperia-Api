const jwt = require("jsonwebtoken");

/**
 * @param {*} data 
 * @returns {String}
 */
const generate = (data) => {
  return jwt.sign({
    _id: data._id,
    role: data.role,
  }, process.env.JWTOKEN)
}

const verify = (token) => {
  try {
    return jwt.verify(token, process.env.JWTOKEN);
  } catch (error) {
    return null;
  }
}

module.exports = {
  generate,
  verify
}