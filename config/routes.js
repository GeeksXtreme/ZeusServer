var express = require('express'),
	fs = require('fs');

module.exports = function(app){

	var modelsPath = __dirname + '/../app/controllers';
	fs.readdirSync(modelsPath).forEach(function (file) {
	  if (file.indexOf('.js') >= 0) {
	    var route = require(modelsPath + '/' + file);
	    route(app);
	  }
	});

};
