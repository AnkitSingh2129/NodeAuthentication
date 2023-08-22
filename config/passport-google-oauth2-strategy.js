const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");
const env = require('./environment');

// tell passport to use a new startegy for google login
passport.use(
  new googleStrategy(
    {
      clientID: env.google_client_id,
      clientSecret: env.google_client_secret,
      callbackURL: env.google_callback_url,
    },
    function (accessToken, refreshToken, profile, done) {
        //find a user
      User.findOne({ email: profile.emails[0].value })
        .exec()
        .then((user) => {
          if (user) {
            // If found, set this user as req.user
            return done(null, user);
          } else {
            // If not found, create the user and set it as req.user
            User.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            })
              .then(() => {
                return done(null, user);
              })
              .catch((err) => {
                if (err) {
                  console.log(
                    "Error in creating user google strategy-passport ",
                    err
                  );
                  return;
                }
              });
          }
        })
        .catch((err) => {
          if (err) {
            console.log("Error in google strategy-passport ", err);
            return;
          }
        });
    }
  )
);


module.exports = passport;