token = require('../../lib/token');

module.exports = function(app) {
	app.get('/token/signin',token.signIn());
};