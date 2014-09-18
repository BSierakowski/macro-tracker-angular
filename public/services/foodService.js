'use strict';

// test service for now, will be making ajax calls using the $resource service for real data
app.factory('foodService', function($resource) {
	return {
		getFoods: function() {
			return [
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
		},
		getMeals: function() {
			// var today = new Date();
			// var yesterday = new Date();
			// yesterday.setDate(yesterday.getDate() - 1);

			return [ 
					{name: 'bread', cals: 100, protein: 10, carbs: 30, fat: 2},
					{name: 'banana', cals: 150, protein: 1, carbs: 25, fat: 0},
					{name: 'beef', cals: 300, protein: 20, carbs: 5, fat: 10},
					{name: 'oatmeal', cals: 200, protein: 5, carbs: 50, fat: 2},
					{name: 'poptart', cals: 200, protein: 2, carbs: 55, fat: 5},
					{name: 'bread', cals: 100, protein: 10, carbs: 30, fat: 2},
					{name: 'banana', cals: 150, protein: 1, carbs: 25, fat: 0},
					{name: 'beef', cals: 300, protein: 20, carbs: 5, fat: 10},
					{name: 'oatmeal', cals: 200, protein: 5, carbs: 50, fat: 2},
					{name: 'poptart', cals: 200, protein: 2, carbs: 55, fat: 5},
					{name: 'bread', cals: 100, protein: 10, carbs: 30, fat: 2},
					{name: 'banana', cals: 150, protein: 1, carbs: 25, fat: 0},
					{name: 'beef', cals: 300, protein: 20, carbs: 5, fat: 10},
					{name: 'oatmeal', cals: 200, protein: 5, carbs: 50, fat: 2},
					{name: 'poptart', cals: 200, protein: 2, carbs: 55, fat: 5}
			];
		}
	};
});