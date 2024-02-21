const User = require("../models/User");
const parseVErr = require("../utils/parseValidationErr");

const logonShow = (req, res) => {
  if (req.user) {
    return res.redirect("/books");
  }
  res.render("logon");
};

const logonDo = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash("error", "Incorrect credentials.");
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
        });
    })(req, res, next);
    //res.redirect('/user/books');
  };

const registerShow = (req, res) => {
  res.render("register");
};

const registerDo = async (req, res, next) => {
if (req.body.password !== req.body.password1) {
req.flash("error", "The passwords entered do not match.");
return res.render("register", { errors: req.flash('error'), info: req.flash('info') });
}
const emailFormatRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

if (!emailFormatRegex.test(req.body.email)) {
    req.flash("error", "Please provide a valid email address.");
    return res.render("register", { errors: req.flash('error'), info: req.flash('info') });
}
  try {
    await User.create(req.body);
    res.redirect("/user/logon");
  } catch (e) {
    if (e.constructor.name === "ValidationError") {
        parseVErr(e, req);
    } else if (e.name === "MongoServerError" && e.code === 11000) {
        req.flash("error", "That email address is already registered.");
        return res.render("register", { errors: req.flash('error'), info: req.flash('info') });
    } else {
        return next(e);
    }
  }
};

const logoff = (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
};

module.exports = {
  logonShow,
  logonDo,
  registerShow,
  registerDo,
  logoff,
};
