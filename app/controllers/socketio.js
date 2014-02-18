var io = require('../../lib/socketio');

module.exports = function(app){
	var IO = new io(app);
	app.createModule('IO', IO);
}