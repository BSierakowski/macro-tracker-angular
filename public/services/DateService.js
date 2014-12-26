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

    var returnDate;

    if(currentDate.valueOf() > date.valueOf()) {
      date.setDate(date.getDate() + 1);
      returnDate = date;
    } else {
      returnDate = date;
    }

    return returnDate;
  }

  DateService.decrementDay = function(date) {
    date.setDate(date.getDate() - 1);
    return date;
  }

  return DateService;
});

