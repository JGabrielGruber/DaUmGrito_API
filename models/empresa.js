'use strict'

const mongoose		= require('mongoose');
const mongoose_app	= require('../bin/db/app');

const Empresa	= new mongoose.Schema({
	cnpj:		{
		type:		Number,
		required:	true,
		trim:		true,
		index:		true
	},
	nome:		{
		type:		String,
		required:	true
	},
	descricao:	{
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
	endereco:	{
		estado:	{
			type:	String,
			required:	true
		},
		cidade:	{
			type:	String,
			required:	true
		},
		CEP:	{
			type:	Number
		},
		bairro:	{
			type:	String,
			required:	true
		},
		rua:	{
			type:	String,
			required:	true
		},
		numero:	{
			type:	Number
		}
	},
	foto: {
		type: String
	},
	notificacoes:	{
		type: Array ,
		default: []
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

Empresa.pre('save', next => {
	if (!this.timestamp)
		this.timestamp = new Date()
	this.timeupdate = new Date()
	next()
});

module.exports	= mongoose_app.model('Empresa', Empresa);