const express = require("express");
const { ensureAuthorized, ensureGest } = require("../config/route-guard");
const router = express.Router();
const Story = require("../model/Story.model");

// GET | Welcome page | Dashboard
router.get("/dashboard", ensureAuthorized, async (req, res) => {
  try {
    const user = req.user;

    const stories = await Story.find({ user: req.user.id }).lean();

    console.log(
      "🚀 ~ file: index.js ~ line 12 ~ router.get ~ stories",
      stories
    );

    res.render("dashboard", {
      name: user.displayName,
      image: user.image,
      stories,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
