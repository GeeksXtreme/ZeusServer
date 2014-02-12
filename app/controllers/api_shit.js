module.exports = {
	path: '/api/shit',
	method: 'post',
	func : function(req, res){
		console.log(req.auth);
		res.json(req.user);
	}
};