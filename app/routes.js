var bodyParser = require('body-parser');

module.exports = function(app) {
	// SERVER ROUTES =======================================

	// default route
	app.get('*', function(req, res) {
		res.send('index.html');
	});

  // TODO: get foods from DB
  var foods = [
		{name: 'bread', cals: 100, protein: 10, carbs: 30, fat: 2},
		{name: 'banana', cals: 150, protein: 1, carbs: 25, fat: 0},
		{name: 'beef', cals: 300, protein: 20, carbs: 5, fat: 10},
    {name: 'whey protein', cals: 645, protein: 50, carbs: 100, fat: 5},
    {name: 'milk', cals: 169, protein: 20, carbs: 20, fat: 1},
    {name: 'chicken', cals: 290, protein: 10, carbs: 40, fat: 10},
    {name: 'oatmeal', cals: 645, protein: 50, carbs: 100, fat: 5},
    {name: 'rice', cals: 169, protein: 20, carbs: 20, fat: 1},
    {name: 'steak', cals: 290, protein: 10, carbs: 40, fat: 10},
    {name: 'cookies', cals: 645, protein: 50, carbs: 100, fat: 5},
    {name: 'orange juice', cals: 169, protein: 20, carbs: 20, fat: 1},
		{name: 'poptart', cals: 200, protein: 2, carbs: 55, fat: 5}
  ];

  // get all foods
  app.get('/foods', function(req, res) {
    res.send(foods);
  });

  // TODO: how to get a unique food? only name is of interest and they
  // may not be unique
}
