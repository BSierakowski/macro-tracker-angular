'use strict';

app.factory('FoodService', ['$resource', '$q', '$http', 'foodsCache', 'mealsCache', function($resource, $q, $http, foodsCache, mealsCache) {
  function lookupFood(foods, _id) {
    var lookup = {};
    for(var i = 0; i < foods.length; i++) {
      lookup[foods[i]._id] = foods[i];
    }

    return lookup[_id];
  }

  function lookupMeal(meals, date) {
    var lookup = {};
    for(var i = 0; i < meals.length; i++) {
      lookup[meals[i].date] = meals[i];
    }

    return lookup[date];
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
          foods = data;
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
      var meals = mealsCache.get('meals');
      var meal;
      var deferred = $q.defer();

      if (meals) {
        meal = lookupMeal(meals, date);
        deferred.resolve(meal);
      } else {
        this.getMeals().then(
          function(data) {
          meal = lookupMeal(data, date);

          //TODO: where and how should i generate date? same as DateService?
          if (!meal) {
            meal = {
              date: "03-12-2015",
              foods: []
            };
          }
          deferred.resolve(meal);
        },
        function(error) {
          deferred.reject(error);
        });
      }

      return deferred.promise;
    },
    getMeals: function() {
      //TODO: limit meals cache to current and x previous
      var meals = mealsCache.get('meals');
      var deferred = $q.defer();

      if (meals) {
        deferred.resolve(meals);
        return deferred.promise;
      } else {
        $http.get('/meals')
        .success(function(data, status, headers, config) {
          meals = data;
          mealsCache.put('meals', data);
          deferred.resolve(data);
        })
        .error(function(data, status, headers, config) {
          deferred.reject(data);
        });

        return deferred.promise;
      }
    },
    addFoodToMeal: function(date, food) {
      var meal = this.getMeal(date);
      meal.push(food);

      // PUT food to server
    },
    addNewFood: function(food) {
      // POST food to server

    }
  };
}]);
