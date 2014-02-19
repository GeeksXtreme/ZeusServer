var express = require('express'),
	fs = require('fs'),
	Q = require('q'),
	readDir = require('../lib/readDir');

module.exports = function(app){

	var modules = {},
		modulesDeferreds = {};

	app.createModule = function(name, module, override){
		if (modules[name] && !override){
			console.error('Module '+name+' has already been defined');
			process.exit(1);
		} else {
			modules[name] = module;
			if (modulesDeferreds[name]){
				while (modulesDeferreds[name].length > 0){
					modulesDeferreds[name].pop().resolve(module);
				}
				delete modulesDeferreds[name];
			}
		}
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
	fs.readdirSync(modelsPath)

	readDir(modelsPath, function(err, data){
		data.files.forEach(function(file) {
			if (file.length - file.indexOf('.js') === 3) {
				require(file)(app);
			}
		});
		if (Object.keys(modulesDeferreds).length > 0){
			for (name in modulesDeferreds){
				console.error('Module '+name+' not defined');
			}
			process.exit(1);
		}
	})

};
