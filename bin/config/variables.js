const variables	= {
	API: {
		port: process.env.port || 3000
	},
	database: {
		connection_app: process.env.connection || "mongodb+srv://apiapp:T34rM3D0wn@daumgrito-tg93c.mongodb.net/APP",
		connection_auth: "mongodb+srv://apiauth:L1ckMyBu77@daumgrito-tg93c.mongodb.net/Auth"
	},
	security : {
		secretKey: "e52b87831094bda85bc1d0dc115ac863",
		iv: "30499f"
	}
}

module.exports	= variables;