const Routes = require("../public/javascripts/route");
const Post = require("../models/eventPost");
const { notice } = Routes;

module.exports.index = async (req, res) => {
  const posts = await Post.find({}).populate("author");
  res.render("notice/event/index", { notice, posts });
};

module.exports.renderNewForm = (req, res) => {
  res.render("notice/event/new", { notice });
};

module.exports.createPost = async (req, res) => {
  const post = new Post(req.body.post);
  post.author = req.user._id;
  await post.save();
  req.flash("success", "Successfully made a new post!");
  res.redirect(`/notice/event/${post._id}`);
};

module.exports.showPost = async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate({
      path: "comments",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  if (!post) {
    req.flash("error", "Cannot find that post!");
    return res.redirect("/notice/event");
  }
  res.render("notice/event/show", { notice, post });
};

module.exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndUpdate(id, {
    ...req.body.post,
  });
  req.flash("success", "Successfully updated post!");
  res.redirect(`/notice/event/${post._id}`);
};

module.exports.deletePost = async (req, res) => {
  const { id } = req.params;
  await Post.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted post");
  res.redirect(`/notice/event`);
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById({ _id: id });
  if (!post) {
    req.flash("error", "Cannot find that post!");
    return res.redirect("notice/event");
  }
  res.render("notice/event/edit", { notice, post });
};
