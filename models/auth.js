'use strict'

const mongoose	= require('../bin/db/auth');

const Auth	= new mongoose.Schema({
	client_id:	{
		type:		String,
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

module.exports	= mongoose.model('Auth', Auth);