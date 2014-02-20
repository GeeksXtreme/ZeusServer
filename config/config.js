var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'zeusserver'
    },
    port: 3000,
    db: 'mongodb://localhost/zeusserver-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'zeusserver'
    },
    port: 3000,
    db: 'mongodb://localhost/zeusserver-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'zeusserver'
    },
    port: 3000,
    db: 'mongodb://localhost/zeusserver-production'
  },
  
  ios: {
    root: rootPath,
    app: {
      name: 'zeusserver'
    },
    port: 3000,
    db: 'mongodb://root:mininoic@ds033579.mongolab.com:33579/zeus'
  }
};

module.exports = config[env];
