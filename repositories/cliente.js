'use strict'

require('../models/cliente');

const	Base	= require('../base/repository')

class Cliente {
	
	constructor() {
		this.base = new Base('Cliente')
		this.projection = '_id cpf nome contato.email_um'
	}

	async isUnique(cpf=0, email_um="") {
		let isCpf	= await this.base._model.findOne({
			cpf: cpf
		});

		let isEmail	= await this.base._model.findOne({
			"contato.email_um": email_um
		});
		if (isCpf)
			return isCpf;
		if (isEmail)
			return isEmail;
		return;
	}

	async getAll() {
		return await this.base._model.find({}, this.projection);
	}

	async getById(id) {
		return await this.base._model.findById(id);
	}

	async getByCPF(cpf, projection=false) {
		return (projection ? await this.base._model.findOne({ cpf: cpf }, this.projection) : await this.base._model.findOne({ cpf: cpf }));
	}

	async create(data) {
		return await this.base._model.findById(
			await this.base.create(data)._id
		);
	}

	async update(id, data) {
		return await this.base._model.findById((await this.base.update(id,data))._id);
	}

	async delete(id) {
		return await this.base.delete(id);
	}
}

module.exports = Cliente;