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
				let agente	= await rep_age.getById(response.locals.user, '_id cpf nome contato.email_um funcao empresa.cnpj empresa.nome');
				if (data.responsavel.cpf && (data.responsavel.cpf == agente.cpf)) {
					data["status"]		= "Concluido";
				} else {
					data["responsavel"]	= agente;
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

chamado.prototype.getResolucao		= async (request, response) => {
	try {
		let	id = request.params.id;
		if (id) {
			response.status(200).send(await repository.getResolucao(id));
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

chamado.prototype.postMensagem		= async (request, response) => {
	try {
		let id	= request.params.id;
		if (id) {
			let data	= await repository.getById(id);
			if (data && request.body.conteudo) {
				if (response.locals.level == "agente") {
					if (data.responsavel.cpf == (await rep_age.getById(response.locals.user)).cpf) {
						let mensagem	= {
							autor:		data.responsavel.cpf,
							remetente:	data.cliente.cpf,
							level:		"agente",
							conteudo:	request.body.conteudo,
							timestamp:	new Date()
						}
						data["resolucoes"].push(mensagem);
					}
				} else if (response.locals.level == "cliente") {
					if (data.cliente.cpf == response.locals.user) {
						let mensagem	= {
							autor:		data.cliente.cpf,
							remetente:	data.responsavel.cpf,
							level:		"cliente",
							conteudo:	request.body.conteudo,
							timestamp:	new Date()
						}
						data["resolucoes"].push(mensagem);
					}
				}
				response.status(200).send((await repository.update(id, data)).resolucoes);
				return;
			} else {
				response.status(400).send({
					error: "invalid_request",
					message: "É necessário que tenha uma mensagem e um chamado existente."
				});
				return;
			}
		} else {
			response.status(400).send({
				error: "invalid_request",
				message: "É necessário que tenha o ID do chamado."
			});
			return;
		}
	} catch (error) {
		console.error(error);
		response.status(500).send({
			error: "server_error",
			message: "Estamos com problemas para acessar o servidor, tente novamente mais tarde."
		});
		return;
	}
}

module.exports	= chamado;