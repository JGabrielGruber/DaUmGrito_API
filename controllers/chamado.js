'use strict'

require('../models/chamado');

const	repository	= new (require('../repositories/chamado'))(),
		controller	= require('../base/controller'),
		rep_cli		= new (require('../repositories/cliente'))();

function chamado() {}

chamado.prototype.get		= async (request, response) => {
	controller.get(repository, request, response);
}

chamado.prototype.getById	= async (request, response) => {
	controller.getById(repository, request, response);
}

chamado.prototype.post		= async (request, response) => {
	request.body["cliente"]	= await rep_cli.getByCPF(response.locals.user);
	console.log(request.body);
	
	controller.post(repository, request, response);
}

chamado.prototype.put		= async (request, response) => {
	controller.put(repository, request, response);
}

chamado.prototype.delete	= async (request, response) => {
	controller.delete(repository, request, response);
}

module.exports	= chamado;