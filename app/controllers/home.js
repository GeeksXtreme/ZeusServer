var mongoose = require('mongoose'),
  Article = mongoose.model('Article');

module.exports = {
	path: '/',
	method: 'get',
	func: function(req, res){
		Article.find(function(err, articles){
			if(err) throw new Error(err);
			res.render('home/index', {
				title: 'Generator-Express MVC',
				articles: articles
			});
		});
	}
};

