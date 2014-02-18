var socketio = require('socket.io'),
	token = require('./token'),
	_ = require('underscore'),
	Q = require('q');

module.exports = function(app){
	var io = socketio.listen(app.httpServer);
	io.set('log level', 1);
	
	this.sockets = {},
	this.get = function(profile){
		var deferred = Q.defer();
		if (_.isString(profile)){
			deferred.resolve(this.sockets[profile]);
		} else if (profile.username) {
			deferred.resolve(this.sockets[profile.username]);
		} else deferred.reject();
		return deferred.promise;
	};
	this.connect = function(profile, socket){
		var deferred = Q.defer();
		if (_.isString(profile)){
			this.sockets[profile] = socket;
			deferred.resolve();
		} else if (profile.username) {
			this.sockets[profile.username] = socket;
			deferred.resolve();
		} else deferred.reject();
		return deferred.promise;
	};
	this.disconnect = function(profile){
		var deferred = Q.defer();
		if (_.isString(profile)){
			this.sockets[profile] = false;
			deferred.resolve();
		} else if (profile.username) {
			this.sockets[profile.username] = false;
			deferred.resolve();
		} else deferred.reject();
		return deferred.promise;
	};
	this.notify = function(profile, message, data){
		var deferred = Q.defer();
		this.get(profile).then(function(socket){
			socket.emit(message, data);
			deferred.resolve();
		}, function(err){
			deferred.reject();
		});
		return deferred.promise;
	};
	this.Events = {};
	this.on = function(evt, fn){
		this.Events[evt] = fn;
	};
	this.io = io;

	var self = this;
	
	token.protectSocket(io);
	
	io.sockets.on('connection', function(socket){
		var profile = token.socketProfile(socket)
		
		self.connect(profile, socket)
		.then(function(){
			socket.emit('authentication succeed');
		}, function(err){
			socket.emit('authentication failed');
		});
		
		socket.on('disconnect', function() {
			self.disconnect(profile.username);
		});

		var events = self.Events;
		for (evt in events){
			socket.on(evt, events[evt]);
		}
	});
};