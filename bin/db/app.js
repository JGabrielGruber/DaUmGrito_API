'use strict'

const	mongoose_app	= require('mongoose'),
		variables		= require('../config/variables');

mongoose_app.connect(variables.database.connection_app, { useCreateIndex: true, useNewUrlParser: true });

module.exports = exports = mongoose_app;