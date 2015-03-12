'use strict';

app.factory('DateService', function() {
  return {
    getDateNow: function() {
      var date = new Date();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var year = date.getUTCFullYear();

      if (month / 10 < 1) {
        month = "0" + month;
      }
      if (day / 10 < 1) {
        day = "0" + day;
      }

      date = month + "-" + day + "-" + year;
      return date;
    },
    incrementDay: function(date) {
      var currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      if(currentDate.valueOf() > date.valueOf()) {
        date.setDate(date.getDate() + 1);
      }
    },
    decrementDay: function(date) {
      date.setDate(date.getDate() - 1);
    }
  };
});

