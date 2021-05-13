process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'local';

let urlDB
if (process.env.NODE_ENV === 'local') {
	urlDB = 'mongodb://localhost:27017/proyectoUno';
} else {
	urlDB = 'mongodb+srv://Miguel:C3dme1Y03uvgs4aI@proyectouno.fv6nw.mongodb.net/proyectouno?retryWrites=true&w=majority'
}

process.env.URLDB = urlDB