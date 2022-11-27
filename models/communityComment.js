const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommunityCommentSchema = new Schema({
  contents: String,
  author: String,
  // comment_date: {type: Date, default: Date.now()}
});

module.exports = mongoose.model("CommunityComment", CommunityCommentSchema);
