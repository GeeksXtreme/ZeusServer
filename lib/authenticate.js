var facebook = require('../config/facebook');

module.exports = function(){
	facebook.api('/trungpheng', function(err, data){
		if(err) console.log(err);
		console.log(data);
	});
};

