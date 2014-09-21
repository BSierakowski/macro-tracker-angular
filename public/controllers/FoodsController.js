'use strict';

app.controller('FoodsController', function($scope, $filter, foodService) {
	// for new food inputs
	$scope.showNewFood = false;

	$scope.meals = foodService.getMeals();
	// console.log($scope.meals);
	$scope.foods = foodService.getFoods();

	$scope.currentFoodsDate = getCurrentDate();

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
	}

	function filterFoods(filterInput) {
		$scope.filteredFoods = $filter('foodFilter')($scope.foods, filterInput);
	}

	function getCurrentDate() {
		var date = new Date();
		var month = date.getMonth();
		var day = date.getDay();
		var year = date.getYear();

		return month + '/' + day + '/' + year;
	}

	$scope.addFood = function() {
		if($scope.newFood !== undefined &&
			$scope.newFood.name !== undefined &&
			$scope.newFood.cals !== undefined &&
			$scope.newFood.protein !== undefined &&
			$scope.newFood.carbs !== undefined &&
			$scope.newFood.fat !== undefined) {
			$scope.foods.push({
				name: $scope.newFood.name,
				cals: $scope.newFood.cals,
				protein: $scope.newFood.protein,
				carbs: $scope.newFood.carbs,
				fat: $scope.newFood.fat
			});

			$scope.newFood = {};
		} else {
			alert('must input food info');
		}
	};

	$scope.buttonAddFoodToMeal = function() {
		var food = this.food;
		// $scope.foods.push({
		// 	name: food.name,
		// 	cals: food.cals,
		// 	protein: food.protein,
		// 	carbs: food.carbs,
		// 	fat: food.fat
		// });
		alert('would add [' + food.name + '] to the current meal');
	};

	$scope.increaseServing = function(food) {
		var prevServings = food.servings;
		food.servings += 1;
		food.cals = food.cals / prevServings * food.servings;
		food.protein = food.protein / prevServings * food.servings;
		food.carbs = food.carbs / prevServings * food.servings;
		food.fat = food.fat / prevServings * food.servings;
		food.sodium = food.sodium / prevServings * food.servings;

		calculateTotals();
	};

	$scope.decreaseServing = function(food) {
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
		alert('increment day');
	}

	$scope.decrementDay = function() {
		alert('decrement day');
		// will only work if $scope.currentFoodsDate is a Date() object -- it's not right now
		// var currentFoodsDate = $scope.currentFoodsDate;
		// var yesterday;

		// currentFoodsDate.setDate(currentFoodsDate.getDate() - 1);
		// yesterday = currentFoodsDate;

		// $scope.currentFoodsDate = yesterday.getMonth() +  '/' + yesterday.getDay() + '/' + yesterday.getYear();
	};

	$scope.getNextDay = function() {
		alert('showing next day\'s foods');	
	};

	$scope.$watchCollection('meals', function(newValue, oldValue) {
		calculateTotals();
	});

	function calculateTotals() {
		$scope.totalCals = 0;
		$scope.totalProtein = 0;
		$scope.totalCarbs = 0;
		$scope.totalFat = 0;
		$scope.meals.forEach(function(food) {
			$scope.totalCals += parseInt(food.cals);
			$scope.totalProtein += parseInt(food.protein);
			$scope.totalCarbs += parseInt(food.carbs);
			$scope.totalFat += parseInt(food.fat);
		});
	}
});