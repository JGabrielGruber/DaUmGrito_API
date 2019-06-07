'use strict'

require('../models/agente');

const	repository	= new (require('../repositories/agente'))(),
		controller	= require('../base/controller'),
		auth		= new (require('../lib/authentication'))(),
		rep_emp		= new (require('../repositories/empresa'))();

function agente() {}

agente.prototype.get = async (request, response) => {
	controller.get(repository, request, response);
}

agente.prototype.getById = async (request, response) => {
	controller.getById(repository, request, response);
}

agente.prototype.getByCPF = async (request, response) => {
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

agente.prototype.post = async (request, response) => {
	let data	= request.body;

	if (!(await repository.isUnique(data.cpf, data.contato.email_um))) {
		let password			= request.body.hash;
		request.body.hash		= "";
		try {
			request.body["empresa"]	= await rep_emp.getByCNPJ(response.locals.user);
			let object	= await repository.preCreate(request.body);
			object.hash	= await auth.newAuth(object._id, password, "agente");
			response.status(201).send(await repository.confirm(object));
			return;
		} catch (error) {
			console.error(error);
			response.status(500).send({
				error: "server_error"
			});
			return;
		}
	} else {
		response.status(409).send({
			error: "client_already_exist"
		});
		return;
	}
}

agente.prototype.put = async (request, response) => {
	if (!(await repository.isUnique(request.body.cpf, request.body.contato.email_um))) {
		controller.put(repository, request, response);
	}
}

agente.prototype.delete = async (request, response) => {
	controller.delete(repository, request, response);
}

module.exports = agente;
