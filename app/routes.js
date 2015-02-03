var bodyParser = require('body-parser');

module.exports = function(app) {
	// SERVER ROUTES =======================================

	// default route
	app.get('*', function(req, res) {
		res.send('index.html');
	});
}
