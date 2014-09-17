'use strict';

app.controller('FoodsController', function($scope, foodService) {
	// for new food inputs
	$scope.showNewFood = false;

	$scope.meals = foodService.getMeals();
	// console.log($scope.meals);
	$scope.foods = foodService.getFoods();

	$scope.currentFoodsDate = getCurrentDate();

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
		alert('serving increased for: \n' + JSON.stringify(food));
	};

	$scope.decreaseServing = function(food) {
		alert('serving decreased for: \n' + JSON.stringify(food));
	};

	$scope.previousDay = function() {
		alert('showing previous day\'s foods');
	};

	$scope.nextDay = function() {
		alert('showing next day\'s foods');	
	};

	$scope.$watchCollection('meals', function(newValue, oldValue) {
		$scope.totalCals = 0;
		$scope.totalProtein = 0;
		$scope.totalCarbs = 0;
		$scope.totalFat = 0;
		$scope.meals.forEach(function(meal) {
			meal.forEach(function(food) {
				$scope.totalCals += parseInt(food.cals);
				$scope.totalProtein += parseInt(food.protein);
				$scope.totalCarbs += parseInt(food.carbs);
				$scope.totalFat += parseInt(food.fat);
			});
		});
	});
});