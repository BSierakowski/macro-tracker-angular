'use strict';

app.directive('foodItem', function ($rootScope, $compile) {
	return {
// 		link: function(scope, element, attrs, controller) {
// 			var markup = "<td class='text-center'>{{food.name}}</td><td class='text-center'>{{food.cals}}</td><td class='text-center'>{{food.protein}}
// </td><td class='text-center'>{{food.carbs}}</td><td class='text-center'>{{food.fat}}</td>";
// 			angular.element(element).html($compile(markup)(scope));
// 		},
		restrict: 'EA'
		,scope: {
			food: '=foodItem'
		}
		,templateUrl: '/public/views/directives/partial-food.html'
	};
});