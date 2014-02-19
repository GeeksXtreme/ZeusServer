var express = require('express'),
	fs = require('fs'),
	Q = require('q'),
	readDir = require('../lib/readDir');

var express = require('express'),
	fs = require('fs'),
	Q = require('q'),
	readDir = require('../lib/readDir');

module.exports = function(app){
	var deferred = Q.defer();
	var modelsPath = __dirname + '/../app/controllers';
	fs.readdirSync(modelsPath)

	readDir(modelsPath, function(err, data){
		if (err) deferred.reject();
		else data.files.forEach(function(file) {
			if (file.length - file.indexOf('.js') === 3) {
				require(file)(app);
			}
			deferred.resolve();
		});
	});

	return deferred.promise;
};

