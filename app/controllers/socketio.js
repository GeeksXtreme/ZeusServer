var io = require('../../lib/socketio');

module.exports = function(app){
	IO = new io(app);
};