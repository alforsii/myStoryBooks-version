const express = require("express");
const { ensureAuthorized } = require("../config/route-guard");
const router = express.Router();
const Story = require("../model/Story.model");

// GET | Add form
router.get("/add", ensureAuthorized, (req, res) => {
  res.render("stories/add");
});
//GET /stories
router.get("/", ensureAuthorized, async (req, res) => {
  try {
    const stories = await Story.find({ status: "public" })
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean();

    res.render("stories/index", {
      stories,
    });
  } catch (err) {
    console.error(err);
  }
});
// POST | Create a new story
router.post("/add", async (req, res) => {
  req.body.user = req.user.id;

  try {
    const story = req.body;

    // const { title, body } = story;
    if (!story || !story?.title || !story?.body) {
      return res.status(401).render("stories/add", {
        errMessage: "Please fill out title and body!",
      });
    }
    await Story.create(story);
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
  }
});

// GET | Single story
router.get("/:id", ensureAuthorized, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).populate("user").lean();
    res.render("stories/story", { story });
  } catch (err) {
    console.log(err);
  }
});
// /stories/user/{{story.user._id}}
// GET | Single user stories
router.get("/user/:userId", ensureAuthorized, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.params.userId })
      .populate("user")
      .lean();
    res.render("stories/index", { stories });
  } catch (err) {
    console.log(err);
  }
});

// GET | Get Edit story
router.get("/edit/:id", ensureAuthorized, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).lean();

    res.render("stories/edit", {
      story,
    });
  } catch (err) {
    console.log(err);
  }
});
// /stories/603f0b8dfc00a241a1f6a9ba
// POST | Edit story
router.put("/:id", ensureAuthorized, async (req, res) => {
  try {
    await Story.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
  }
});
// /stories/603f0b8dfc00a241a1f6a9ba
// Delete | Delete story
router.delete("/:id", ensureAuthorized, async (req, res) => {
  try {
    await Story.findByIdAndDelete(req.params.id);

    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
