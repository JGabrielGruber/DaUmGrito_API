
exports.get	= async(repository, request, response) => {
	try {
		response.status(200).send(await repository.getAll());
	} catch (error) {
		console.error(error);
		response.status(500).send({
			error: "server_error"
		});
		return;
	}
}

exports.getById	= async(repository, request, response) => {
	try {
		let id = request.params.id;
		if (id) {
			response.status(200).send(await repository.getById(id));
			return;
		} else {
			response.status(400).send({
				error: "invalid_request"
			});
			return;
		}
	} catch (error) {
		console.error(error);
		response.status(500).send({
			error: "server_error"
		});
		return;
	}
}

exports.post	= async(repository, request, response) => {
	try {
		response.status(201).send(await repository.create(request.body));
		return;
	} catch (error) {
		console.error(error);
		response.status(500).send({
			error: "server_error"
		});
		return;
	}
}

exports.put	= async(repository, request, response) => {
	try {
		response.status(201).send(await repository.update(request.params.id, request.body));
		return;
	} catch (error) {
		console.error(error);
		response.status(500).send({
			error: "server_error"
		});
		return;
	}

}

exports.delete	= async(repository, request, response) => {
	try {
		let id = request.params.id;
		if (id) {
			await repository.delete(id);
			response.status(200);
			return;
		} else {
			response.status(400).send({
				error: "invalid_request"
			});
			return;
		}
	} catch (error) {
		console.error(error);
		response.status(500).send({
			error: "server_error"
		});
		return;
	}
}
