const debug = require('debug')('app:inicio');
//const dbDebug = require('debug')('app:db');
const express = require('express');
const config = require('config');
//const logger = require('./logger');
const morgan = require('morgan');
const usuarios = require('./routes/usuarios');
// Creamos Instancia de Express
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true})); // Convierte los valores en formato urlencoded a formato JSON.
app.use(express.static('public'));
// Cada vez que utilicen la ruta usuarios se invoca a las funciones del archivo usuarios.
app.use('/api/usuarios', usuarios);

//Configuración de entornos
console.log('Aplicacíón: ' + config.get('nombre'));
console.log('BD server: ' + config.get('configDB.host'));

/*
app.use(logger.log);
app.use(logger.authentication);
*/

// Uso de middleware de tercero - Morgan
if(app.get('env') === 'development'){
	app.use(morgan('tiny'));
	//console.log('Morgan habilitado....');
	debug('Morgan esta habilitado...');
}

// Trabajos con la base de datos
debug('Conectando con la base de datos...');
/*
app.get(); // petición
app.post(); // envio de datos
app.put(); // actualización
app.delete(); // eliminación
*/

app.get('/', (req, res) => {
	res.send('Hola Mundo desde Express'); 
});

// Variable de Entorno
const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Escuchando en el puerto ${port}...`);
});