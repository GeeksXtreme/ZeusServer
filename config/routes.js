var token = require('../lib/token');

module.exports = function(app){

	token.signin(app);

	token.protect(app, '/protect');

	app.get('/protect/shit', function(req, res){
		res.json(req.user);
	});

	//home route
	var home = require('../app/controllers/home');
	app.get('/', home.index);

};
