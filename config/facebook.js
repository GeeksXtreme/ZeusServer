
var config = {
	appID  : '1413756735525761',
	secret : '026ec6e9346a1553e951746adbd0cb89',
	redirectUri : '/login/callback',
	scope		: 'read_stream, publish_stream, user_birthday, user_location, user_work_history, user_hometown, user_photos',
};

var facebook = new facebook_sdk(config).setAccessToken(config.appID+'|'+config.secret);

module.exports = facebook;
module.exports.config = config;