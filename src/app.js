const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
var MemoryStore = require('memorystore')(session)
require('./config')

app.use(session({
	cookie: { maxAge: 86400000 },
	store: new MemoryStore({
		checkPeriod: 86400000 // prune expired entries every 24h
	}),
	secret: 'keyboard cat',
	resave: true,
	saveUninitialized: true
}))

app.use((req, res, next) => {
	if (req.session.usuario) {
		res.locals.sesion = true
		res.locals.nom = req.session.nombre
	}
	next()
})

// Path
const dirPublic = path.join(__dirname, '../public')
const dirViews = path.join(__dirname, '../template/views')
const dirPartials = path.join(__dirname, '../template/partials')

// Static
app.use(express.static(dirPublic))

// BodyParser
app.use(bodyParser.urlencoded({ extended: false }))

// Hbs
app.set('view engine', 'hbs');
app.set('views', dirViews);
hbs.registerPartials(dirPartials)

app.use(require('./routes/index.js'))

// Mongoose
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err, resultado) => {
	if (err) {
		return console.log(error)
	}
	console.log("Conectado a la base de datos")
});

// Conexion
app.listen(process.env.PORT, () => {
	console.log('Servidor iniciado en el puerto ' + process.env.PORT);
});