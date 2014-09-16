'use strict';

app.directive('addFood', function($compile) {
	return {
		restrict: 'EA'
		,templateUrl: '/public/views/directives/partial-add-food.html'
	};
});