const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const inscritoSchema = new Schema({
	documento: {
		type: Number,
		required: true,
		unique: true,
		trim: true
	},
	nombre: {
		type: String,
		required: true,
		trim: true
	},
	correo: {
		type: String,
		required: true,
		trim: true
	},
	contrasena: {
		type: String,
		required: true
	},
	telefono: {
		type: String,
		required: true,
		trim: true
	},
	nomCurso: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Curso'
		}
	]
});

const Inscrito = mongoose.model('Inscrito', inscritoSchema);

module.exports = Inscrito