const mongoose = require("mongoose");
const NoticePost = require("../models/noticePost");
const EventPost = require("../models/eventPost");
const CommunityPost = require("../models/communityPost");
const { noticeList } = require("./notice.js");
const { eventList } = require("./event.js");

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
  await NoticePost.deleteMany({});
  await EventPost.deleteMany({});
  await CommunityPost.deleteMany({});
  for (let i = 0; i < noticeList.length; i++) {
    const noticePost = new NoticePost(noticeList[i]);
    await noticePost.save();
  }
  for (let i = 0; i < eventList.length; i++) {
    const eventPost = new EventPost(eventList[i]);
    await eventPost.save();
  }
  const communityPost = new CommunityPost({
    author: "6389e3edcbd492fe57757724",
    contents: "배가 고픕니다",
    title: "안녕하세요",
    comments: [],
    board_date: Date.now(),
  });
  await communityPost.save();
};

seedDB().then(() => {
  mongoose.connection.close();
});
