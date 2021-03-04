require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

const myMethodOverride = require("./config/m.override");
const myHbs = require("./config/hbs.config");
const myPassport = require("./config/passport");
const myDatabase = require("./config/db.config");

// Handlebars config
myHbs(app);

// Body parse
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Method override
// NOTE: when using req.body, you must fully parse the request body
//       before you call methodOverride() in your middleware stack,
//       otherwise req.body will not be populated.
myMethodOverride(app);

//Database config
myDatabase();

// Passport config
myPassport(app);

// Set global var
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/google.auth"));
app.use("/auth", require("./routes/auth"));
app.use("/stories", require("./routes/stories"));

app.listen(PORT, () =>
  console.log(`🚀 Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
