'use strict';

app.directive('changeFoodTitle', ['$compile', function($compile) {
	return {
		restrict: 'A',
		link: function(scope, elem, attr) {
			elem.on('click', function() {
				if(elem.text() === 'New Food') {
					elem.text('Hide');
				} else {
					elem.text('New Food');
				}
			});
		}
	}
}]);
