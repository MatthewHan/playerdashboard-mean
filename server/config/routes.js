module.exports = function(app) { 
	var players = require('../controllers/players.js');
	// root route
	app.get('/', function(req, res) {
		players.show(req,res);
	})
	app.get('/players/new', function(req, res) {
		res.render('new');
	})
	app.get('/players/:id', function(req, res) {
		players.showOne(req,res);
	})
	app.post('/players', function(req, res) {
		players.addPlayer(req,res);
	})
	app.get('/players/:id/edit', function(req, res) {
		players.showEdit(req,res);
	})
	app.post('/players/:id', function(req, res) {
		players.editPlayer(req, res);
	})
	app.get('/players/:id/destroy', function(req, res) {
		players.deletePlayer(req, res);
	})
}