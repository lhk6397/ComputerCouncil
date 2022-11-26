const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require("./comment");
const PostSchema = new Schema({
  title: String,
  contents: String,
  author: String,
  date: { type: Date, default: Date.now() },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

PostSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Comment.deleteMany({
      _id: {
        $in: doc.comments,
      },
    });
  }
});

module.exports = mongoose.model("Post", PostSchema);
