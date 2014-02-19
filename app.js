facebook_sdk = require('facebook-node-sdk');
facebook = require('./config/facebook');

require('./lib/clim')();

var express = require('express'),
  mongoose = require('mongoose'),
  fs = require('fs'),
  config = require('./config/config'),
  facebook = require('./config/facebook');
  readDir = require('./lib/readDir'),
  Q = require('q');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var modelsPath = __dirname + '/app/models';
readDir(modelsPath, function(err, data){
	data.files.forEach(function(file) {
		if (file.length - file.indexOf('.js') === 3) {
			require(file);
		}
	});
});

var app = express();
app.httpServer = app.listen(config.port);

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
app.createModule('facebook', facebook);
app.createModule('facebook_sdk', facebook_sdk);
require('./config/express')(app, config);
require('./config/routes')(app)
.then(function(){
	if (Object.keys(modulesDeferreds).length > 0){
		for (name in modulesDeferreds){
			console.error('Module '+name+' not defined');
		}
		process.exit(1);
	}
});
