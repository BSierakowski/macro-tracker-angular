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

  return mealService;
});
