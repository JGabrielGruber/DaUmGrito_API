'use strict'

require('../models/chamado');

const	Base	= require('../base/repository')

class Chamado {
	
	constructor() {
		this.base = new Base('Chamado')
		this.projection = '_id cliente responsavel titulo descricao status localizacao timestamp timeupdate'
	}

	async getAll() {
		return await this.base._model.find({}, this.projection);
	}

	async getById(id) {
		return await this.base._model.findById(id, "_id cliente responsavel titulo descricao status foto localizacao timestamp timeupdate");
	}

	async getByCPF(cpf) {
		return await this.base._model.find({ "cliente.cpf": cpf }, this.projection);
	}

	async getByCNPJ(cnpj) {
		return await this.base._model.find({ "responsavel.empresa.cnpj": cnpj }, this.projection);
	}

	async getByCPFAgente(cpf) {
		return await this.base._model.find({ "responsavel.cpf": cpf }, this.projection);
	}

	async getResolucoes(id) {
		return await this.base._model.findById(id, "resolucoes");
	}

	async create(data) {
		return await this.base.create(data);
	}

	async update(id, data) {
		return await this.base.update(id,data);
	}

	async delete(id) {
		return await this.base.delete(id);
	}
}

module.exports = Chamado;