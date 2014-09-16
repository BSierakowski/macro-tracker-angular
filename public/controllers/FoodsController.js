'use strict';

app.controller('FoodsController', function($scope, foodService) {
	// for new food inputs
	$scope.showNewFood = false;

	$scope.meals = foodService.getMeals();
	// console.log($scope.meals);
	$scope.foods = foodService.getFoods();

	$scope.addFood = function() {
		if($scope.newFood !== undefined) {
			$scope.foods.push({
				name: $scope.newFood.name,
				cals: $scope.newFood.cals,
				protein: $scope.newFood.protein,
				carbs: $scope.newFood.carbs,
				fat: $scope.newFood.fat
			});
		} else {
			alert('must input food info');
		}
	};

	$scope.buttonAddFood = function() {
		var food = this.food;
		$scope.foods.push({
			name: food.name,
			cals: food.cals,
			protein: food.protein,
			carbs: food.carbs,
			fat: food.fat
		});
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