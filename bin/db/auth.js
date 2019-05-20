'use strict'

const	mongoose_auth	= require('mongoose'),
		variables	= require('../config/variables');

mongoose_auth.connect(variables.database.connection_auth, { useCreateIndex: true, useNewUrlParser: true });

module.exports = exports = mongoose_auth;