var express = require('express'),
	fs = require('fs');

module.exports = function(app){

	var modelsPath = __dirname + '/../app/controllers';
	fs.readdirSync(modelsPath).forEach(function (file) {
	  if (file.indexOf('.js') >= 0) {
	    var route = require(modelsPath + '/' + file);
	    if (toString.call(route) === "[object Array]"){
	    	for (var i = route.length - 1; i >= 0; i--) {
	    		app[route[i].method](route[i].path, route[i].func);
	    	};
	    } else {
	    	app[route.method](route.path, route.func);
	    }
	    
	  }
	});

};
