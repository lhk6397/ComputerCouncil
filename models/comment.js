var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    contents: String,
    author: String,
    // comment_date: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Comment', CommentSchema);
