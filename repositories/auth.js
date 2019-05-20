'use strict'

require('../models/auth');

const mongoose_auth = require('../bin/db/auth');

class Auth {
	
	constructor() {
		this._model = mongoose_auth.model('Auth');
	}

	async getAll() {
		return await this._model.find();
	}

	async getById(id) {
		return await this._model.findById(id);
	}

	async getByCID(cid) {
		return await this._model.findOne({ client_id: cid });
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