//load the passport module
var LocalStrategy = require('passport-local').Strategy;
//get user Model
var User = require('../models/users');

module.exports = function(passport){
  //init and serializable user for session
  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  //user deserializable
  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
      done(err, user);
    });
  });

  //using local strategy
  passport.use('local-login', new LocalStrategy({
    //change default username and password
    usernameField: 'email',
    passwordFeild: 'password',
    passReqToCallback: true
  }, function(req, email, password, done){
    //change lower case
    if(email) email=email.toLowerCase();

    //asyncronous
    process.nextTick(function(){
      User.findOne({ 'local.email' : email }, function(err, user){
        //error
        if(err) return done(err);

        //error with message
        if(!user) return done(null, false, req.flash('loginMessage', 'No user found.'));
        if(!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Wohh! Wrong password.'));

        return done(null, user);
      });
    });
  }));

  //register the local strategy
  passport.use('local-signup', new LocalStrategy({
    //change default username and password
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, email, password, done){
    if(email) email=email.toLowerCase();

    process.nextTick(function(){
      //user login not yet
      if(!req.user){
        User.findOne({ 'local.email' : email }, function(err, user){
          if(err) return done(err);

          //check the email duplicate
          if(user){
            return done(null, flase, req.flash('signupMessage', 'Wohh! the email is already taken'));
          } else{
            var newUser = new User();
            //get the username from req.body
            newUser.local.name = req.body.name;
            newUser.local.email = email;
            newUser.local.password = newUser.geterateHash(password);

            newUser.save(function(err){
              if(err) throw err;
              return done(null, newUser);
            });
          }
        });
      } else{
        return done(null, req.user);
      }
    });
  }));
}