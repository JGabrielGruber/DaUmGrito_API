'use strict'

require('../models/chamado');

const	repository	= new (require('../repositories/chamado'))(),
		controller	= require('../base/controller'),
		rep_cli		= new (require('../repositories/cliente'))(),
		rep_age		= new (require('../repositories/agente'))();

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

chamado.prototype.getByCPFAgente	= async (request, response) => {
	try {
		let cpf = request.params.cpf;
		if (cpf) {
			response.status(200).send(await repository.getByCPFAgente(cpf));
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

chamado.prototype.getByCNPJ	= async (request, response) => {
	try {
		let cnpj = request.params.cnpj;
		if (cnpj) {
			response.status(200).send(await repository.getByCNPJ(cnpj));
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

chamado.prototype.postResponsavel	= async (request, response) => {
	try {
		let id	= request.params.id;
		if (id) {
			let data	= await repository.getById(id);
			if (data) {
				if (data.responsavel.cpf && (data.responsavel._id == response.locals.user)) {
					data["status"]		= "Concluido";
				} else {
					data["responsavel"]	= await rep_age.getById(response.locals.user);
					data["status"]		= "Sob Atendimento";
				}
				response.status(200).send(await repository.update(id, data));
				return;
			} else {
				response.status(400).send({
					error: "invalid_request"
				});
				return;
			}
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

chamado.prototype.putResponsavel	= async (request, response) => {
	try {
		let id = request.params.id;
		if (id) {
			let data	= await repository.getById(id);
			if (data) {
				data['responsavel']	= await rep_age.getById(request.body._id);
				response.status(200).send(await repository.update(id, data));
				return;
			} else {
				response.status(404).send({
					error: "not_found"
				});
				return;
			}
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

chamado.prototype.putStatus			= async (request, response) => {
	try {
		let	id = request.params.id;
		if (id) {
			let data	= await repository.getById(id);
			if (data) {
				data['status']	= request.body.status;
				response.status(200).send(await repository.update(id, data));
				return;
			} else {
				response.status(404).send({
					error: "not_found"
				});
				return;
			}
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


module.exports	= chamado;