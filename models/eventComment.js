const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventCommentSchema = new Schema({
  contents: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("EventComment", EventCommentSchema);
