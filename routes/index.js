const	router	= (require('express')).Router(),
		auth	= new (require('../lib/authentication'))(),
		ctrl	= new (require('../controllers/cliente'))();

router.post('/oauth/token', auth.getToken);

router.get('/',
	(request, response, next) => {
		auth.authenticate(request, response, next, "basic");
	},
	(request, response) => {
		response.send('asdlkasd');
	}
);

router.get('/clientes', ctrl.get);
router.post('/clientes', ctrl.post)

module.exports = router;
