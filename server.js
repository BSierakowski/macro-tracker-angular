// MODULES =============================================
var express = require('express'),
    app = express(),
    env = process.env.NODE_ENV || 'development',
    config = require('./app/config/config.js')[env];

// CONFIG ==============================================
require('./app/config/express')(app, config);

// TODO: DB config
// TODO: PASSPORT config

require('./app/routes')(app);

var port = config.port;
app.listen(port);
console.log('Starting server on ' + port);

