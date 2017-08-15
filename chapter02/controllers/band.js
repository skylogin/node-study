var models = require('../models/index');
var Band = require('../models/band');

exports.create = function(req, res){
  //create Band model having request body
  models.Band.create(req.body).then(function(band){
    // res.json(band);
    res.redirect('/bands');
  });
};

exports.list = function(req, res){
  //total Band list
  models.Band.findAll({
    //sort by Date
    order: 'createdAt DESC'
  }).then(function(bands){
    // res.json(bands);
    res.render('band-list', {
      title: 'List bands',
      bands: bands
    });
  });
};

//get data by Band id
exports.byId = function(req, res){
  models.Band.find({
    where: {
      id: req.params.id
    }
  }).then(function(band){
    res.json(band);
  });
}

//update by id
exports.update = function(req, res){
  models.Band.find({
    where: {
      id: req.params.id
    }
  }).then(function(band){
    if(band){
      band.updateAttributes({
        name: req.body.name,
        description: req.body.description,
        album: req.body.album,
        year: req.body.year,
        UserId: req.body.user_id
      }).then(function(band){
        res.send(band);
      });
    }
  });
}


//delete by id
exports.delete = function(req, res){
  models.Band.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(band){
    res.json(band);
  });
}
