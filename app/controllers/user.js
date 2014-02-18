module.exports = function(app){

	var getAccessToken = function(req, res, next){
		var access_token = req.session.access_token;
		if(!access_token){
			//lay accessToken tu db ra
			access_token = 'CAAUFzeQFE4EBAOMdIrCMURltc1xYS6TifZBySo2VyszeH9LnULrs79hOfvMJM5vbjZCDwLygd529LoF0MV4B8iyF0gtQ5RVbqp4EVAsJxKh5S210okMfcx68GDKZAVdznO2ZCp4drJrIDu1zkZCgr7OeM8bO7STzGYDNMw07mLDEB2YZBZCPcgg';
			req.session.access_token = access_token;
		}
		next();
	};

	var getData = function(req, res){
		var fid = req.params.fid;
		var url = '/'+fid;
		var arrParam = {
			"access_token" : req.session.access_token
		};

		facebook.api(url, 'GET', arrParam, function(err, data){
			if(err) throw err;
			return res.json(data);
		});
	};

	var postData = function(req, res){
		/*
		 *	params type
		 *		1 : comments,
		 *		2 : messages,
		 *	
		 */
		
		var post_type = ['comments', 'messages'];

		var fid = req.params.fid || facebook.config.appID;
		var type = req.params.type;
		var parmas = req.body;
		parmas.access_token = req.session.access_token;

		var url = '/'+fid+post_type[type];
		facebook.api(url, 'POST', parmas, function(err, data){
			if(err) throw err;
			console.log(data);
			return res.json(data);
		});
	};

	var delData =function(req, res){
		var fid = req.params.fid;
		var arrParam = {
			"access_token" : req.session.access_token
		};

		facebook.api('/'+fid, 'DELETE', arrParam, function(err, data){
			if(err) throw err;
			console.log(data);
			return res.json(data);
		});

		return json(1);
	};

	var getFeed = function(req, res){
		var fid = '541605125924255';
		var arrParam = {
			"access_token" : req.session.access_token
		};
		facebook.api('/'+fid+'/feed', arrParam, function(err, data){
			if(err) throw err;
			res.json(data);
		});
	};

	app.get('/get-feed', getAccessToken, getFeed);
	app.get('/get-data/:fid', getAccessToken, getData);
	app.post('/post-data/:fid/:type', getAccessToken, postData);
	app.get('/del-data/:fid', getAccessToken, delData);
};