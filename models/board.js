const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var CommentSchema = new Schema({
    contents: String,
    author: String,
    comment_date: {type: Date, default: Date.now()}
});

const BoardSchema  = new Schema({
    title: String,
    contents: String,
    author: String,
    board_date: {type: Date, default: Date.now()},
    comments: [CommentSchema]
});

module.exports = mongoose.model("board", BoardSchema);
