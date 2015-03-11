var mongoose = require('mongoose'),
    crypto = require('crypto')
    util = require('util');

module.exports = function(config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function() {
    console.log('mongo db opened');
  });

  var foodSchema = mongoose.Schema({
    name: String,
    calories: Number,
    servingUnit: String,
    servingSize: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    sodium: Number,
    fiber: Number
  });

  var mealSchema = mongoose.Schema({
    date: Date,
    foods: Array,
    totals: Object
  });

  mongoose.model('Food', foodSchema);
  mongoose.model('Meal', mealSchema);
}
