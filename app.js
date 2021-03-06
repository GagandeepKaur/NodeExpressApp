// dependencies
var fs = require('fs');
var express = require('express');
//var routes = require('./routes');
var path = require('path');
var config = require('./oauth.js');
var User = require('./user.js');
var mongoose = require('mongoose');
var passport = require('passport');
var fbAuth = require('./authentication.js');
var TwitterStrategy = require('passport-twitter').Strategy;
var GithubStrategy = require('passport-github2').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var InstagramStrategy = require('passport-instagram').Strategy;
//var wine = require('./routes/wines');

// connect to the database
mongoose.connect('mongodb://localhost/passport-example');

var app = express();

app.configure(function() {
//app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
app.use(express.bodyParser()),
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.logger());
//app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
});

/*app.get('/wines', wine.findAll);
app.get('/wines/:id', wine.findById);
app.post('/wines', wine.addWine);
app.put('/wines/:id', wine.updateWine);
app.delete('/wines/:id', wine.deleteWine);*/
// serialize and deserialize
passport.serializeUser(function(user, done) {
  console.log('serializeUser: ' + user._id);
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user){
    console.log(user);
      if(!err) done(null, user);
      else done(err, null);
    });
});

// routes
//app.get('/', routes.index);
//app.get('/ping', routes.ping);
app.get('/loginSocial', ensureAuthenticated, function(req, res){
  User.findById(req.session.passport.user, function(err, user) {
    if(err) {
      console.log(err);  // handle errors
    } else {
      res.render('LoginSocialView', { user: user});
    }
  });
});

/*app.get('/auth/facebook',
  passport.authenticate('facebook'),
  function(req, res){});
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/account');
  });

app.get('/auth/twitter',
  passport.authenticate('twitter'),
  function(req, res){});
app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/account');
  });

app.get('/auth/github',
  passport.authenticate('github'),
  function(req, res){});
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/account');
  });*/

app.get('/auth/google',
  passport.authenticate('google', { scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read'
  ] }
));
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });
/*
app.get('/auth/instagram',
  passport.authenticate('instagram'),
  function(req, res){});
app.get('/auth/instagram/callback',
  passport.authenticate('instagram', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/account');
  });*/

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// port
app.listen(1337);

// test authentication
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

module.exports = app;
