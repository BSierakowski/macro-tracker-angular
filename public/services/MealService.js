'use strict';

app.factory('MealService', function(foodService) {
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

  mealService.addFoodToMeal = function(currentMeal, food) {
		currentMeal.push({
			name: food.name,
			cals: food.cals,
			protein: food.protein,
			carbs: food.carbs,
			fat: food.fat,
			servings: 1
		});
  };

  mealService.increaseServing = function(currentMeal, food) {
		var baseFood = foodService.getFood(food.name);
		food.servings = parseFloat(food.servings) + 1;
		food.cals = baseFood.cals * food.servings;
		food.protein = baseFood.protein * food.servings;
		food.carbs = baseFood.carbs * food.servings;
		food.fat = baseFood.fat * food.servings;
		food.sodium = baseFood.sodium * food.servings;
		food.fiber = baseFood.fiber * food.servings;

    currentMeal = updateFood(currentMeal, food);
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
  };

  mealService.updateMacros = function(food) {
		var baseFood = foodService.getFood(food.name);
		food.cals = food.servings * baseFood.cals;
		food.protein = food.servings * baseFood.protein;
		food.carbs = food.servings * baseFood.carbs;
		food.fat = food.servings * baseFood.fat;
		food.sodium = food.servings * baseFood.sodium;
		food.fiber = food.servings * baseFood.fiber;
	}


  // lookup food in meal by name
  function updateFood(meal, food) {
    for(var i = 0; i < meal.length; i++) {
      var currentFood = meal[i];
      if (currentFood.name === food.name) {
        meal[i] = food;
        break;
      }
    }

    return meal;
  }

  return mealService;
});
