var facebook_sdk = require('facebook-node-sdk');


facebook = new facebook_sdk({
  appID  : '1413756735525761',
  secret : '026ec6e9346a1553e951746adbd0cb89'
}).setAccessToken('1413756735525761|026ec6e9346a1553e951746adbd0cb89');

module.exports = facebook;