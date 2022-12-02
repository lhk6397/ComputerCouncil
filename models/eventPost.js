const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require("./eventComment");

const EventPostSchema = new Schema({
  title: String,
  contents: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  date: { type: Date, default: Date.now() },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "EventComment",
    },
  ],
});

EventPostSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Comment.deleteMany({
      _id: {
        $in: doc.EventComment,
      },
    });
  }
});

module.exports = mongoose.model("EventPost", EventPostSchema);
