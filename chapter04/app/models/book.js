var Schema = require('jugglingdb').Schema;
var schema = new Schema('mongodb', {url: 'mongodb://localhost/myapp'});

var Picture = schema.define('Picture', {
  title: {type: String, length: 255},
  description: {type: Schema.Text},
  category: {type: String, length: 255},
  image: {type: JSON}
});

module.exports = schema;