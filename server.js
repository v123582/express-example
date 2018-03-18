var express = require('express');
var db = require('./models');
var bodyParser = require('body-parser');
var GraphHTTP =require( 'express-graphql');
var Schema =require( './schema');

var session = require("express-session");
var passport = require('passport');
var auth = require('./auth.js');

var app = express();
app.set('view engine','ejs');

app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/',
}) );

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

app.get('/', (req, res) => {
    if(req.user)
      return res.send('logined');
    return res.send('not login');
});

// function loggingMiddleware(req, res, next) {
//     if (req.isAuthenticated())
//         return next();

//     res.redirect('/');
// }

// app.use(loggingMiddleware);

app.use('/graphql', GraphHTTP((req) => ({
  schema: Schema,
  pretty: true,
  graphiql: true,
  rootValue: { user: req.user }
})));

app.use(bodyParser.urlencoded({ extended: false }));
app.listen(3000, function() {
  db.sequelize.sync();
});

require('./routes')(app);

