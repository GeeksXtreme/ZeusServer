facebook_sdk = require('facebook-node-sdk');
facebook = require('./config/facebook');

require('./lib/clim')();

var express = require('express'),
  mongoose = require('mongoose'),
  fs = require('fs'),
  config = require('./config/config'),
  facebook = require('./config/facebook');
  readDir = require('./lib/readDir'),
  Q = require('q'),
  Args = require('args-js');

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

console.title('ANHNT MININOIC CONSOLE');
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
			var resolving = Object.keys(modulesDeferreds),
				index = resolving.indexOf(name);
			resolving[index] = resolving[index].green.underline;
			console.debug('Resolved:  '.green+resolving.join(' ')+' | '+resolving.length);
			delete modulesDeferreds[name];
			if (!Object.keys(modulesDeferreds).length)  console.done('ALL MODULE RESOLVED'.green);
		} else console.debug('Resolved:  '.green+name);
	}
};

app.require = function(){
	var args = Args([
		{listOfModules: Args.ARRAY    | Args.Optional},
		{fn: 			Args.FUNCTION | Args.Required}
	], arguments);
	var fn = args.fn, listOfModules = args.listOfModules;
	var fnString = fn.toString(),
	    fnListOfModules = fnString
	    .substring(
			fnString.indexOf('(')+1,
			fnString.indexOf(')'))
		.replace(/ /g,'')
		.split(',');
	if (!listOfModules) {
		listOfModules = fnListOfModules;
	} else {
	    var l = listOfModules.length, fnl = fnListOfModules.length;
	    if (l < fnl) for (var i = l, L = fnl; i < L; i++){
    	    listOfModules[i] = fnListOfModules[i];
    	} else listOfModules = fnListOfModules;
    }
	
	var listOfPromise = [], log = false;;
	for (var i = 0, l = listOfModules.length; i < l; i++){
		var name = listOfModules[i],
			deferred = Q.defer();
		if (modules[name]) deferred.resolve(modules[name]);
		else {
			modulesDeferreds[name] = modulesDeferreds[name] || [];
			if (!modulesDeferreds[name].length) log = true;
			modulesDeferreds[name].push(deferred);
		};
		listOfPromise.push(deferred.promise);
	}
	var resolving = Object.keys(modulesDeferreds);
	if (log) console.debug('Resolving: '.yellow+resolving.join(' ')+' | '+resolving.length);
	if (!resolving.length) console.done('ALL MODULE RESOLVED'.green);
	Q.all(listOfPromise).spread(fn);
};
console.title('STARTING SERVER');
app.createModule('facebook', facebook);
app.createModule('facebook_sdk', facebook_sdk);
require('./config/express')(app, config);
require('./config/routes')(app);
