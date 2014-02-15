var socketio = require('socket.io'),
	token = require('./token');

var io;

module.exports = function(app){
	var io = socketio.listen(app.httpServer);
	io.set('log level', 1);
	var sockets = {};
	io.sockets.on('connection', function(socket){
		socket.emit('authenticate', {});
		socket.on('authenticate token', function(data){
			token.verify(data.token)
			.then(function(profile){
				socket[profile.username] = socket;
				socket.emit('authentication succeed');
			}, function(){
				socket.emit('authentication fail');
			});
		})
	});
	this.notify = function(username, message, data){
		sockets[username].emit(message, data);
	};
};