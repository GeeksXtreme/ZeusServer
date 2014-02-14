exports.login = function(req, res){
	var accessToken = req.session.access_token;
    if(accessToken) {
		res.redirect('/');
    }else{
    	//res.json(0);
    	console.log(req);
		var code = req.params.code;
		res.json(code);
    }
};

exports.getInbox = function(req, res){
	var url = '/541605125924255/conversations';
	var arrParam = {
		"access_token" : req.session.access_token
	};
	facebook.api(url, 'GET', arrParam, function(err, data){
		if(err) throw err;
		console.log(data);
		res.json(data);
	});

	res.json(0);
};