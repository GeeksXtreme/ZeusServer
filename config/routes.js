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

// var user = require('../app/controllers/user');
// app.get('/login', facebook_sdk.loginRequired({scope : 'email, read_stream, publish_stream, user_birthday, user_location, user_work_history, user_hometown, user_photos'}), user.login);
// app.get('/get/inbox', user.getInbox);
