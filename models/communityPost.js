const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require("./communityComment");

const CommunityPostSchema = new Schema({
  title: String,
  contents: String,
  author: String,
  date: { type: Date, default: Date.now() },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "CommunityComment",
    },
  ],
});

CommunityPostSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Comment.deleteMany({
      _id: {
        $in: doc.CommunityComment,
      },
    });
  }
});

module.exports = mongoose.model("CommunityPost", CommunityPostSchema);
