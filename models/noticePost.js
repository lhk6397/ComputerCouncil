const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require("./noticeComment");

const NoticePostSchema = new Schema({
  title: String,
  contents: String,
  author: String,
  date: { type: Date, default: Date.now() },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "NoticeComment",
    },
  ],
});

NoticePostSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Comment.deleteMany({
      _id: {
        $in: doc.NoticeComment,
      },
    });
  }
});

module.exports = mongoose.model("NoticePost", NoticePostSchema);
