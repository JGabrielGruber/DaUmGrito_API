const	router	= (require('express')).Router(),
		auth	= new (require('../middleware/authentication'))();

router.post('/oauth/token', auth.getToken);
router.get('/', auth.authenticate, (req, res) => {
	res.send('asdlkasd');
})

module.exports = router;
