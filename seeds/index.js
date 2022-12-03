const mongoose = require("mongoose");
const CommunityPost = require("../models/communityPost");

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
  await CommunityPost.deleteMany({});
  const communityPost = new CommunityPost({
    author: "638b23eabba45308daebae2c",
    //author: "6389dfc7de8cfce8839be0d5",
    contents:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    title: "제목",
    comments: [],
    board_date: Date.now(),
  });
  await communityPost.save();
};

seedDB().then(() => {
  mongoose.connection.close();
});
