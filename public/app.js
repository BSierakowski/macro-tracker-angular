'use strict';

var app = angular.module('macroTracker', ['ngResource', 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'public/views/partial-home.html'
		})
		.state('about', {
			url: '/about'
		})
		.state('foods', {
			url: '/foods',
			templateUrl: 'public/views/partial-foods.html'
		})
		.state('blank', {
			url: '/',
			templateUrl: 'public/views/partial-blank.html'
		})
});