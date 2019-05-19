require('../models/auth');

const mongoose = require('../bin/db/app');

class Auth {
	
	constructor() {
		this._model = mongoose.model('Auth');
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
		return await this._model.findByIdAndUpdate(id, { $set : data });
	}

	async delete(id) {
		return await this._model.findByIdAndRemove(id);
	}
}

module.exports = Auth;