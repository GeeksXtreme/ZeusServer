var io = require('../../lib/socketio');

module.exports = function(app){
	UserNotification = new io(app);
};