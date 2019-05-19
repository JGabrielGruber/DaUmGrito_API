const	JWT			= require('jsonwebtoken'),
		variables	= require('../bin/config/variables');

function authentication() {}

authentication.prototype.authenticate	= async (request, response, next, level="basic") => {
	try {
		let token	= request.headers["authorization"];
		if (token) {
			let type	= token.slice(0, token.indexOf(" "));
			token		= token.slice(token.indexOf(" ") + 1);
			
			if (type.includes("Bearer")) {
				try {
					JWT.verify(token, variables.security.secretKey);
					response.locals.user	= JWT.decode(token, variables.security.secretKey)['client_id'];
				} catch (error) {
					response.status(403).send({
						error: "access_denied"
					});
					return;
				}
				if (level == "basic") {
					next();
				} else {

				}
			} else if (type.includes("Facebook")) { // TODO: Implementar validação de token com API do Facebook
				response.status(400).send({
					error: "invalid_scope"
				});
				return;
			} else {
				response.status(400).send({
					error: "invalid_request"
				});
				return;
			}
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

authentication.prototype.getToken	= (request, response) => {
	try {
		let	grant_type	= request.body["grant_type"],
			client_id	= request.body["client_id"];
		if (grant_type) {
			switch (grant_type) {
				case "client_credentials": // TODO: Implementar validação de usuário
					response.status(200).send({
						"access_token": JWT.sign({
							"client_id": client_id
						}, variables.security.secretKey),
						"token_type": "bearer"
					});
					return;
					break;
				default:
					response.status(400).send({
						error: "unsupported_response_type"
					});
					return;
					break;
			}
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

module.exports	= authentication;