'use strict';

app.factory('MealService', ['$q', 'FoodService', function($q, FoodService) {
  function constructBaseMacros(food) {
    var servings = parseFloat(food.servings);
    var calories = food.calories / servings;
    var protein = food.protein / servings;
    var carbs = food.carbs / servings;
    var fat = food.fat / servings;
    var sodium = food.sodium / servings;
    var fiber = food.fiber / servings;

    var baseMacros = {
      calories: calories,
      protein: protein,
      carbs: carbs,
      fat: fat,
      sodium: sodium,
      fiber: fiber
    };

    return baseMacros;
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
      var baseMacros = constructBaseMacros(food);
      currentMeal.push({
        _id: food._id,
        name: food.name,
        calories: food.calories,
        protein: food.protein,
        carbs: food.carbs,
        fat: food.fat,
        sodium: food.sodium,
        fiber: food.fiber,
        servings: 1,
        baseMacros: baseMacros
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
      // TODO: food.servings should be validated as a number BEFORE here
      // think about using a directive
      if (isNaN(food.servings)) {
        food.servings = 0;
      } else if (food.servings % 1 !== 0) {
        food.servings = parseFloat(parseFloat(food.servings).toFixed(2));
      }

      var baseMacros = food.baseMacros;
      var servings = food.servings;

      food.calories = servings * baseMacros.calories;
      food.protein = servings * baseMacros.protein;
      food.carbs = servings * baseMacros.carbs;
      food.fat = servings * baseMacros.fat;
      food.sodium = servings * baseMacros.sodium;
      food.fiber = servings * baseMacros.fiber;

      calculateTotals(currentMeal);
    }
  }
}]);
