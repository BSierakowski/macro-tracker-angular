'use strict';

app.factory('MealService', ['$q', 'FoodService', function($q, FoodService) {
  function updateFood(meal, food) {
    for(var i = 0; i < meal.length; i++) {
      var currentFood = meal[i];
      if (currentFood.name === food.name) {
        meal[i] = food;
        break;
      }
    }
  }

  function calculateTotals(meal) {
    meal.totals = {
      totalCals: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
      totalSodium: 0,
      totalFiber: 0
    };

    meal.forEach(function(food) {
      meal.totals.totalCals += parseInt(food.calories);
      meal.totals.totalProtein += parseInt(food.protein);
      meal.totals.totalCarbs += parseInt(food.carbs);
      meal.totals.totalFat += parseInt(food.fat);
      meal.totals.totalSodium += parseInt(food.sodium);
      meal.totals.totalFiber += parseInt(food.fiber);
    });
  }

  return {
    addFoodToMeal: function(currentMeal, food) {
      currentMeal.push({
        _id: food._id,
        name: food.name,
        calories: food.calories,
        protein: food.protein,
        carbs: food.carbs,
        fat: food.fat,
        sodium: food.sodium,
        fiber: food.fiber,
        servings: 1
      });
      calculateTotals(currentMeal);
    },
    increaseServing: function(currentMeal, food) {
      var prevServings = parseFloat(food.servings);
      food.servings = prevServings + 1;
      var servingsRatio = food.servings / prevServings;

      food.calories = food.calories * servingsRatio;
      food.protein = food.protein * servingsRatio;
      food.carbs = food.carbs * servingsRatio;
      food.fat = food.fat * servingsRatio;
      food.sodium = food.sodium * servingsRatio;
      food.fiber = food.fiber * servingsRatio;

      calculateTotals(currentMeal);
    },
    decreaseServing: function(currentMeal, food) {
      if (food.servings > 1) {
        var prevServings = parseFloat(food.servings);
        food.servings -= 1;
        var servingsRatio = food.servings / prevServings;

        food.calories = food.calories * servingsRatio;
        food.protein = food.protein * servingsRatio;
        food.carbs = food.carbs * servingsRatio;
        food.fat = food.fat * servingsRatio;
        food.sodium = food.sodium * servingsRatio;
        food.fiber = food.fiber * servingsRatio;

        calculateTotals(currentMeal);
      }
    },
    updateMacros: function(currentMeal, food) {
      var baseFood;
      FoodService.getFood(food._id).then(
        function(data) {
          baseFood = data;
          if (isNaN(food.servings)) {
            food.servings = 0;
          }

          food.calories = food.servings * baseFood.calories;
          food.protein = food.servings * baseFood.protein;
          food.carbs = food.servings * baseFood.carbs;
          food.fat = food.servings * baseFood.fat;
          food.sodium = food.servings * baseFood.sodium;
          food.fiber = food.servings * baseFood.fiber;

          updateFood(currentMeal, food);
          calculateTotals(currentMeal);
        },
        function(error) {
          // fail silently
        });
    }
  }
}]);
