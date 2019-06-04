const	express			= require('express'),
		path			= require('path'),
		cookieParser	= require('cookie-parser'),
		logger			= require('morgan'),
		cors			= require('cors');

const	indexRouter		= require('./routes/index'),
		clienteRouter	= require('./routes/cliente'),
		chamadoRouter	= require('./routes/chamado');

const	app	= express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({credentials: true, origin: ['http://localhost', 'http://localhost:8100']}));

app.use('/', indexRouter);
app.use('/api/clientes', clienteRouter);
app.use('/api/chamados', chamadoRouter);

module.exports = app;
