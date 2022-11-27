const express = require("express");
const router = express.Router({ mergeParams: true });

const Comment = require("../models/communityComment");
const Post = require("../models/communityPost");

router.post("/", async (req, res) => {
  const post = await Post.findById(req.params.id);
  const comment = new Comment(req.body.comment);
  post.comments.push(comment);
  await comment.save();
  await post.save();
  res.redirect(`/community/board/${post._id}`);
});

router.delete("/:commentId", async (req, res) => {
  const { id, commentId } = req.params;
  await Post.findByIdAndUpdate(id, { $pull: { comments: commentId } });
  await Comment.findByIdAndDelete(commentId);
  res.redirect(`/community/board/${id}`);
});

module.exports = router;
