token = require('../../lib/token');

exports = function(app) {
	app.get('/token/signin',token.signIn());
};