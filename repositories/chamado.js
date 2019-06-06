'use strict'

require('../models/chamado');

const	Base	= require('../base/repository')

class Chamado {
	
	constructor() {
		this.base = new Base('Chamado')
		this.projection = '_id cliente titulo descricao localizacao timestamp timeupdate'
	}

	async getAll() {
		return await this.base._model.find({}, this.projection);
	}

	async getById(id) {
		return await this.base._model.findById(id);
	}

	async getByCPF(cpf) {
		return await this.base._model.find({ "cliente.cpf": cpf }, this.projection);
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