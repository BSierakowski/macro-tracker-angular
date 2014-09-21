'use strict';

app.controller('FoodsController', function($scope, $filter, foodService) {
	// for new food inputs
	$scope.showNewFood = false;

	$scope.currentFoodsDate = getCurrentDate();
	$scope.currentMeal = getMeal($scope.currentFoodsDate);
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

	function getCurrentDate() {
		var date = new Date();
		date.setHours(0, 0, 0, 0);

		return date;
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
		var currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0);
		if(currentDate.valueOf() > $scope.currentFoodsDate.valueOf()) {
			$scope.currentFoodsDate.setDate($scope.currentFoodsDate.getDate() + 1);
			$scope.currentMeal = getMeal($scope.currentFoodsDate);
		}
	}

	$scope.decrementDay = function() {
		$scope.currentFoodsDate.setDate($scope.currentFoodsDate.getDate() - 1);
		console.log('currentFoodsDate: ' + $scope.currentFoodsDate);
		$scope.currentMeal = getMeal($scope.currentFoodsDate);
	};

	$scope.getNextDay = function() {
		alert('showing next day\'s foods');	
	};

	function getMeal(date) {
		return foodService.getMeal(date);
	}

	function calculateTotals() {
		$scope.totalCals = 0;
		$scope.totalProtein = 0;
		$scope.totalCarbs = 0;
		$scope.totalFat = 0;
		$scope.currentMeal.forEach(function(food) {
			$scope.totalCals += parseInt(food.cals);
			$scope.totalProtein += parseInt(food.protein);
			$scope.totalCarbs += parseInt(food.carbs);
			$scope.totalFat += parseInt(food.fat);
		});
	}
});