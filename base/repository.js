'use strict'

const mongoose_app = require('../bin/db/app');

class Repository {
	
	constructor(model) {
		this._model = mongoose_app.model(model);
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

	async preCreate(data) {
		return await new this._model(data);
	}

	async confirm(object) {
		return await object.save();
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