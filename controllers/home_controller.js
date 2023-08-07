const Post = require("../models/post");

module.exports.home = function (req, res) {
  Post.find({})
    .populate("user")
    .then((post) => {
      return res.render("home", {
        title: "Codial | Home",
        posts: post,
      });
    })
    .catch((err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
};

// module.exports.actionName = function(req, res){}
