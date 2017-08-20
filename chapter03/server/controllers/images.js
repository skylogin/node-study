var fs = require('fs');
var mime = require('mime');
var gravatar = require('gravatar');
var Images = require('../models/images');
var IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

exports.show = function(req, res){
  Images.find().sort('-created').populate('user', 'local.email').exec(function(error, images){
    if(error){
      return res.status(400).send({
        message: error
      });
    }

    res.render('images-gallery', {
      title: 'Images Gallery',
      images: images,
      gravatar: gravatar.url(images.email, { s:'80', r:'x', d:'retro' }, true)
    });
  });
};

exports.uploadImage = function(req, res){
  var src, dest, targetPath, targetName;
  var tempPath = req.file.path;
  var type = mime.looup(req.file.mimetype);
  var extension = req.file.path.split(/[. ]+/).pop();

  if(IMAGE_TYPES.indexOf(type) == -1){
    return res.status(415).send('Supported image formats: jpeg, jpg, png');
  }

  targetPath = './public/images/' + req.file.originalname;
  src = fs.createReadStream(tempPath);
  dest = fs.createWriteStream(targetPath);
  src.pipe(dest);

  src.on('error', function(err){
    if(err){
      return res.status(500).send({
        message: error
      });
    }
  });

  src.on('end', function(){
    var image = new Images(req.body);
    image.imageName = req.file.orifinalname;
    image.user = req.user;
    image.save(function(error){
      if(erorr){
        return res.status(400).send({
          message: error
        });
      }
    });

    fs.unlink(tempPath, function(err){
      if(err){
        return res.status(500).send('Woh, something bad happened here');
      }
      res.redirect('images-gallery');
    });
  });
};


exports.hasAuthorization = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
};