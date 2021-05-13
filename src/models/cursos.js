const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const cursoSchema = new Schema({
	idcurso: {
		type: Number,
		required: true,
		unique: true
	},
	nombre: {
		type: String,
		required: true,
		trim: true
	},
	modalidad:{
		type: String,
	},
	valor:{
		type: String,
		required: true,
		trim: true
	},
	intencidad:{
		type: String,
	},
	descripcion:{
		type: String,
		required: true,
		trim: true
	},
	estado: {
		type: String,
		default: 'Disponible'
	}
});

const Curso = mongoose.model('Curso', cursoSchema);

module.exports = Curso