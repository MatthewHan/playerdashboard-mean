// require the path module
var path = require("path");
// require express and create the express app
var express = require("express");
var app = express();
// require bodyParser since we need to handle post data for adding a user
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/players');

app.use(bodyParser.urlencoded({
  extended: true
}));
// static content
app.use(express.static(path.join(__dirname, "./public")));
// set the views folder and set up ejs
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//schema
var PlayerSchema = new mongoose.Schema({
	name: String,
	team: String,
	position: String
})

var Player = mongoose.model('Player', PlayerSchema);
// root route
app.get('/', function(req, res) {
	Player.find({},function(err,players){
		if(err){
			console.log('something went wrong');
		} else {
			console.log(players);
			res.render('index',{data:players});
		}
	})
})

app.get('/players/new', function(req, res) {
	res.render('new');
})

app.get('/players/:id', function(req, res) {
	Player.find({_id : req.params.id},function(err,player){
		if(err){
			console.log('something went wrong');
		} else {
			console.log(player);
			res.render('index',{data:player});
		}
	})
})
app.post('/players', function(req, res) {
	console.log("POST DATA", req.body);
	var player = new Player({name: req.body.name, team: req.body.team, position: req.body.position});
	player.save(function(err){
		if(err){
			console.log('something went wrong');
		} else {
			console.log('player successfully added');
			res.redirect('/');
		}
	})
})
app.get('/players/:id/edit', function(req, res) {
	Player.find({_id : req.params.id},function(err,player){
		if(err){
			console.log('something went wrong');
		} else {
			console.log(player);
			res.render('edit',{data:player});
		}
	})
})
app.post('/players/:id', function(req, res) {
	console.log("POST DATA", req.body);
	Player.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, team: req.body.team, position: req.body.position }}, function (err, tank) {
  		if (err) {
  			console.log('something went wrong');
  		} else {
  			console.log('woohoo');
  			res.redirect('/');
  		}
	});
})
app.get('/players/:id/destroy', function(req, res) {
	Player.find({_id: req.params.id}).remove().exec();
	res.redirect('/');
})
// listen on 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
})