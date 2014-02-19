module.exports = function(app){
	var login = function(req, res){
			var accessToken = req.session.access_token;
		    if(accessToken) {
				res.redirect('/');
		    }else{
		    	console.log(accessToken);
		    	//xu ly luu accessToken vao db
		    	
				res.json(0);
		    }
	};

	app.require(['facebook','facebook_sdk'], function(facebook, facebook_sdk){
		app.get('/admin/login', facebook_sdk.loginRequired({scope : facebook.config.scope}), login);	
	});
};