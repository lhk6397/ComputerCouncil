const express = require("express");
const router = express.Router({ mergeParams: true });

const Comment = require("../models/noticeComment");
const Post = require("../models/noticePost");

router.post("/", async (req, res) => {
  const post = await Post.findById(req.params.id);
  const comment = new Comment(req.body.comment);
  post.comments.push(comment);
  await comment.save();
  await post.save();
  res.redirect(`/notice/notice/${post._id}`);
});

router.delete("/:commentId", async (req, res) => {
  const { id, commentId } = req.params;
  await Post.findByIdAndUpdate(id, { $pull: { comments: commentId } });
  await Comment.findByIdAndDelete(commentId);
  res.redirect(`/notice/notice/${id}`);
});

module.exports = router;
