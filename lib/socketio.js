var socketio = require('socket.io'),
	token = require('./token');

var io;

module.exports = function(app){
	var io = socketio.listen(app.httpServer);
	var sockets = {};
	io.sockets.on('connection', function(socket){
		socket.emit('authenticate', {});
		socket.on('authenticate token', function(data){
			var profile = token.verify(data.token);
			console.log(profile);
			if ( profile ){
				socket[profile.username] = socket;
				socket.emit('authentication succeed');
			} else {
				socket.emit('authentication fail');
			}
		})
	});
	this.notify = function(username, message, data){
		sockets[username].emit(message, data);
	};
};