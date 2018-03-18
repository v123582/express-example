var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

const { User } = require('./models');

passport.use('local', new LocalStrategy(
  function(username, password, done) {
    User.findOne({ where: {username: username} }).then((user, err) => {
      if (err) return done(null, null);
      return done(null, user);
    })
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});