'use strict'

const mongoose = require('../bin/db/app');

class Repository {
	
	constructor(model) {
		this._model = mongoose.model(model);
	}

	async getAll() {
		return await this._model.find();
	}

	async getById(id) {
		return await this._model.findById(id);
	}

	async create(data) {
		return await (new this._model(data)).save();
	}

	async update(id, data) {
		await this._model.findByIdAndUpdate(id, { $set : data });
		return await this._model.findById(id);
	}

	async delete(id) {
		return await this._model.findByIdAndRemove(id);
	}
}

module.exports = Repository;