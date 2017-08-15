var express = require('express');
var router = express.Router();

var passport = require('passport');
var gravatar = require('gravatar');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express from server folder' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login Page', message: req.flash('loginMessage') });
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}));


router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Signup Page', message: req.flash('signupMessage') });
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: 'signup',
  failureFlash: true
}));


router.get('/profile', isLoggedIn, function(req, res, next) {
  res.render('profile', { title: 'profile Page', user: req.user,
                          avatar: gravatar.url(req.user.email, {s: '100', r: 'x', d: 'retro'}, true) });
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});



function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) return next();
  res.redirect('/login');
}

module.exports = router;
