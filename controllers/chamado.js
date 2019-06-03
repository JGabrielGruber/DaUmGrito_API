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

chamado.prototype.getByCPF	= async (request, response) => {
	try {
		let cpf = request.params.cpf;
		if (cpf) {
			response.status(200).send(await repository.getByCPF(cpf));
			return;
		} else {
			response.status(400).send({
				error: "invalid_request"
			});
			return;
		}
	} catch (error) {
		console.error(error);
		response.status(500).send({
			error: "server_error"
		});
		return;
	}
}

chamado.prototype.post		= async (request, response) => {
	request.body["cliente"]	= await rep_cli.getByCPF(response.locals.user);
	controller.post(repository, request, response);
}

chamado.prototype.put		= async (request, response) => {
	controller.put(repository, request, response);
}

chamado.prototype.delete	= async (request, response) => {
	controller.delete(repository, request, response);
}

module.exports	= chamado;