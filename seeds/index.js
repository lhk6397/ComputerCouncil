const mongoose = require('mongoose');
const Board = require('../models/board');

mongoose
  .connect("mongodb://localhost:27017/computer-council")
  .then(() => {
    console.log("MONGO CONNECION OPEN!!");
  })
  .catch((err) => {
    console.log("MONGO CONNECTION ERROR!!!");
    console.log(err);
  });

const seedDB = async () => {
    await Board.deleteMany({});
    const board = new Board({
        "author" : "길동",
        "contents" : "내용",
        "title" : "제목",
        "comments" : [
                {
                        "author" : "관순",
                        "contents" : "댓글",
                        "comment_date" : Date.now()
                },
                {
                        "author" : "관순이",
                        "contents" : "댓글2",
                        "comment_date" : Date.now()
                }
        ],
        "board_date" : Date.now()
    })
    await board.save();
}

seedDB().then(() => {
    mongoose.connection.close();
})