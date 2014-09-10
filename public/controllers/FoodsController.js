'use strict';

app.controller('FoodsController', function($scope, foodRetrievalService) {
	$scope.foods = foodRetrievalService.getFoods();

	$scope.addFood = function() {
		$scope.foods.push({
			name: $scope.newFood.name,
			cals: $scope.newFood.cals,
			protein: $scope.newFood.protein,
			carbs: $scope.newFood.carbs,
			fat: $scope.newFood.fat
		});
	};

	$scope.$watchCollection('foods', function(newValue, oldValue) {
		$scope.totalCals = 0;
		$scope.totalProtein = 0;
		$scope.totalCarbs = 0;
		$scope.totalFat = 0;
		$scope.foods.forEach(function(food) {
			$scope.totalCals += parseInt(food.cals);
			$scope.totalProtein += parseInt(food.protein);
			$scope.totalCarbs += parseInt(food.carbs);
			$scope.totalFat += parseInt(food.fat);
		});
	});
});