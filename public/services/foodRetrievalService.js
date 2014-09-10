'use strict';

// test service for now, will be making ajax calls using the $resource service for real data
app.factory('foodRetrievalService', function($resource) {
	return {
		getFoods : function() {
			return [
			    {name: 'test food 1', cals: 645, protein: 50, carbs: 100, fat: 5},
			    {name: 'test food 2', cals: 169, protein: 20, carbs: 20, fat: 1},
			    {name: 'test food 3', cals: 290, protein: 10, carbs: 40, fat: 10}
			];
		}
	};
});