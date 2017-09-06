var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var LocationSchema = new Schema({
  title: String,
  coordinates: {
    type: [Number],
    index: '2dsphere'
  },
  created: {
    type: Date,
    default: Date.now
  }
});
mongoose.model('Location', LocationSchema);