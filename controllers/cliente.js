'use strict'

require('../models/cliente');

const	repository	= new (require('../repositories/cliente'))(),
		controller	= require('../base/controller'),
		auth		= new (require('../lib/authentication'))();

function cliente() {}

cliente.prototype.get = async (request, response) => {
	controller.get(repository, request, response);
}

cliente.prototype.getById = async (request, response) => {
	controller.getById(repository, request, response);
}

cliente.prototype.post = async (request, response) => {
	let data	= request.body;
	
	if (!(await repository.isUnique(data.cpf, data.contato.email_um))) {
		
		request.body.hash = await auth.newAuth(data.cpf, data.hash, "cliente");
		
		controller.post(repository, request, response);
	}
}

cliente.prototype.put = async (request, response) => {
	if (!(await repository.isUnique(request.body.cpf, request.body.contato.email_um))) {
		controller.put(repository, request, response);
	}
}

cliente.prototype.delete = async (request, response) => {
	controller.delete(repository, request, response);
}

module.exports = cliente;
