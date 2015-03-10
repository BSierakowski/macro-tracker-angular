var bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Food = mongoose.model('Food');

module.exports = function(app) {
  // SERVER ROUTES =======================================

  // get all foods
  app.get('/foods', function(req, res) {
    Food.find(function(err, foods) {
      if (err) { return err; }

      res.json(foods);
    });
  });

  app.get('*', function(req, res) {
    res.send('index.html');
  });
}
