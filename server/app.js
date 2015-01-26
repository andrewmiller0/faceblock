var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var twit = require('twit');
var twitter = require('twitter');

var router = express.Router();

var app = express();

app.use(function(req, res, next) {
  // res.header('Access-Control-Allow-Origin', 'example.com');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

  next();
});

// app.use(cors());
var routes = require('./routes/index');
var users = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);


var T = new twit({
  consumer_key: 'bYNJDZnKsJ9rEukEVtyGBVnYj'
  , consumer_secret: 'ULIaFCn4FeNb0QvMGm2THfVdjBnqZIYtshLn4xiyCUBeLPilnM'
  , access_token: '24021901-ISFJP0LJhBCrubWT2BdFdFfdbFpJCLxTZvX3CWVqi'
  , access_token_secret: 'KWFi2wrclyVFagOnNkihe6giAIQ35hc0P0Tg74kN6SVy7'
});

var client = new twitter({
  consumer_key: 'bYNJDZnKsJ9rEukEVtyGBVnYj',
  consumer_secret: 'ULIaFCn4FeNb0QvMGm2THfVdjBnqZIYtshLn4xiyCUBeLPilnM',
  access_token_key: '24021901-ISFJP0LJhBCrubWT2BdFdFfdbFpJCLxTZvX3CWVqi',
  access_token_secret: 'KWFi2wrclyVFagOnNkihe6giAIQ35hc0P0Tg74kN6SVy7'
});

app.get('/me', function(req, res) {
  console.log("Hit me route");
  T.get('account/verify_credentials', function(err, data, send){
    if(err) {
      console.log('err')
    }
    res.send(data);
  });
});

 var count = 0;

app.get('/followers', function(req, res) {
  T.get('friends/ids', function(err, data, response){
    if(err){
      console.log(err)
    }
    T.get('users/show/:user_id', {user_id : data.ids[count]}, function(err, data2, response){
      if(err) console.log("users Error ", err);
      count++;
      res.send(data2);
    });
  });
});

app.post('/unfollow/:screen_name', function(req, res) {
  console.log(req.params.screen_name);
  // T.post('statuses/update', {status: 'Twitter API test tweet 2'},  function(error, tweet, response){
  //   if (error) console.log(error);
  T.post('friendships/destroy', {screen_name : req.params.screen_name}, function(err, data, response){
    if(err) console.log("unfollow error ", err);
    res.send(200, data);
  });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
