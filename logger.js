const log = (req, res, next) => {
	console.log('Logging....');
	next();
}

const authentication = (req, res, next) => {
	console.log('Autenticando....');
	next();
}
module.exports = {
	log,
	authentication
}