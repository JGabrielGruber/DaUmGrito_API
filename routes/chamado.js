'use strit'

const	router		= require('express').Router();
const	controller	= new (require('../controllers/chamado'))(),
		auth		= new (require('../lib/authentication'))();

router.get('/', auth.authenticate, controller.get);

router.get('/:id', auth.authenticate, controller.getById);

router.get('/cliente/:cpf', auth.authenticate, controller.getByCPF);

router.get('/responsavel/:cpf', auth.authenticate, controller.getByCPFAgente);

router.get('/empresa/:cnpj', auth.authenticate, controller.getByCNPJ);

router.post('/', 
	(request, response, next) => {
		auth.authenticate(request, response, next, "cliente");
	}, controller.post);

router.put('/:id', 
	(request, response, next) => {
		auth.authenticate(request, response, next, "cliente");
	}, controller.put);

router.delete('/:id',
	(request, response, next) => {
		auth.authenticate(request, response, next, "cliente");
	}, controller.delete);

router.post('/:id/responsavel',
	(request, response, next) => {
		auth.authenticate(request, response, next, "agente");
	}, controller.postResponsavel);

router.put('/:id/responsavel',
	(request, response, next) => {
		auth.authenticate(request, response, next, "empresa");
	}, controller.putResponsavel);

router.put('/:id/status',
	(request, response, next) => {
		auth.authenticate(request, response, next, "agente");
	}, controller.putStatus);

router.get('/:id/resolucoes', auth.authenticate, controller.getResolucoes);

router.post('/:id/mensagem', auth.authenticate, controller.postMensagem);

module.exports	= router;