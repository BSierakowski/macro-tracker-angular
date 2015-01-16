'use strict';

app.directive('addFood', ['$compile', function($compile) {
	return {
		restrict: 'EA'
		,templateUrl: '/public/views/directives/partial-add-food.html'
	};
}]);
