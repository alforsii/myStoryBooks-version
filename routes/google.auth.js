const passport = require("passport");
const express = require("express");
const router = express.Router();

// GET | Google auth
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// GET | Google login
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/dashboard");
  }
);

module.exports = router;
