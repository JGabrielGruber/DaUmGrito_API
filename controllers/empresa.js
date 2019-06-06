'use strict'

require('../models/empresa');

const	repository	= new (require('../repositories/empresa'))(),
		controller	= require('../base/controller'),
		auth		= new (require('../lib/authentication'))();

function empresa() {}

empresa.prototype.get = async (request, response) => {
	controller.get(repository, request, response);
}

empresa.prototype.getById = async (request, response) => {
	controller.getById(repository, request, response);
}

empresa.prototype.post = async (request, response) => {
	let data	= request.body;

	if (!(await repository.isUnique(data.cnpj, data.contato.email_um))) {
		
		request.body.hash = await auth.newAuth(data.cnpj, data.hash, "empresa");
		
		controller.post(repository, request, response);
	} else {
		response.status(409).send({
			error: "client_already_exist"
		});
		return;
	}
}

empresa.prototype.put = async (request, response) => {
	if (!(await repository.isUnique(request.body.cnpj, request.body.contato.email_um))) {
		controller.put(repository, request, response);
	}
}

empresa.prototype.delete = async (request, response) => {
	controller.delete(repository, request, response);
}

module.exports = empresa;
