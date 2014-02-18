var express = require('express'),
	fs = require('fs'),
	io = require('../lib/socketio');;

module.exports = function(app){

	IO = new io(app);

	var modelsPath = __dirname + '/../app/controllers';
	fs.readdirSync(modelsPath).forEach(function (file) {
	  if (file.indexOf('.js') >= 0) {
	    var route = require(modelsPath + '/' + file);
	    route(app);
	  }
	});

};
