const express = require("express");
const router = express.Router();

const Routes = require("../models/route");
const Post = require("../models/communityPost");

const { community } = Routes;

router.get("/", async (req, res) => {
  const posts = await Post.find({});
  res.render("community/board/index", { community, posts });
});

router.get("/new", (req, res) => {
  res.render("community/board/new", { community });
});

router.post("", async (req, res) => {
  const post = new Post(req.body.post);
  await post.save();
  req.flash("success", "Successfully made a new post!");
  res.redirect(`/community/board/${post._id}`);
});

router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id).populate("comments");
  if (!post) {
    req.flash("error", "Cannot find that post!");
    return res.redirect("/notice/notice");
  }
  res.render("community/board/show", { community, post });
});

router.get("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById({ _id: id });
  if (!post) {
    req.flash("error", "Cannot find that post!");
    return res.redirect("/notice/notice");
  }
  res.render("community/board/edit", { community, post });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndUpdate(id, {
    ...req.body.post,
  });
  req.flash("success", "Successfully updated post!");
  res.redirect(`/community/board/${post._id}`);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Post.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted post");
  res.redirect(`/community/board`);
});

module.exports = router;
