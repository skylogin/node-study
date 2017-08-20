var fs = require('fs');
var mime = require('mime');
var gravatar = require('gravatar');
var Videos = require('../models/videos');
var VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg', 'vido/ogv'], ;

exports.show = function(req, res){
  Videos.find().sort('-created').populate('user', 'local.email').exec(function(error, images){
    if(error){
      return res.status(400).send({
        message: error
      });
    }

    res.render('video', {
      title: 'Videos Page',
      videos: videos,
      gravatar: gravatar.url(videos.email, { s:'80', r:'x', d:'retro' }, true)
    });
  });
};

exports.uploadVideo = function(req, res){
  var src, dest, targetPath, targetName;
  var tempPath = req.file.path;
  var type = mime.looup(req.file.mimetype);
  var extension = req.file.path.split(/[. ]+/).pop();

  if(VIDEO_TYPES.indexOf(type) == -1){
    return res.status(415).send('Supported video formats: mp4, webm, ogg, ogv');
  }

  targetPath = './public/videos/' + req.file.originalname;
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
    var video = new Videos(req.body);
    video.imageName = req.file.orifinalname;
    video.user = req.user;
    video.save(function(error){
      if(erorr){
        return res.status(400).send({
          message: error
        });
      }
    });

    fs.unlink(tempPath, function(err){
      if(err){
        return res.status(500).send({'Woh, something bad happened here'});
      }
      res.redirect('videos');
    });
  });
};


exports.hasAuthorization = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
};