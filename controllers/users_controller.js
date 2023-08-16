const User = require("../models/user");

module.exports.profile = function (req, res) {
  User.findById(req.params.id)
    .then((user) => {
      return res.render("user_profile", {
        title: "User Profile",
        profile_user: user,
      });
    })
    .catch((err) => {
      console.log(err);
      return;
    });
};

// Update the user profile
module.exports.update = function (req, res) {
  if (req.user.id == req.params.id) {
    User.findByIdAndUpdate(req.params.id, req.body).then(() => {
      return res.redirect("back");
    });
  } else {
    return res.status(401).send("Unauthorized");
  }
};

// render the signUp page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "User SignUp",
  });
};

//render the signIn page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "User SignIn",
  });
};

//get the signUp data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        User.create(req.body)
          .then((user) => {
            return res.redirect("/users/sign-in");
          })
          .catch((err) => {
            console.log("Error in creating user!");
            return;
          });
      } else {
        return res.redirect("back");
      }
    })
    .catch((err) => {
      console.log("Error in finding user in signing up");
      return;
    });
};

// SignIn and create a session ffor the user
module.exports.createSession = function (req, res) {
  req.flash("success", "Logged In Successfully");
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged Out Successfully");
    res.redirect("/");
  });
};
