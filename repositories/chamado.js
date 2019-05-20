'use strict'

require('../models/chamado');

const	Base	= require('../base/repository')

class Chamado {
	
	constructor() {
		this.base = new Base('Chamado')
	}

	async getAll() {
		return await this.base._model.find({});
	}

	async getById(id) {
		return await this.base._model.findById(id);
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