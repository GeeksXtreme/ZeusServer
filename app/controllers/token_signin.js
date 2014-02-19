var token = require('../../lib/token');

module.exports = function(app) {
	app.createModule('token',token);
	app.get('/token/signin',token.signIn());
};