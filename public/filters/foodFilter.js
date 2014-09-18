'use strict';

app.filter('foodFilter', function() {
	return function (foods, filterInput) {
		if(!filterInput) {
			return foods;
		} 

		var matches = [];
		filterInput = filterInput.toLowerCase();
		foods.forEach(function(food) {
			if(food.name.toLowerCase().indexOf(filterInput) > -1) {
				matches.push(food);
			}
		});

		return matches;
	}
});