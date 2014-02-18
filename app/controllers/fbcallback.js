module.exports = function(app){
	var fbcallback = function(req, res){
		var verify_token = 'zeus-server';
		if (req.method === 'GET') {

			var hub_mode = req.query['hub_mode'];
			var hub_verify_token = req.query['hub.verify_token'];
			console.log(hub_verify_token, verify_token);
			if(hub_verify_token === verify_token){
				console.log(req.query['hub.challenge']);
				res.json(parseInt(req.query['hub.challenge']));
			}

		}else if(req.method === 'POST'){
			// luu du lieu vao db
			// neu user onl: notification cho ho
			// du lieu gui ve dang: 
			// var notification_object = '{
			//	"object":"page",
			//	"entry":[{
			//		"id":"541605125924255",
			//		"time":1384944325,
			//		"changes":[{
			//		"field":"feed",
			//		"value":
			//			{
			//				"item":"comment",
			//				"verb":"add",
			//				"comment_id":"550466851704749_11073255",
			//				"parent_id":550466851704749,
			//				"sender_id":541605125924255,
			//				"created_time":1384944325
			//				}
			//		}]
			//	}]}';			
						
			// facebook.api('/'+notification_object.entry.value.comment_id, arrParam, function(err,data){
			// 	if(err) throw err;
			// 	console.log(data);
			// 	//xu ly du lieu de emit xuong
			// 	//
			// 	var message = 'add post';
			// 	IO.notify('test',message, notification_object)
			// 	.then(
			// 		function(){
			// 			//success
			// 		},function(){
			// 			//err
			// 		});
			// });
			// 
			res.json(1);
		};
	};

	app.all('/facebook/callback', fbcallback);
};