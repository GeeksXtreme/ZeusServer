var socketio = require('socket.io'),
	token = require('./token');

var io;

module.exports = function(app){
	var io = socketio.listen(app.httpServer);
	io.set('log level', 1);
	var sockets = {};
	token.protectSocket(io);
	io.sockets.on('connection', function(socket){
		var profile = token.socketProfile(socket);
		if (profile) {
			socket[profile.username] = socket;
			socket.emit('authentication succeed');
		} else {
			socket.emit('authentication failed');
		}
	});
	this.notify = function(username, message, data){
		sockets[username].emit(message, data);
	};
};