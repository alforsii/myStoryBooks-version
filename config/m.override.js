const methodOverride = require("method-override");

// NOTE: One of the ways is you must include
//          <input type="hidden" name="_method" value="DELETE">
//          inside <form> tag in order to be able to use method override
module.exports = (app) => {
  app.use(
    methodOverride(function (req, res) {
      if (req.body && typeof req.body === "object" && "_method" in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method;
        delete req.body._method;
        return method;
      }
    })
  );
};
