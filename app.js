const express = require("express");
// test 2022-11-16
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const Post = require("./models/board");
const User = require("./models/user");
const methodOverride = require("method-override");

const PORT = 3000;

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, 'public')));
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
    res.render("login")
})

app.post("/login", async (req, res) => {
  const user = new User(req.body.user);
  await user.save();
  res.redirect(`/?id=${user._id}`);
})

app.get("/intro", (req, res) => {
  res.render("intro/intro")
})

app.get("/notice", (req, res) => {
  res.render("notice/notice")
})

app.get("/community", (req, res) => {
  res.render("community/community")
})

app.get("/ref", (req, res) => {
  res.render("reference/reference")
})

app.all('*', (req, res) => {
  res.status(404).render('404');
})

// 404 PAGE
app.use((req, res) => {
    res.status(404).render('404');
  });

app.listen(PORT, () => {
    console.log(`Serving on PORT ${PORT}`);
  });