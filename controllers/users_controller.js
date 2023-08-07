const User = require("../models/user");

module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "User Profile",
  });
};

// render the signUp page
module.exports.signUp = function (req, res) {
  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }
  return res.render("user_sign_up", {
    title: "User SignUp",
  });
};

//render the signIn page
module.exports.signIn = function (req, res) {
  if(req.isAuthenticated()){
   return res.redirect('/users/profile');
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
        User.create(req.body, function (err, user) {
          if (err) {
            console.log("Error in creating user!");
            return;
          }
          return res.redirect("/users/sign-in");
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
  return res.redirect("/");
};

module.exports.destroySession = function(req,res){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
}