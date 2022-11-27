const LocalStategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const passport = require("passport");
const User = require("../models/User");

module.exports = (passport) => {
  passport.use(
    new LocalStategy(
      {
        usernameField: "email",
      },
      (email, password, done) => {
        User.findOne({ email: email })
          .then((user) => {
            if (!user) {
              return done(null, false, {
                message: "That email is not registered",
              });
            }
            bcrypt.compare(password, user.password, (err, ismatch) => {
              if (err) throw err;
              if (ismatch) {
                return done(null, user);
              } else {
                done(null, false, { message: "Password incorrect" });
              }
            });
          })
          .catch((err) => console.log(err));
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
