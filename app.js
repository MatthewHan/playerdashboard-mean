// require the path module
var path = require("path");
// require express and create the express app
var express = require("express");
var app = express();
// require bodyParser since we need to handle post data for adding a user
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/wolves');

app.use(bodyParser.urlencoded({
  extended: true
}));
// static content
app.use(express.static(path.join(__dirname, "./public")));
// set the views folder and set up ejs
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route
app.get('/', function(req, res) {
	res.render('index');
})

app.get('/players/new', function(req, res) {
	res.render('new');
})

app.get('/players/:id', function(req, res) {
	res.render('new');
})
app.post('/players', function(req, res) {
	res.render('new');
})
app.get('/players/:id/edit', function(req, res) {
	res.render('edit');
})
app.post('/players/:id', function(req, res) {
	res.render('new');
})
app.post('/players/:id/destroy', function(req, res) {
	res.render('new');
})
// listen on 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
})