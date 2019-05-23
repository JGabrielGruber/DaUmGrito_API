'use strict'

const mongoose		= require('mongoose');
const mongoose_auth	= require('../bin/db/app');

const Auth	= new mongoose.Schema({
	client_id:	{
		type:		Number,
		required:	true,
		trim:		true,
		index:		true
	},
	key:		{
		type:		String,
		required:	true
	},
	level:		{
		type:		String,
		required:	true
	}
});

module.exports	= mongoose_auth.model('Auth', Auth);