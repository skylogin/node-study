var models = require('../models/index');
var User = require('../models/user');

exports.create = function(req, res){
  //create User model having request body
  models.User.create({
    name: req.body.name,
    email: req.body.email
  }).then(function(user){
    res.json(user);
  });
};

exports.list = function(req, res){
  //total User list
  models.User.findAll({}).then(function(users){
    res.json(users);
  })
}