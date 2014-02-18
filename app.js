facebook_sdk = require('facebook-node-sdk');
facebook = require('./config/facebook');

require('./lib/clim')();

var express = require('express'),
  mongoose = require('mongoose'),
  fs = require('fs'),
  config = require('./config/config');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var modelsPath = __dirname + '/app/models';
fs.readdirSync(modelsPath).forEach(function (file) {
  if (file.indexOf('.js') >= 0) {
    require(modelsPath + '/' + file);
  }
});

var app = express();
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: 'zeus' }));
app.use(facebook_sdk.middleware({ appId: facebook.config.appID, secret: facebook.config.secret }));

require('./config/express')(app, config);
require('./config/routes')(app);

app.listen(config.port);
