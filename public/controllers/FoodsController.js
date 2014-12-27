'use strict';

app.controller('FoodsController', function($scope, $filter, foodService, MealService, DateService) {
	// for new food inputs
	$scope.showNewFood = false;

	$scope.currentMealDate = DateService.getCurrentDate();
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
		var food = this.food;
		$scope.currentMeal.push({
			name: food.name,
			cals: food.cals,
			protein: food.protein,
			carbs: food.carbs,
			fat: food.fat,
			servings: 1
		});
	};

	$scope.updateMacros = function(food) {
		var baseFood = foodService.getFood(food.name);
		food.cals = food.servings * baseFood.cals;
		food.protein = food.servings * baseFood.protein;
		food.carbs = food.servings * baseFood.carbs;
		food.fat = food.servings * baseFood.fat;
		food.sodium = food.servings * baseFood.sodium;
		food.fiber = food.servings * baseFood.fiber;

		calculateTotals();
	}

	$scope.increaseServing = function(food) {
		var baseFood = foodService.getFood(food.name);
		food.servings = parseFloat(food.servings) + 1;
		food.cals = baseFood.cals * food.servings;
		food.protein = baseFood.protein * food.servings;
		food.carbs = baseFood.carbs * food.servings;
		food.fat = baseFood.fat * food.servings;
		food.sodium = baseFood.sodium * food.servings;
		food.fiber = baseFood.fiber * food.servings;

		calculateTotals();
	};

	$scope.decreaseServing = function(food) {
    MealService.decreaseServing(food);

		if(food.servings > 1) {
			var prevServings = food.servings;
			food.servings -= 1;
			food.cals = food.cals / prevServings * food.servings;
			food.protein = food.protein / prevServings * food.servings;
			food.carbs = food.carbs / prevServings * food.servings;
			food.fat = food.fat / prevServings * food.servings;
			food.sodium = food.sodium / prevServings * food.servings;

			calculateTotals();
		}
	};

	$scope.incrementDay = function() {
    $scope.currentMealDate = DateService.incrementDay($scope.currentMealDate);
    $scope.currentMeal = getMeal($scope.currentMealDate);
	}

	$scope.decrementDay = function() {
    $scope.currentmealdate = DateService.decrementDay($scope.currentMealDate);
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
