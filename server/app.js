var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var twit = require('twit');

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
  consumer_key: 'qgyb3jM4W9c1YkgzEhBZtVSIx'
  , consumer_secret: 'LM2ScBHKJ72OROQsbsbf80pRTecj8PVpI0fUaVxdt2suIV2YlR'
  , access_token: '24021901-Rs8BHm9mTvpahZ6GQ4wAGBOL3jgnrczVJXHJPzkbf'
  , access_token_secret: 'D8JsfZT7BPytV00IdQducGIM8A3Y4ZxSresV7K72SORhw'
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
