const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const User = require("./models/user");
const Routes = require("./public/javascripts/route");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const NoticePost = require("./models/noticePost");

const communityBoardRoutes = require("./routes/communityBoard");
const communityBoardCommentRoutes = require("./routes/communityBoardComment");
const noticeRoutes = require("./routes/notice");
const noticeCommentRoutes = require("./routes/noticeComment");
const eventRoutes = require("./routes/event");
const eventCommentRoutes = require("./routes/eventComment");
const userRoutes = require("./routes/users");
const catchAsync = require("./utils/catchAsync");

const PORT = 3000;

const { intro, notice, community, reference } = Routes;

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const sessionConfig = {
  secret: "badSecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig)); // app.use(session())이 app.use(passport.session()) 전에 있어야함.
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// passportLocalMongoose 덕분에 아래의 두 메서드가 추가
passport.serializeUser(User.serializeUser()); // passport에게 사용자를 어떻게 직렬화하는지 알려주고, 직렬화는 어떻게 데이터를 얻고 세션에서 사용자를 저장하는지를 참조
passport.deserializeUser(User.deserializeUser());

mongoose
  .connect("mongodb://localhost:27017/computer-council")
  .then(() => {
    console.log("MONGO CONNECION OPEN!!");
  })
  .catch((err) => {
    console.log("MONGO CONNECTION ERROR!!!");
    console.log(err);
  });

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.get(
  "/",
  catchAsync(async (req, res) => {
    const posts = await NoticePost.find({});
    res.render("home", { posts });
  })
);

app.use("/", userRoutes);
app.use("/notice/notice", noticeRoutes);
app.use("/notice/notice/:id/comments", noticeCommentRoutes);
app.use("/notice/event", eventRoutes);
app.use("/notice/event/:id/comments", eventCommentRoutes);

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
      res.redirect("/notice/notice");
      break;
    case "event":
      res.redirect("/notice/event");
      break;
    default:
      res.redirect("/notice/notice");
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

app.use("/community/board", communityBoardRoutes);
app.use("/community/board/:id/comments", communityBoardCommentRoutes);

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

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).render("error", { err });
});

app.listen(PORT, () => {
  console.log(`Serving on PORT ${PORT}`);
});
