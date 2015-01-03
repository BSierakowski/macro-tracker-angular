'use strict';

app.factory('DateService', function() {
  var DateService = {};

	DateService.getDateNow = function() {
		var date = new Date();
		date.setHours(0, 0, 0, 0);

		return date;
	};

  DateService.incrementDay = function(date) {
		var currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0);

    if(currentDate.valueOf() > date.valueOf()) {
      date.setDate(date.getDate() + 1);
    }
  }

  DateService.decrementDay = function(date) {
    date.setDate(date.getDate() - 1);
  }

  return DateService;
});

