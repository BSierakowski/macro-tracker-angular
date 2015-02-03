'use strict';

var app = angular.module('macroTracker', ['ngResource', 'ngRoute']);

app.config(function($routeProvider, $locationProvider) {
	// $locationProvider.html5Mode(true);

	$routeProvider.otherwise({ redirectTo: '/home' });

	$routeProvider.when('/home', {
		templateUrl: 'views/partial-home.html'
	});

	$routeProvider.when('/about', {

	});

	$routeProvider.when('/foods', {
		controller: 'FoodsController',
		templateUrl: 'views/partial-foods.html'
	});
});
