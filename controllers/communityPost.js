const Routes = require("../models/route");
const Post = require("../models/communityPost");

const { community } = Routes;

module.exports.index = async (req, res) => {
  const posts = await Post.find({});
  res.render("community/board/index", { community, posts });
};

module.exports.renderNewForm = (req, res) => {
  res.render("community/board/new", { community });
};

module.exports.createPost = async (req, res) => {
  const post = new Post(req.body.post);
  post.author = req.user._id;
  await post.save();
  req.flash("success", "Successfully made a new post!");
  res.redirect(`/community/board/${post._id}`);
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
    return res.redirect("community/board");
  }
  res.render("community/board/show", { community, post });
};

module.exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndUpdate(id, {
    ...req.body.post,
  });
  req.flash("success", "Successfully updated post!");
  res.redirect(`/community/board/${post._id}`);
};

module.exports.deletePost = async (req, res) => {
  const { id } = req.params;
  await Post.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted post");
  res.redirect(`/community/board`);
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById({ _id: id });
  if (!post) {
    req.flash("error", "Cannot find that post!");
    return res.redirect("community/board");
  }
  res.render("community/board/edit", { community, post });
};
