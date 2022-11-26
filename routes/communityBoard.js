const express = require("express");
const router = express.Router();

const Routes = require("../models/route");
const Post = require("../models/post");

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
  res.redirect(`/community/board/${post._id}`);
});

router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id).populate("comments");
  res.render("community/board/show", { community, post });
});

router.get("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById({ _id: id });
  console.log(post);
  res.render("community/board/edit", { community, post });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndUpdate(id, {
    ...req.body.post,
  });
  res.redirect(`/community/board/${post._id}`);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Post.findByIdAndDelete(id);
  res.redirect(`/community/board`);
});

module.exports = router;
