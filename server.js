// MODULES =============================================
var logger = require('morgan'),
    express = require('express'),
    app = express();

// CONFIG ==============================================
var port = process.env.PORT || 8000;

app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));

// ROUTES ==============================================
require('./app/routes')(app);

// start up
app.listen(port);
console.log('Starting server on ' + port);

// expose app
module.exports = exports = app;

