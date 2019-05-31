'use strict'

const mongoose		= require('mongoose');
const mongoose_app	= require('../bin/db/app');

const Chamado	= new mongoose.Schema({
	cliente:		{
		cpf:		{
			type:		Number,
			index:		true,
			required:	true
		},
		nome:		{
			type:		String
		},
		contato:	{
			email_um:		{
				type:		String
			}
		}
	},
	responsavel:	{
		default:	""
	},
	titulo:			{
		type:		String,
		required:	true
	},
	descricao:		{
		type:		String,
		required:	true
	},
	localizacao:	{
		latitude:	{
			type:		Number,
			required:	true
		},
		longitude:	{
			type:		Number,
			required:	true
		}	
	},
	foto:			{
		type:		String
	},
	resolucoes:		[],
	status:		{
		type:	String,
		default: "Novo"
	},
	timestamp:	{
		type: Date,
		default: Date.now
	},
	timeupdate:	{
		type: Date,
		default: Date.now
	}
},  { versionKey: false });

Chamado.pre('save', next => {
	if (!this.timestamp)
		this.timestamp = new Date()
	this.timeupdate = new Date()
	next()
});

module.exports	= mongoose_app.model('Chamado', Chamado);