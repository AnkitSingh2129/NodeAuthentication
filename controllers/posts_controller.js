const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = function (req, res) {
  Post.create({
    content: req.body.content,
    user: req.user._id,
  })
    .then(() => {
      return res.redirect("back");
    })
    .catch((err) => {
      console.log("Error in creating post");
      return;
    });
};

module.exports.destroy = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id);
    
    if (post.user == req.user.id) {
      post.deleteOne();

      await Comment.deleteMany({ post: req.params.id });
      return res.redirect('back');
    } else {
      return res.redirect("back");
    }
  } catch (error) {
    console.log(error);
    return;
  }
  // Post.findById(req.params.id)
  //   .then((post) => {
  //     if (post.user == req.user.id) {
  //       post.deleteOne();

  //       Comment.deleteMany({ post: req.params.id })
  //       .catch((err) => {
  //         return;
  //       })
  //     } else {
  //       return res.redirect("back");
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     return;
  //   });
};
