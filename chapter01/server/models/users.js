//get bcrypt for mongoose and password encryt
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//define user model schema
var userSchema = mongoose.Schema({
  //local key for local strategy passport
  local: {
    name: String,
    email: String,
    password: String
  }
});

//encrypt password
userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


//check the valid password
userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.local.password);
};

//create user model and expose app
module.exports = mongoose.model('User', userSchema);