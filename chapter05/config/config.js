var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'chapter05'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/chapter05-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'chapter05'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/chapter05-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'chapter05'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/chapter05-production'
  }
};

module.exports = config[env];
