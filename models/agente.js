'use strict'

const mongoose		= require('mongoose');
const mongoose_app	= require('../bin/db/app');

const Agente	= new mongoose.Schema({
	cpf:		{
		type:		Number,
		required:	true,
		trim:		true,
		index:		true
	},
	nome:		{
		type:		String,
		required:	true
	},
	hash:		{
		type:		String,
		required:	true
	},
	contato:	{
		telefone_um:	{
			type:		String,
			required:	true
		},
		email_um:		{
			type:		String,
			required:	true
		}
	},
	foto: {
		type: String
	},
	funcao: {
		type:		String,
		required:	true
	},
	empresa: {
		cnpj:		{
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
	notificacoes:	{
		type:		Array ,
		default:	[]
	},
	timestamp:	{
		type:		Date,
		default:	Date.now
	},
	timeupdate:	{
		type:		Date,
		default:	Date.now
	}
},  { versionKey: false });

Agente.pre('save', next => {
	if (!this.timestamp)
		this.timestamp = new Date();
	this.timeupdate = new Date();
	next();
});

module.exports	= mongoose_app.model('Agente', Agente);