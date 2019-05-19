const	mongoose	= require('mongoose'),
		variables	= require('../config/variables');

mongoose.connect(variables.database.connection_app, { useCreateIndex: true, useNewUrlParser: true });

module.exports = exports = mongoose;