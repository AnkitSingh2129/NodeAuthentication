const User = require("../models/user");
const fs = require("fs");
const path = require("path");

// Update the user profile
module.exports.update = async function (req, res) {
  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("*****Multer Error: ", err);
        }

        // Update name if provided, otherwise keep it the same
        if (req.body.name) {
          user.name = req.body.name;
        }

        // Update email if provided, otherwise keep it the same
        if (req.body.email) {
          user.email = req.body.email;
        }

        if (req.body.password) {
          user.password = req.body.password;

        }

        if (req.file) {
          if (user.avatar) {
            fs.unlinkSync(path.join(__dirname, "..", user.avatar));
          }

          // this is saving the path of the uploaded file into the avatar field in the user
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        return res.redirect("back");
      });
    } catch (err) {
      req.flash("error", err);
      return res.redirect("back");
    }
  } else {
    req.flash("error", "Unauthorized!");
    return res.status(401).send("Unauthorized");
  }
};

// render the signUp page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/sign-in");
  }
  return res.render("signIn_signUp", {
    title: "SignIn || SignUp",
  });
};

//render the signIn page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return res.render("signIn_signUp", {
    title: "SignIn || SignUp",
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
  req.logout(() => { });
  req.flash("success", "Logged out Successfully");
  return res.redirect('/users/sign-in')
};


