const express = require("express");
const { ensureAuthorized, ensureGest } = require("../config/route-guard");
const router = express.Router();

// GET | Login
router.get("/login", ensureGest, (req, res) => {
  res.render("login", { layout: "login" });
});
// POST | Logout
router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/auth/login");
});

module.exports = router;
