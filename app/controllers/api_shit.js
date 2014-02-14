module.exports = function(app){
	app.post('/api/shit',function(req, res){
		console.log(req.auth);
		res.json(req.user);
	});
};