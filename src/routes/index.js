const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
require('../helpers/helpers');

const saltRounds = 10;

const Curso = require('./../models/cursos')
const Inscrito = require('./../models/inscrito')

// Path
const dirPublic = path.join(__dirname, '../../public')
const dirViews = path.join(__dirname, '../../template/views')
const dirPartials = path.join(__dirname, '../../template/partials')

// hbs
app.set('view engine', 'hbs');
app.set('views', dirViews);
hbs.registerPartials(dirPartials)

// Paginas
app.get('/', (req, res) => {
	res.render('index', {
		titulo: 'Inicio',

	});
});

app.post('/', (req, res) => {
	res.render('index', {
		titulo: 'Inicio'
	});
});

app.get('/registrarse', (req, res) => {
	res.render('CrearUs', {
		titulo: 'Registrarse'
	});
});

app.post('/registrarse', (req, res) => {
	const salt = bcrypt.genSaltSync(saltRounds);
	let inscrito = new Inscrito({
		documento: parseInt(req.body.documento),
		nombre: req.body.nombre,
		correo: req.body.correo,
		contrasena: bcrypt.hashSync(req.body.contrasena, salt),
		telefono: req.body.telefono,
		nomCurso: []
	})
	inscrito.save((err, resinsc) => {
		if (err) {
			return console.log(err)
		}
		res.render('ingresar', {
			resi: resinsc,
			mensaje: '<div class="alert alert-success alert-dismissible fade show" role="alert">Se ha registrado con exito.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>'
		});
	});
});

app.get('/ingresar', (req, res) => {
	res.render('ingresar', {
		titulo: 'Ingresar'
	});
});

app.post('/ingresar', (req, res) => {
	mensaje = "";
	Inscrito.findOne({ documento: parseInt(req.body.documento) }, (err, resultado) => {
		if (err) {
			return console.log(err)
		}
		if (!resultado) {
			mensaje = '<div class="alert alert-warning alert-dismissible fade show" role="alert">El documento es incorrecto.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>'
		}
		else {
			if (!bcrypt.compareSync(req.body.contrasena, resultado.contrasena)) {
				mensaje = '<div class="alert alert-warning alert-dismissible fade show" role="alert">La contraseña es incorrecto.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>'
			}
			else {
				req.session.usuario = resultado._id
				req.session.nombre = resultado.nombre
				mensaje = `<div class="alert alert-success alert-dismissible fade show" role="alert">Bienvenido <a href="/" class="alert-link">${resultado.nombre}</a>.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>`
			}
		}
		res.render('ingresar', {
			titulo: 'Ingresar',
			mensaje: mensaje,
			sesion: true,
			nombre: req.session.nombre
		});
	});
});

app.get('/crearCurso', (req, res) => {
	console.log(req.session.nombre)
	res.render('crearCurso', {
		titulo: 'Crear curso'
	})
})

app.post('/crearCurso', (req, res) => {
	let curso = new Curso({
		idcurso: req.body.idcurso,
		nombre: req.body.nombre,
		modalidad: req.body.modalidad,
		valor: req.body.valor,
		intencidad: req.body.intencidad,
		descripcion: req.body.descripcion
	})
	curso.save((err, resultado) => {
		if (err) {
			return console.log(err)
		}
		console.log('Ingresado con exito')
		res.render('crearCurso', {
			titulo: 'Crear curso',
			mensaje: "<div class='alert alert-success alert-dismissble fade show' role='alert'>El curso ha sido creado con éxito</div>"
		})
	})
})

app.get('/verCursos', (req, res) => {
	Curso.find({}, (err, resultado) => {
		if (err) {
			return console.log(err)
		}
		res.render('listaCurso', {
			titulo: 'Lista de cursos',
			res: resultado
		})
	})
})

app.get('/intCursos', (req, res) => {

	Curso.find({}, (err, resultado) => {
		if (err) {
			return console.log(err)
		}
		res.render('intCurso', {
			titulo: 'Lista de cursos',
			res: resultado
		})
	})
})

app.post('/verCurso', (req, res) => {
	Curso.find({}, (err, resultado) => {
		if (err) {
			return console.log(err)
		}
		res.render('actualizar', {
			titulo: 'Lista de cursos',
			idcurso: req.body.nCurso,
			res: resultado
		})
	})
})

app.post('/actualizar', (req, res) => {
	Curso.findOne({ idcurso: parseInt(req.body.idcurso) }, (err, rescurso) => {
		estado = 'Cerrado'
		if (rescurso.estado == 'Cerrado') {
			estado = 'Disponible'
		}
		Curso.updateOne({ idcurso: parseInt(req.body.idcurso) }, { estado: estado }, { new: true }, (err, resultado) => {
			if (err) {
				return console.log(err)
			}
			res.redirect('verCursos')
		})
	})
})


app.get('/inscribir', (req, res) => {
	Inscrito.findById(req.session.usuario, (err, usuario) => {
		Curso.find({ estado: 'Disponible' }, (err, rescursos) => {
			if (err) {
				return console.log(err)
			}
			if (!usuario) {
				return res.redirect('/')
			}
			res.render('inscribir', {
				titulo: 'Inscribir',
				resc: rescursos
			});
		})
	});
});

app.post('/inscribir', (req, res) => {
	Inscrito.findOneAndUpdate({ _id: req.session.usuario }, { "$push": { nomCurso: req.body.nomCurso } }, { new: true }, (err, rescurso) => {
		if (err) {
			return console.log(err)
		}
		Curso.find({ estado: 'Disponible' }, (err, rescursos) => {
			console.log('Ingresado con exito ' + rescurso)
			res.render('inscribir', {
				titulo: 'Inscribir',
				resc: rescursos,
				mensaje: "<div class='alert alert-success alert-dismissble fade show' role='alert'>Se ha matriculado con éxito.</div>"
			});
		});
	});
});

app.get('/inscritos', (req, res) => {
	Inscrito.find({}).populate('nomCurso').exec(function (err, resultado) {
		console.log(resultado)
		if (err) {
			return console.log(err)
		}
		res.render('listaInscritos', {
			titulo: 'Lista de inscritos',
			res: resultado
		})
	})
})

app.post('/inscritos', (req, res) => {
	Inscrito.find({}, (err, resultado) => {
		if (err) {
			return console.log(err)
		}
		res.render('eliminar', {
			titulo: 'Lista de inscritos',
			res: resultado
		})
	})
})

app.post('/eliminar', (req, res) => {
	Inscrito.deleteOne({ documento: parseInt(req.body.documento) }, (err, eliminado) => {
		if (err) {
			return console.log(err)
		}
		console.log(eliminado)
		Inscrito.find({}, (err, resultado) => {
			if (err) {
				return console.log(err)
			}
			console.log(resultado)
			res.render('eliminar', {
				titulo: 'Eliminar inscritos',
				res: resultado,
				msdel: "<div class='alert alert-success alert-dismissble fade show' role='alert'>Ha eliminado</div>"
			})
		})
	})
})

app.get('/salir', (req, res) => {
	req.session.destroy((err) => {
		if (err) return console.log(err)
	})
	res.redirect('/')
})

app.get('*', (req, res) => {
	res.render('error', {
		titulo: 'Error'
	});
});

module.exports = app