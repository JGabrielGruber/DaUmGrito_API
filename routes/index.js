const	router	= (require('express')).Router(),
		auth	= new (require('../middleware/authentication'))();

router.post('/oauth/token', auth.getToken);

router.get('/',
	(request, response, next) => {
		auth.authenticate(request, response, next, "basic");
	},
	(request, response) => {
		response.send('asdlkasd');
	}
);

module.exports = router;
