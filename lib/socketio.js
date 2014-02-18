var socketio = require('socket.io'),
	token = require('./token'),
	_ = require('underscore'),
	Q = require('q');

module.exports = function(app){
	var io = socketio.listen(app.httpServer);
	io.set('log level', 1);
	
	IO = {
		sockets: {},
		get: function(profile){
			var deferred = Q.defer();
			if (_.isString(profile)){
				deferred.resolve(this.sockets[profile]);
			} else if (profile.username) {
				deferred.resolve(this.sockets[profile.username]);
			} else deferred.reject();
			return deferred.promise;
		},
		connect: function(profile, socket){
			var deferred = Q.defer();
			if (_.isString(profile)){
				this.sockets[profile] = socket;
				deferred.resolve();
			} else if (profile.username) {
				this.sockets[profile.username] = socket;
				deferred.resolve();
			} else deferred.reject();
			return deferred.promise;
		},
		disconnect: function(profile){
			var deferred = Q.defer();
			if (_.isString(profile)){
				this.sockets[profile] = false;
				deferred.resolve();
			} else if (profile.username) {
				this.sockets[profile.username] = false;
				deferred.resolve();
			} else deferred.reject();
			return deferred.promise;
		},
		notify: function(profile, message, data){
			var deferred = Q.defer();
			IO.get(profile).then(function(socket){
				socket.emit(message, data);
				deferred.resolve();
			}, function(err){
				deferred.reject();
			});
			return deferred.promise;
		}
	};
	
	token.protectSocket(io);
	
	io.sockets.on('connection', function(socket){
		var profile = token.socketProfile(socket)
		
		IO.connect(profile, socket)
		.then(function(){
			socket.emit('authentication succeed');
		}, function(err){
			socket.emit('authentication failed');
		});
		
		socket.on('disconnect', function() {
			IO.disconnect(profile.username);
		});
	});
};