const express = require('express');
const passport = require('passport');
const router = express.Router();

const {
    logonShow,
    registerShow,
    registerDo,
    logoff,
  } = require("../controllers/users");
  
  router.route("/register").get(registerShow).post(registerDo);
  router
    .route("/logon")
    .get(logonShow)
    .post(
      passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/user/logon",
      failureFlash: true,
      }), 
    );

  router.route("/logoff").post(logoff);
  


  module.exports = router;
module.exports = router;