const express = require("express");
const router = express.Router({ mergeParams: true });
const comments = require("../controllers/communityComment");
const {
  isLoggedIn,
  validateComment,
  isCommentAuthor,
} = require("../middleware");
const catchAsync = require("../utils/catchAsync");

router.post(
  "/",
  isLoggedIn,
  validateComment,
  catchAsync(comments.createComment)
);

router.delete(
  "/:commentId",
  isLoggedIn,
  isCommentAuthor,
  catchAsync(comments.deleteComment)
);

module.exports = router;
