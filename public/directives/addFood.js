'use strict';

app.directive('addFood', ['$compile', function($compile) {
	return {
		restrict: 'EA',
		templateUrl: 'views/directives/partial-add-food.html'
	};
}]);
