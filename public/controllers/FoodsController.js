'use strict';

app.controller('FoodsController', ['$scope', '$filter', 'FoodService', 'MealService', 'DateService', function($scope, $filter, FoodService, MealService, DateService) {
  // for new food inputs
  $scope.showNewFood = false;

  $scope.currentMealDate = DateService.getDateNow();
  console.log($scope.currentMealDate);

  init();

  function init() {
    getFoods();
    getMeal($scope.currentMealDate);
    createWatch();
  }

  function createWatch() {
    $scope.$watch('nameFilterValue', function (filterInput) {
      filterFoods(filterInput);
    });
  }

  function getFoods() {
    FoodService.getFoods().then(
      function(data) {
        $scope.foods = data;
        $scope.filteredFoods = $scope.foods;
      },
      function(error) {
        console.log('ERROR! ' + error);
      });
  }

  function getMeal(date) {
    FoodService.getMeal(date).then(
      function(data) {
        $scope.currentMeal = data;
      },
      function(error) {
        console.log('ERROR! ' + error);
      });
  }

  function filterFoods(filterInput) {
    $scope.filteredFoods = $filter('foodFilter')($scope.foods, filterInput);
  }

  $scope.addNewFood = function() {
    if($scope.newFood !== undefined &&
        $scope.newFood.name !== undefined &&
        $scope.newFood.cals !== undefined &&
        $scope.newFood.protein !== undefined &&
        $scope.newFood.carbs !== undefined &&
        $scope.newFood.fat !== undefined) {

      FoodService.addNewFood($scope.newFood);

      $scope.newFood = {};
    } else {
      alert('must input food info');
    }
  };

  $scope.addFoodToMeal = function(food) {
    MealService.addFoodToMeal($scope.currentMeal, food);
  };

  // update macros after servings input change
  $scope.updateMacros = function(food) {
    MealService.updateMacros($scope.currentMeal, food);
  }

  $scope.increaseServing = function(food) {
    MealService.increaseServing($scope.currentMeal, food);
  };

  $scope.decreaseServing = function(food) {
    MealService.decreaseServing($scope.currentMeal, food);
  };

  $scope.incrementDay = function() {
    DateService.incrementDay($scope.currentMealDate);
    $scope.currentMeal = getMeal($scope.currentMealDate);
  }

  $scope.decrementDay = function() {
    DateService.decrementDay($scope.currentMealDate);
    $scope.currentMeal = getMeal($scope.currentMealDate);
  };
}]);
