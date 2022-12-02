const express = require("express");
const router = express.Router();
const posts = require("../controllers/eventPost");

router.route("/").get(posts.index).post(posts.createPost);

router.get("/new", posts.renderNewForm);

router
  .route("/:id")
  .get(posts.showPost)
  .put(posts.updatePost)
  .delete(posts.deletePost);

router.get("/:id/edit", posts.renderEditForm);

module.exports = router;
