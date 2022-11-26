const express = require("express");
// test 2022-11-16
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const User = require("./models/user");
const Routes = require("./models/route");
const methodOverride = require("method-override");

const communityBoard = require("./routes/communityBoard");
const communityBoardReview = require("./routes/communityBoardReview");

const PORT = 3000;

const { intro, notice, community, reference } = Routes;

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

mongoose
  .connect("mongodb://localhost:27017/computer-council")
  .then(() => {
    console.log("MONGO CONNECION OPEN!!");
  })
  .catch((err) => {
    console.log("MONGO CONNECTION ERROR!!!");
    console.log(err);
  });

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const user = new User(req.body.user);
  await user.save();
  res.redirect(`/?id=${user._id}`);
});

app.get("/intro", (req, res) => {
  const { category } = req.query;
  switch (category) {
    case "intro":
      res.render("intro/intro", { intro });
      break;
    case "chart":
      res.render("intro/chart", { intro });
      break;
    case "history":
      res.render("intro/history", { intro });
      break;
    default:
      res.redirect("intro?category=intro");
      break;
  }
});

app.get("/notice", (req, res) => {
  const { category } = req.query;
  switch (category) {
    case "notice":
      res.render("notice/notice", { notice });
      break;
    case "event":
      res.render("notice/event", { notice });
      break;
    default:
      res.redirect("notice?category=notice");
      break;
  }
});

/* Community

GET    /community                - show all posts
GET    /community/board          - show all posts
POST   /community/board          - Create New Post
GET    /community/board/new      - Show Add form
GET    /community/board/:id      - Show Post
PUT    /community/board/:id      - Update
GET    /community/board/:id/edit - Show update form
DELETE /community/board/:id      - Delete

*/

app.get("/community", (req, res) => {
  const { category } = req.query;
  switch (category) {
    case "board":
      res.redirect("/community/board");
      break;
    case "faq":
      res.render("community/faq", { community });
      break;
    case "contact":
      res.render("community/contact", { community });
      break;
    default:
      res.redirect("/community/board");
      break;
  }
});

app.use("/community/board", communityBoard);
app.use("/community/board/:id/comments", communityBoardReview);

/* Reference */
app.get("/reference", (req, res) => {
  const { category } = req.query;
  switch (category) {
    case "ref":
      res.render("reference/ref", { reference });
      break;
    default:
      res.redirect("reference?category=ref");
      break;
  }
});

app.all("*", (req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Serving on PORT ${PORT}`);
});
