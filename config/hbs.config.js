const exphbs = require("express-handlebars");
// Handlebars Helpers
const {
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select,
} = require("./hbs.helpers");

module.exports = (app) => {
  // HBS engine setup
  app.engine(
    ".hbs",
    exphbs({
      helpers: {
        //This is how to enable Helper functions to use inside .hbs templates
        formatDate,
        stripTags,
        truncate,
        editIcon,
        select,
      },
      defaultLayout: "main",
      extname: ".hbs",
    })
  );
  app.set("view engine", ".hbs");
};
