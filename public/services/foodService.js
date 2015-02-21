'use strict';

/*
	test service for now, will be making ajax calls using the
	$http service for real data when backend routes exist
*/
app.factory('foodService', ['$resource', '$q', '$http', function($resource, $q, $http) {
	return {
		getFood: function(name) {
			var lookup = {};
			for(var i = 0; i < foods.length; i++) {
				lookup[foods[i].name] = foods[i];
			}

			return lookup[name];
		},
		getFoods: function() {
      var deferred = $q.defer();

      $http.get('/foods')
        .success(function(data, status, headers, config) {
          deferred.resolve(data);
        })
        .error(function(data, status, headers, config) {
          deferred.reject(data);
        });

      return deferred.promise;
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
				{name: 'poptart', calories: 200, protein: 2, carbs: 55, fat: 5, servings: 1},
				{name: 'beef', calories: 300, protein: 20, carbs: 5, fat: 10, servings: 1},
				{name: 'oatmeal', calories: 200, protein: 5, carbs: 50, fat: 2, servings: 1},
				{name: 'poptart', calories: 200, protein: 2, carbs: 55, fat: 5, servings: 1},
				{name: 'bread', calories: 100, protein: 10, carbs: 30, fat: 2, servings: 1},
				{name: 'banana', calories: 150, protein: 1, carbs: 25, fat: 0, servings: 1},
				{name: 'beef', calories: 300, protein: 20, carbs: 5, fat: 10, servings: 1}
			];
			meals[today] = [
				{name: 'bread', calories: 100, protein: 10, carbs: 30, fat: 2, servings: 1},
				{name: 'banana', calories: 150, protein: 1, carbs: 25, fat: 0, servings: 1},
				{name: 'beef', calories: 300, protein: 20, carbs: 5, fat: 10, servings: 1},
				{name: 'oatmeal', calories: 200, protein: 5, carbs: 50, fat: 2, servings: 1},
				{name: 'poptart', calories: 200, protein: 2, carbs: 55, fat: 5, servings: 1},
				{name: 'bread', calories: 100, protein: 10, carbs: 30, fat: 2, servings: 1},
				{name: 'banana', calories: 150, protein: 1, carbs: 25, fat: 0, servings: 1}
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
}]);
