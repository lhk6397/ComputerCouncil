const ExpressError = require("./utils/ExpressError");
const { postSchema, commentSchema } = require("./schemas.js");

const CommunityPost = require("./models/communityPost");
const NoticePost = require("./models/noticePost");
const EventPost = require("./models/eventPost");
const CommunityComment = require("./models/communityComment");
const NoticeComment = require("./models/noticeComment");
const EventComment = require("./models/eventComment");
const catchAsync = require("./utils/catchAsync");

// 로그인 여부 확인
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be signed in first");
    req.session.preURL = req.originalUrl;
    console.log(req.session);
    return res.redirect("/login");
  }
  next();
};

// Post 유효성 검사
module.exports.validatePost = (req, res, next) => {
  const { error } = postSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

// Comment 유효성 검사
module.exports.validateComment = (req, res, next) => {
  const { error } = commentSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

// Post Author 일치 확인
module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const parsedURL = req.originalUrl.split("/");
  switch (parsedURL[2]) {
    case "board":
      post = await CommunityPost.findById(id);
      if (!post.author.equals(req.user._id)) {
        // 작성자가 아니면 편집 요청 못하게
        req.flash("error", "You do not have permission to do that!");
        return res.redirect(`/${parsedURL[1]}/${parsedURL[2]}/${id}`);
      }
      break;
    case "notice":
      post = await NoticePost.findById(id);
      if (!post.author.equals(req.user._id)) {
        // 작성자가 아니면 편집 요청 못하게
        req.flash("error", "You do not have permission to do that!");
        return res.redirect(`/${parsedURL[1]}/${parsedURL[2]}/${id}`);
      }
      break;
    case "event":
      post = await EventPost.findById(id);
      if (!post.author.equals(req.user._id)) {
        // 작성자가 아니면 편집 요청 못하게
        req.flash("error", "You do not have permission to do that!");
        return res.redirect(`/${parsedURL[1]}/${parsedURL[2]}/${id}`);
      }
      break;
  }
  next();
};

// Comment Author 일치 확인
module.exports.isCommentAuthor = async (req, res, next) => {
  const { id, commentId } = req.params;
  let comment = {};
  const parsedURL = req.originalUrl.split("/");
  switch (parsedURL[2]) {
    case "board":
      comment = await CommunityComment.findById(commentId);
      if (!comment.author.equals(req.user._id)) {
        // 작성자가 아니면 편집 요청 못하게
        req.flash("error", "You do not have permission to do that!");
        return res.redirect(`/${parsedURL[1]}/${parsedURL[2]}/${id}`);
      }
      return comment;
    case "notice":
      comment = await NoticeComment.findById(commentId);
      if (!comment.author.equals(req.user._id)) {
        // 작성자가 아니면 편집 요청 못하게
        req.flash("error", "You do not have permission to do that!");
        return res.redirect(`/${parsedURL[1]}/${parsedURL[2]}/${id}`);
      }
      return comment;

    case "event":
      comment = await EventComment.findById(commentId);
      if (!comment.author.equals(req.user._id)) {
        // 작성자가 아니면 편집 요청 못하게
        req.flash("error", "You do not have permission to do that!");
        return res.redirect(`/${parsedURL[1]}/${parsedURL[2]}/${id}`);
      }
      return comment;
  }

  next();
};

module.exports.checkPreURL = (req, res, next) => {
  if (req.session.preURL) {
    res.locals.preURL = req.session.preURL;
  }
  next();
};
