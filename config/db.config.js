const mongoose = require("mongoose");

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/story_book";
module.exports = () => {
  mongoose
    .connect(MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    })
    .then((db) =>
      console.log(
        `Connected to DB name: ${db.connections[0].name}, cluster: ${db.connection.host}`
      )
    )
    .catch((err) => console.log(`Error on DB connection: ${err.name}`));
};
