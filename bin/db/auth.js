const	mongoose	= require('mongoose'),
		variables	= require('../config/variables');

mongoose.connect(variables.database.connection_auth, { useCreateIndex: true, useNewUrlParser: true });

module.exports = exports = mongoose;