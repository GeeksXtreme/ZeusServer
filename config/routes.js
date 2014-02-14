module.exports = function(app){

	//home route
	var home = require('../app/controllers/home');
	app.get('/', home.index);

	var user = require('../app/controllers/user');
	app.get('/login', facebook_sdk.loginRequired({scope : 'email, read_stream, publish_stream, user_birthday, user_location, user_work_history, user_hometown, user_photos'}), user.login);
	app.get('/get/inbox', user.getInbox);

};
