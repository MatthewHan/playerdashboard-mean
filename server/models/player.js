var mongoose = require('mongoose');

var PlayerSchema = new mongoose.Schema({
		name: String,
		team: String,
		position: String
});

mongoose.model('Player', PlayerSchema);
