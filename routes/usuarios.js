const express = require('express');
const Joi = require('@hapi/joi');
const ruta = express.Router();

const usuarios = [
	{id: 1, nombre: 'Luciano'},
	{id: 2, nombre: 'Pablo'},
	{id: 3, nombre: 'Ana'}
];

ruta.get('/', (req, res) =>{
	res.send(usuarios);
});

ruta.get('/:id', (req, res) =>{
	let usuario = existeUsuario(req.params.id);
	if(!usuario){
		res.status(404).send('El usuario no fue encontrado');
		return;	
	} 
	res.send(usuario);
});

// POST, enviar (guardar) datos. Utilizamos Postman para enviar los datos
ruta.post('/', (req, res) =>{
	const {error, value} = validarUsuario(req.body.nombre);
	if(!error){
		const usuario = {
		id: usuarios.length + 1,
		nombre: value.nombre
		};
		usuarios.push(usuario); // Mandamos los datos al arreglo usuarios.
		res.send(usuario);
	}else{
		// Capturamos el mensaje de error y lo enviamos
		const mensaje = error.details[0].message;
		res.status(400).send(mensaje);
	}
});

ruta.put('/:id', (req, res) =>{
	// Encontrar si existe el objeto usuario que vamos a modificar
	let usuario = existeUsuario(req.params.id);
	if(!usuario){
		res.status(404).send('El usuario no fue encontrado');
		return;	
	} 

	const {error, value} = validarUsuario(req.body.nombre);
	if(error){
		const mensaje = error.details[0].message;
		res.status(400).send(mensaje);
		return;
	}

	usuario.nombre = value.nombre;
	res.send(usuario);
});

ruta.delete('/:id', (req, res) =>{
	let usuario = existeUsuario(req.params.id);
	if(!usuario){
		res.status(400).send('El usuario no fue encontrado');
		return;
	}
	// Obtenemos el indice del elemento a eliminar
	const index = usuarios.indexOf(usuario);
	// Utilizamos el metodo splice para eliminar apartir de ese indice.
	usuarios.splice(index, 1);

	res.send(`Se ha eliminado el usuario: ${usuario.nombre}`);
});

let existeUsuario = (id) =>{
	return (usuarios.find(u => u.id === parseInt(id)));
}

let validarUsuario = (name) =>{
	// Validación de las peticiones con el modulo Joi
	const schema = Joi.object({
		nombre: Joi.string()
		.min(3)
		.required()
	});
	return (schema.validate({nombre: name}))
}

module.exports = ruta;