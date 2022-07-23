const mongoose = require("mongoose");

module.exports = async (DBUri) => {
  try {
    await mongoose.connect(DBUri);
    console.log(`-> Connected to '${mongoose.connection.name}' database`);
    return mongoose.connection;
  } catch (error) {
    console.log(`-> mongoose error -> ${error}`);
  }
};
