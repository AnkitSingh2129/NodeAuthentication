require('dotenv').config();

// Express
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");

//used for session cookies
const session = require("express-session");

// Passport strategies
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const passportFacebook = require('./config/passport-facebook-strategy');

const MongoStore = require("connect-mongo");

// Setting up the flash messages
const flash = require("connect-flash");
const customMware = require("./config/middleware");

app.use(express.urlencoded({extended: false}));

app.use(cookieParser());

// Statics files
app.use(express.static('./assets'));

// make the uploads path available to the browser
app.use("/uploads", express.static(__dirname + "/uploads"));

// using the express layout to make our website more dynamic
app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// mongo store is used to store the sesion cookie in the database
app.use(
  session({
    name: "Authentication",
    //Todo change the secret before deployment in production mode
    secret:  process.env.SESSION_SECRET_KEY,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: 'mongodb+srv://User20000:Pass1234@cluster0.j7aypsx.mongodb.net/?retryWrites=true&w=majority',
        autoRemove: "disabled",
      },
      function (err) {
         console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

// passport 
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.checkAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    return;
  }
});
