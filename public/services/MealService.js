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
        servings: 1
      });
      calculateTotals(currentMeal);
    },
    increaseServing: function(currentMeal, food) {
      var baseFood;
      FoodService.getFood(food._id).then(
        function(data) {
          baseFood = data;
          food.servings = parseFloat(food.servings) + 1;
          food.calories = baseFood.calories * food.servings;
          food.protein = baseFood.protein * food.servings;
          food.carbs = baseFood.carbs * food.servings;
          food.fat = baseFood.fat * food.servings;
          food.sodium = baseFood.sodium * food.servings;
          food.fiber = baseFood.fiber * food.servings;

          updateFood(currentMeal, food);
          calculateTotals(currentMeal);
        },
        function(error) {
          // fail silently
        });
    },
    decreaseServing: function(currentMeal, food) {
      if (food.servings > 1) {
        var prevServings = food.servings;
        food.servings -= 1;
        food.calories = food.calories / prevServings * food.servings;
        food.protein = food.protein / prevServings * food.servings;
        food.carbs = food.carbs / prevServings * food.servings;
        food.fat = food.fat / prevServings * food.servings;
        food.sodium = food.sodium / prevServings * food.servings;

        updateFood(currentMeal, food);
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
