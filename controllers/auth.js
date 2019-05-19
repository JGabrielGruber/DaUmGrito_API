'use strict'

const	repository	= new (require('../repositories/auth'))(),
		controller	= require('../base/controller');

function auth() {}

auth.prototype.get	= async () => {
	return await repository.getAll();
}

auth.prototype.getById	= async (id) => {
	return await repository.getById(id);
}

auth.prototype.post	= async (data) => {
	return await repository.create(request.data);
}

auth.prototype.put	= async (id, data) => {
	return await repository.update(id, data);
}

auth.prototype.delete	= async (id) => {
	if (id) {
		await repository.delete(id);
	}
}

module.exports	= auth;