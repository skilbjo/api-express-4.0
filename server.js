var
	express 		= require('express'),
	app					= express(),
	bodyParser 	= require('body-parser'),
	mongoose    = require('mongoose'),
	port				= process.env.PORT || 8080,
	Bear        = require('./app/models/bear'),
	router			= express.Router();

app.use(bodyParser());
mongoose.connect('mongodb://localhost/api');

var models = {
    bear       : require('./app/models/bear.js')
};

router.use(function(req, res, next) {
	next();
});

router.get('/', function(req, res) {
	res.json({ message: 'hello api'});
});

router.route('/bears')
	.post(function(req, res) {
		var bear = new Bear();
		bear.name = req.body.name;

		bear.save(function(err){
			if (err) {
				res.send(err);
				return;
			}

			res.json({ message : 'Bear created!'});
		})
	});

app.use('/api', router);

app.listen(port, function(){
	console.log('The magic happens on port ' + port);
});
