const mongoose = require("mongoose");
require("colors");

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

/**
 * @param silent
 */
module.exports = (silent = false) => {
  const URI = process.env.MONGO_DB_URI;
  mongoose.connect(URI, OPTIONS)
    .then(() => {
      if (!silent) console.log(`Connected to MongoDB - Database name: ${mongoose.connection.name}`.green)
    })
    .catch(error => {
      console.error(`Connection to MongoDB failed. ${error}`.red)
    })
};
