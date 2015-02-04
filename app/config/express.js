var express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');

module.exports = function(app, config) {
	// send pretty html
	if(app.get('env') === 'development') {
  		app.locals.pretty = true;
	}
	app.set('views', config.rootPath + '/app/views');	// set views property to views path
	app.use(logger('dev'));				// express logging
	app.use(cookieParser());			// cookies required for sessions
	app.use(bodyParser.json());				// other express MW
	app.use(session({
    secret: 'macro secret',
    resave: false,
    saveUninitialized: false
  }));
	app.use(passport.initialize());
	app.use(passport.session());

	// express static MW to setup static routing to public dir
	// tells express to serve file for any incoming requests which match to that file in the public dir
	app.use(express.static(config.rootPath + '/public'));
}

