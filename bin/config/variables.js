const variables	= {
	API: {
		port: process.env.port || 3000
	},
	database: {
		connection: process.env.connection || ""
	},
	security : {
		secretKey: "e52b87831094bda85bc1d0dc115ac863"
	}
}

module.exports	= variables;