'use strict';

app.factory('DateService', function() {
  var DateService = {};

	DateService.getCurrentDate = function() {
		var date = new Date();
		date.setHours(0, 0, 0, 0);

		return date;
	};

  DateService.incrementDay = function(date) {
		var currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0);
    if(currentDate.valueOf() > date.valueOf()) {
      return date.getDate() + 1;
    } else {
      return date.getDate();
    }
  }

  return DateService;
});

