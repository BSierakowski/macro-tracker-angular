'use strict';

app.factory('FoodService', ['$resource', '$q', '$http', 'foodsCache', function($resource, $q, $http, foodsCache) {
  var lookupFood = function(foods, _id) {
    var lookup = {};
    for(var i = 0; i < foods.length; i++) {
      lookup[foods[i]._id] = foods[i];
    }

    return lookup[_id];
  }

	return {
		getFood: function(_id) {
      var foods = foodsCache.get('foods');
      var food;
      var deferred = $q.defer();

      if (foods) {
        food = lookupFood(foods, _id);
        deferred.resolve(food);
      } else {
        this.getFoods().then(
          function(data) {
            food = lookupFood(data, _id);
            deferred.resolve(food);
          },
          function(error) {
            deferred.reject(error);
          });
      }

      return deferred.promise;
		},
		getFoods: function() {
      var foods = foodsCache.get('foods');
      var deferred = $q.defer();

      if (foods) {
        deferred.resolve(foods);
        return deferred.promise;
      } else {
        $http.get('/foods')
          .success(function(data, status, headers, config) {
            window.foods = data;
            foodsCache.put('foods', data);
            deferred.resolve(data);
          })
          .error(function(data, status, headers, config) {
            deferred.reject(data);
          });

        return deferred.promise;
      }
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
				{_id: "54e831ee1cce599395e484fe", name: 'Chicken', calories: 120, protein: 26, carbs: 0, fat: 1.5, sodium: 72, fiber: 0, servingSize: 1, servings: 1},
        {_id: "54e831ee1cce599395e484f3", name: 'Strawberry Poptart', calories: 400, protein: 4, carbs: 76, fat: 10, sodium: 336, fiber: 0, servingSize: 2, servings: 1},
				{_id: "54e831ee1cce599395e48507", name: '95\/5 Ground Beef', calories: 164, protein: 25, carbs: 0, fat: 6, sodium: 0, fiber: 0, servingSize: 1, servings: 1},
				{_id: "54e831ee1cce599395e484f4", name: 'Oatmeal', calories: 150, protein: 5, carbs: 27, fat: 3, sodium: 0, fiber: 0, servingSize: 1, servings: 1},
				{_id: "54e831ee1cce599395e4855b", name: 'Whole Grain Bread ', calories: 100, protein: 5, carbs: 20, fat: 2, sodium: 120, fiber: 0, servingSize: 1, servings: 1},
				{_id: "54e831ee1cce599395e484f5", name: 'Banana', calories: 105, protein: 1, carbs: 27, fat: 0, sodium: 0, fiber: 0, servingSize: 1, servings: 1},
			];
      meals[yesterday].totals = {
        totalCals: 1039,
        totalProtein: 66,
        totalCarbs: 150,
        totalFat: 13,
        totalSodium: 528/24,
        totalFiber: 0
      };
			meals[today] = [
        {_id: "54e831ee1cce599395e484f3", name: 'Strawberry Poptart', calories: 400, protein: 4, carbs: 76, fat: 1, sodium: 72, fiber: 0, servingSize: 2, servings: 1},
				{_id: "54e831ee1cce599395e484fe", name: 'Chicken', calories: 120, protein: 26, carbs: 0, fat: 1.5, sodium: 72, fiber: 0, servingSize: 1, servings: 1},
				{_id: "54e831ee1cce599395e484f5", name: 'Banana', calories: 105, protein: 1, carbs: 27, fat: 0, sodium: 0, fiber: 0, servingSize: 1, servings: 1},
				{_id: "54e831ee1cce599395e484f4", name: 'Oatmeal', calories: 150, protein: 5, carbs: 27, fat: 3, sodium: 0, fiber: 0, servingSize: 1, servings: 1},
				{_id: "54e831ee1cce599395e48507", name: '95\/5 Ground Beef', calories: 164, protein: 25, carbs: 0, fat: 6, sodium: 0, fiber: 0, servingSize: 1, servings: 1},
				{_id: "54e831ee1cce599395e4855b", name: 'Whole Grain Bread ', calories: 100, protein: 5, carbs: 20, fat: 2, sodium: 120, fiber: 0, servingSize: 1, servings: 1}
			];
      meals[today].totals = {
        totalCals: 1039,
        totalProtein: 66,
        totalCarbs: 150,
        totalFat: 13,
        totalSodium: parseFloat(528/24),
        totalFiber: 0
      };
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
