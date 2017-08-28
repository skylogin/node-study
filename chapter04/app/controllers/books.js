var express = require('express');
var router = express.Router();
var fs = require('fs');
var cloudinary = require('cloudinary').v2;
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var schema = require('../models/book');
var Picture = schema.models.Picture;

module.exports = function(app){
  app.use('/', router);
};

router.get('/', function(req, res, next){
  res.render('index', {
    title: 'PhotoBook'
  })
});


//get picture list
router.get('/books', function(req, res, next){
  Picture.all().then(function(photos){
    console.log(photos);
    res.render('book/books', {
      title: 'PhotoBook',
      photos: photos,
      cloudinary: cloudinary
    })
  });
});

//get form upload
router.get('/books/add', function(req, res, next){
  res.render('book/add-photo', {
    title: 'Upload Picture'
  });
});

//posting
router.post('/books/add', multipartMiddleware, function(req, res, next){
  console.log(req.files);

  //create Picture model & get temporary file path
  var photo = new Picture(req.body);
  var imageFile = req.files.image.path;

  //upload file to cloudinary
  cloudinary.uploader.upload(imageFile, {
    tags: 'photobook',
    folder: req.body.category + '/',
    public_id: req.files.image.originalFilename
    // eager: {
    //   width: 280, height: 200, crop: "fill", gravity: "face"
    // }
  }).then(function(image){
    console.log('Picture uploaded to Cloudinary');
    console.log(image);

    //add photo information to picture model & save metadata
    photo.image = image;
    return photo.save();
  }).then(function(photo){
    console.log('Successfully saved');

    //delete file from local directory
    var filePath = req.files.image.path;
    fs.unlinkSync(filePath);
  }).finally(function(){
    //rendering
    res.render('book/posted-photo', {
      title: 'Upload with Success',
      photo: photo,
      upload: photo.image
    });
  });
});