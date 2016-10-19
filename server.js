﻿require('rootpath')();
var express = require('express');
var mongo = require('mongojs');
var mongoose = require('mongoose');
//var db = mongo(process.env.MONGODB_URI, ['demoCollection']);
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');

var databaseUri = 'mongodb://heroku_svpplccz:ekt9qdko4jk87ij6mgn9pkbc99@ds061506.mlab.com:61506/heroku_svpplccz';

if (process.env.MONGODB_URI) {

mongoose.connect(process.env.MONGODB_URI);



} else {
	mongoose.connect(databaseUri);
}

var db = mongoose.connection;
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));

// use JWT auth to secure the api
app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));

// routes
app.use(express.static('public'));
app.use('/login', require('./controllers/login.controller'));
app.use('/register', require('./controllers/register.controller'));
app.use('/app', require('./controllers/app.controller'));
app.use('/api/users', require('./controllers/api/users.controller'));

// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});

// start server
var server = app.listen(3000, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});