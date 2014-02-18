var express = require('express'),
	fs = require('fs'),
	Q = require('q');

module.exports = function(app){

	var modules = {},
		modulesDeferreds = {};

	app.createModule = function(name, module){
		modules[name] = module;
		if (modulesDeferreds[name])
			for (var i = modulesDeferreds[name].length - 1; i >= 0; i--) {
				modulesDeferreds[name][i].resolve(module);
			};
	};

	app.require = function(listOfModules, fn){
		var listOfPromise = [];
		for (var i = 0, l = listOfModules.length; i < l; i++){
			var name = listOfModules[i],
				deferred = Q.defer();
			if (modules[name]) deferred.resolve(modules[name]);
			else {
				modulesDeferreds[name] = modulesDeferreds[name] || [];
				modulesDeferreds[name].push(deferred);
			};
			listOfPromise.push(deferred.promise);
		}
		Q.all(listOfPromise).spread(fn);
	};

	var modelsPath = __dirname + '/../app/controllers';
	fs.readdirSync(modelsPath).forEach(function (file) {
	  if (file.indexOf('.js') >= 0) {
	    var route = require(modelsPath + '/' + file);
	    route(app);
	  }
	});

};
