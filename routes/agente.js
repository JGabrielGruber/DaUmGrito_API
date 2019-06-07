'use strit'

const	router		= require('express').Router();
const	controller	= new (require('../controllers/agente'))(),
		auth		= new (require('../lib/authentication'))();

router.get('/', auth.authenticate, controller.get);

router.get('/:id', auth.authenticate, controller.getById);

router.get('/cpf/:cpf', controller.getByCPF);

router.post('/', 
	(request, response, next) => {
		auth.authenticate(request, response, next, "empresa");
	}, controller.post);

router.put('/:id', 
	(request, response, next) => {
		auth.authenticate(request, response, next, "agente");
	}, controller.put);

router.delete('/:id',
	(request, response, next) => {
		auth.authenticate(request, response, next, "agente");
	}, controller.delete);

module.exports	= router;