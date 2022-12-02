const express = require("express");
const router = express.Router({ mergeParams: true });
const comments = require("../controllers/noticeComment");

router.post("/", comments.createComment);

router.delete("/:commentId", comments.deleteComment);

module.exports = router;
