const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const crypto = require("crypto");
const User = require("../models/user");

// tell passport to use a new startegy for facebook login
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_SECRET_KEY ,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['email', 'displayName', 'name']
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
));


module.exports = passport;