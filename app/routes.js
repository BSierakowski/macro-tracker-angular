var bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Food = mongoose.model('Food'),
    Meal = mongoose.model('Meal');

module.exports = function(app) {
  // SERVER ROUTES =======================================

  // get all foods
  app.get('/foods', function(req, res) {
    Food.find(function(err, foods) {
      if (err) { res.json(err); }

      res.json(foods);
    });
  });

  // get one meal by id
  //TODO: won't want to query by id but by DATE
  app.get('/meals/:id', function(req, res) {
    Meal.findOne({_id: req.params.id}, function(err, meal) {
      if (err) { res.json(err); }

      res.json(meal);
    });
  });

  app.get('*', function(req, res) {
    res.send('index.html');
  });
}
