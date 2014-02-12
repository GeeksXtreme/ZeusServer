var expressJwt = require('express-jwt'),
	jwt = require('../node_modules/express-jwt/node_modules/jsonwebtoken'),
	Args = require('args-js');

var secret = "bC4v3?47J7Cir]t?2RPengK)es?RoiYT$ML{p3&LRT77]6V=HT)8CqoHCH88eGk38g:rAh.sfZ;VRAJf>4)jw4np7VVqK@[9d[)8";

exports.protect = function(app, route) {
	var args = Args([
		{app:  				Args.OBJECT   | Args.Required},
		{route: 			Args.STRING	  | Args.Required}
	], arguments);
	// We are going to protect /api routes with JWT
	args.app.use(args.route, expressJwt({secret: secret}));
};

exports.signIn = function(){

	var args = Args([
		{app:  				Args.OBJECT   | Args.Required},
		{route: 			Args.STRING	  | Args.Optional,
			_default: '/authenticate'},
		{authFn:    		Args.FUNCTION | Args.Optional,
			_default: function(req){
				return {
					username: 'test'
				};
			}},
		{expiresInMinutes:  Args.INT      | Args.Optional,
			_default: 300},
		{failFn: 			Args.FUNCTION | Args.Optional,
			_default: function(res){
				res.send(401, 'Wrong user or password');
			}}
	], arguments);

	args.app.post(args.route, function (req, res) {

		var profile = args.authFn(req);

		if (!profile) args.failFn(res); else {
			// We are sending the profile inside the token
			var token = jwt.sign(profile, secret,
				{expiresInMinutes: args.expiresInMinutes});

			res.json({ token: token });
		}
	});	

};