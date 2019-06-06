'use strict'

require('../models/empresa');

const	Base	= require('../base/repository')

class Empresa {
	
	constructor() {
		this.base = new Base('Empresa')
		this.projection = '_id cnpj nome descricao contato.email_um'
	}

	async isUnique(cnpj=0, email_um="") {
		let isCnpj	= await this.base._model.findOne({
			cnpj: cnpj
		});

		let isEmail	= await this.base._model.findOne({
			"contato.email_um": email_um
		});
		if (isCnpj)
			return isCnpj;
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

	async getByCNPJ(cnpj) {
		return await this.base._model.findOne({ cnpj: cnpj });
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

module.exports = Empresa;