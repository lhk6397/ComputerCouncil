const express = require("express");
const router = express.Router();

const Routes = require("../models/route");
const Post = require("../models/noticePost");

const { notice } = Routes;

router.get("/", async (req, res) => {
  const posts = await Post.find({});
  res.render("notice/notice/index", { notice, posts });
});

router.get("/new", (req, res) => {
  res.render("notice/notice/new", { notice });
});

router.post("", async (req, res) => {
  const post = new Post(req.body.post);
  await post.save();
  req.flash("success", "Successfully made a new post!");
  res.redirect(`/notice/notice/${post._id}`);
});

router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id).populate("comments");
  if (!post) {
    req.flash("error", "Cannot find that post!");
    return res.redirect("/notice/notice");
  }
  res.render("notice/notice/show", { notice, post });
});

router.get("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById({ _id: id });
  if (!post) {
    req.flash("error", "Cannot find that post!");
    return res.redirect("/notice/notice");
  }
  res.render("notice/notice/edit", { notice, post });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndUpdate(id, {
    ...req.body.post,
  });
  req.flash("success", "Successfully updated post!");
  res.redirect(`/notice/notice/${post._id}`);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Post.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted post");
  res.redirect(`/notice/notice`);
});

module.exports = router;
