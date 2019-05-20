'use strit'

const	router		= require('express').Router();
const	controller	= new (require('../controllers/cliente'))(),
		auth		= new (require('../lib/authentication'))();

router.get('/', auth.authenticate, controller.get);

router.get('/:id', auth.authenticate, controller.getById);

router.post('/', controller.post);

router.put('/:id', 
	(request, response, next) => {
		auth.authenticate(request, response, next, "cliente");
	}, controller.put);

router.delete('/:id',
	(request, response, next) => {
		auth.authenticate(request, response, next, "cliente");
	}, controller.delete);

module.exports	= router;