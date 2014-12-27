'use strict';

app.factory('MealService', function() {
  var mealService = {};

  mealService.calculateTotals = function(meal) {
    var totals = {
      totalCals: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0
    };

    meal.forEach(function(food) {
			totals.totalCals += parseInt(food.cals);
			totals.totalProtein += parseInt(food.protein);
			totals.totalCarbs += parseInt(food.carbs);
			totals.totalFat += parseInt(food.fat);
    });

    return totals;
  };

  mealService.increaseServing = function(food) {

  };

  mealService.decreaseServing = function(currentMeal, food) {
		if (food.servings > 1) {
			var prevServings = food.servings;
			food.servings -= 1;
			food.cals = food.cals / prevServings * food.servings;
			food.protein = food.protein / prevServings * food.servings;
			food.carbs = food.carbs / prevServings * food.servings;
			food.fat = food.fat / prevServings * food.servings;
			food.sodium = food.sodium / prevServings * food.servings;
    }

    currentMeal = updateFood(currentMeal, food);
    return currentMeal;
  };

  // lookup food in meal by name
  function updateFood(meal, food) {
    for(var i = 0; i < meal.length; i++) {
      console.log(i);
      var currentFood = meal[i];
      if (currentFood.name === food.name) {
        console.log("found food at", i);
        meal[i] = food;
        break;
      }
    }

    return meal;
  }

  return mealService;
});
