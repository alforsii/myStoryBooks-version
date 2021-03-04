const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/story_book";

require("./googleStrategy");

module.exports = (app) => {
  // session
  app.use(
    session({
      secret: "process.env.SESSION_SECRET",
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: MONGODB_URI,
        ttl: 14 * 24 * 60 * 60, // = 14 days. Default
      }),
    })
  );

  // passport initializations
  app.use(passport.initialize());
  app.use(passport.session());
};
