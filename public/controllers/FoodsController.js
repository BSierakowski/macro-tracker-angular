'use strict';

app.controller('FoodsController', function($scope, $filter, foodService, MealService, DateService) {
	// for new food inputs
	$scope.showNewFood = false;

	$scope.currentMealDate = DateService.getDateNow();
	$scope.currentMeal = getMeal($scope.currentMealDate);
	$scope.foods = foodService.getFoods();

	// initialize filtered foods with all foods
	$scope.filteredFoods = $scope.foods;

	init();

	function init() {
		createWatch();
	}

	function createWatch() {
		$scope.$watch('nameFilterValue', function (filterInput) {
      filterFoods(filterInput);
    });

    $scope.$watchCollection('currentMeal', function(newValue, oldValue) {
			calculateTotals();
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

			foodService.addNewFood($scope.newFood);

			$scope.newFood = {};
		} else {
			alert('must input food info');
		}
	};

	$scope.addFoodToMeal = function() {
    MealService.addFoodToMeal($scope.currentMeal, this.food);
	};

  // update macros after servings input change
	$scope.updateMacros = function(food) {
    MealService.updateMacros(food);
		calculateTotals();
	}

	$scope.increaseServing = function(food) {
    // FIXME: cannot have duplicate keys (foods) in ng-repeat
    // this breaks if you try and decrease serving on a duplicate food
    MealService.increaseServing($scope.currentMeal, food);
    calculateTotals();
	};

	$scope.decreaseServing = function(food) {
    // FIXME: cannot have duplicate keys (foods) in ng-repeat
    // this breaks if you try and decrease serving on a duplicate food
    MealService.decreaseServing($scope.currentMeal, food);
    calculateTotals();
	};

	$scope.incrementDay = function() {
    DateService.incrementDay($scope.currentMealDate);
    $scope.currentMeal = getMeal($scope.currentMealDate);
	}

	$scope.decrementDay = function() {
    DateService.decrementDay($scope.currentMealDate);
    $scope.currentMeal = getMeal($scope.currentMealDate);
	};

	function getMeal(date) {
		return foodService.getMeal(date);
	}

	function calculateTotals() {
    // should MealService.calculateTotals return a meal object?
    $scope.currentMeal.totals = MealService.calculateTotals($scope.currentMeal);
	}
});
