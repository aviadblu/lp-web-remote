// set up ======================================================================
var express  = require('express');
var config   = require('./config');
var app      = express();
var port  	 = process.env.PORT || 9000;


var morgan = require('morgan'); 		// log requests to the console (express4)
var bodyParser = require('body-parser'); 	// pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

app.use(express.static(__dirname + '/public')); 				// set static path
app.use(morgan('dev')); 										// log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());



var server = require('http').createServer(app);
config.app = app;



var io = require('socket.io')(server);
app.io = io;

// routes
require('./app/routes/')(app);

if (!module.parent) {
    server.listen(port, function () {
        console.log('Express server listening on %d', port);
    });
} else {
    module.exports = app;
}

// Expose app
var exports = module.exports = app;

