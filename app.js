var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var process = require('process');

var zmq = require('zmq')

var index_router = require('./routes/index');
var users_router = require('./routes/users');

var app = express();
index_router.app = app; // making a link to application from within
users_router.app = app; // making a link to application from within

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// middleware function to send log message via zeromq
app.use(function(req, res, next){
    console.log('middleware!!!');
    app.locals.zmq_log(req.method + ' ' + req.url);
    next();
});

app.use('/', index_router);
app.use('/users', users_router);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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


// locals

app.locals.title = "NodeJS REST example";
app.locals.pid = process.pid;

// zeromq

app.locals.zmq_sock_name = 'ipc:///tmp/sock';
app.locals.zmq_sock = zmq.socket('push');
app.locals.zmq_sock.connect(app.locals.zmq_sock_name);
app.locals.zmq_sock.send(app.locals.title + ' started');

// function to log with zeromq socket.
app.locals.zmq_log = function(str){
    app.locals.zmq_sock.send(app.locals.title +
                             ' PID:' + process.pid +
                             ', ' +
                             str
                            );
};

app.locals.zmq_log('started');

module.exports = app;
