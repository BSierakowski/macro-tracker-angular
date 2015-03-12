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

  // get all meals
  app.get('/meals', function(req, res) {
    Meal.find(function(err, meals) {
      if (err) { res.json(err); }

      res.json(meals);
    });
  });

  // get one meal by date
  app.get('/meals/:date', function(req, res) {
    Meal.findOne({date: req.params.date}, function(err, meal) {
      if (err) { res.json(err); }

      res.json(meal);
    });
  });

  app.get('*', function(req, res) {
    res.send('index.html');
  });
}
