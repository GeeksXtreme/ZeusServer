module.exports.fetchData = function(fb_object, access_token){
	var fb_object = {
		"object":"page",
		"entry":[{
			"id":"541605125924255",
			"time":1384944325,
			"changes":[{
			"field":"feed",
			"value":
				{
					"item":"comment",
					"verb":"add",
					"comment_id":"550466851704749_11073255",
					"parent_id":550466851704749,
					"sender_id":541605125924255,
					"created_time":1384944325
					}
			}]
		}]};

	//get data from facebook
	var fid = fb_object.entry.value.comment_id;
	var arrParam = {
		'access_token' : access_token
	};

	facebook.api('/'+comment_id, 'GET', arrParam, function(err, respon){
		if(err) throw err;
		console.log(respon);
	});
};