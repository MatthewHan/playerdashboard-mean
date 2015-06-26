var Player = mongoose.model('Player');
var playerController = {}

playerController.show = function(req, res){
	Player.find({},function(err,players){
		if(err){
			console.log('something went wrong');
		} else {
			console.log(players);
			res.render('index',{data:players});
		}
	})
}

playerController.showOne = function(req, res){
	Player.find({_id : req.params.id},function(err,player){
		if(err){
			console.log('something went wrong');
		} else {
			console.log(player);
			res.render('index',{data:player});
		}
	})
}

playerController.addPlayer = function(req, res){
	var player = new Player({name: req.body.name, team: req.body.team, position: req.body.position});
	player.save(function(err){
		if(err){
			console.log('something went wrong');
		} else {
			console.log('player successfully added');
			res.redirect('/');
		}
	})
}

playerController.showEdit = function(req, res){
	Player.find({_id : req.params.id},function(err,player){
		if(err){
			console.log('something went wrong');
		} else {
			console.log(player);
			res.render('edit',{data:player});
		}
	})
}

playerController.editPlayer = function(req, res){
	Player.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, team: req.body.team, position: req.body.position }}, function (err, player) {
	  	if (err) {
	  		console.log('something went wrong');
	  	} else {
	  		console.log('woohoo');
	  		res.redirect('/');
	  	}
	});
}

playerController.deletePlayer = function(req, res){
	Player.find({_id: req.params.id}).remove().exec();
	res.redirect('/');
}

module.exports = playerController;