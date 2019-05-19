const	router	= (require('express')).Router(),
		auth	= new (require('../lib/authentication'))();

router.post('/oauth/token', auth.getToken);

router.get('/',
	(request, response, next) => {
		auth.authenticate(request, response, next, "basic");
	},
	(request, response) => {
		auth.newAuth("asd", "asd", "asd");
		response.send('asdlkasd');
	}
);

module.exports = router;
