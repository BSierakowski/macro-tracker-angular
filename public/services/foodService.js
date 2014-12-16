'use strict';

/*
	test service for now, will be making ajax calls using the
	$http service for real data when backend routes exist
*/
app.factory('foodService', function($resource) {
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

	return {
		getFood: function(name) {
			var lookup = {};
			for(var i = 0; i < foods.length; i++) {
				lookup[foods[i].name] = foods[i];
			}

			return lookup[name];
		},
		getFoods: function() {
			return foods;
		},
		getMeal: function(date) {
			var meal = this.getMeals()[date];
      if(meal) {
        return meal;
      }
			return [];
		},
		getMeals: function() {
			var today = new Date();
			today.setHours(0, 0, 0, 0);

			var yesterday = new Date();
			yesterday.setDate(today.getDate() - 1);
			yesterday.setHours(0, 0, 0, 0);

			var meals = {};
			meals[yesterday] = [
				{name: 'poptart', cals: 200, protein: 2, carbs: 55, fat: 5, servings: 1},
				{name: 'beef', cals: 300, protein: 20, carbs: 5, fat: 10, servings: 1},
				{name: 'oatmeal', cals: 200, protein: 5, carbs: 50, fat: 2, servings: 1},
				{name: 'poptart', cals: 200, protein: 2, carbs: 55, fat: 5, servings: 1},
				{name: 'bread', cals: 100, protein: 10, carbs: 30, fat: 2, servings: 1},
				{name: 'banana', cals: 150, protein: 1, carbs: 25, fat: 0, servings: 1},
				{name: 'beef', cals: 300, protein: 20, carbs: 5, fat: 10, servings: 1}
			];
			meals[today] = [
				{name: 'bread', cals: 100, protein: 10, carbs: 30, fat: 2, servings: 1},
				{name: 'banana', cals: 150, protein: 1, carbs: 25, fat: 0, servings: 1},
				{name: 'beef', cals: 300, protein: 20, carbs: 5, fat: 10, servings: 1},
				{name: 'oatmeal', cals: 200, protein: 5, carbs: 50, fat: 2, servings: 1},
				{name: 'poptart', cals: 200, protein: 2, carbs: 55, fat: 5, servings: 1},
				{name: 'bread', cals: 100, protein: 10, carbs: 30, fat: 2, servings: 1},
				{name: 'banana', cals: 150, protein: 1, carbs: 25, fat: 0, servings: 1}
			];
			return meals;
		},
		addFoodToMeal: function(date, food) {
			var meal = this.getMeal(date);
			meal.push(food);

			// PUT FOOD TO SERVER
		},
		addNewFood: function(food) {
			// POST food to server using $http

		}
	};
});
