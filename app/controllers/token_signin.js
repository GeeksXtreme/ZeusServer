token = require('../../lib/token');

module.exports = {
	path: '/token/signin',
	method: 'get',
	func: token.signIn()
};