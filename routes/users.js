const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/users');

router.route('/register').get(userController.registerShow).post(userController.registerDo);
router.route('/logon').get(userController.logonShow).post(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/logon',
    failureFlash: true,
  }), userController.logonDo);
router.route('/logoff').post(userController.logoff);

module.exports = router;