const self = {};
var apiService = require('../services/apiService');

self.getItems = (req, res, next) => {
  apiService.getItems(req.query.q)
    .then(data => res.json(data))
    .catch(error => error == 'notFound' ? res.status(404).send('No se encontraron resultados') : res.status(500).send('La búsqueda no se pudo procesar'))
}

self.getItem = (req, res, next) => {
  apiService.getItem(req.params.id)
    .then(data => res.json(data))
    .catch(error => error.response.status == 404 ? res.status(404).send('No se encontraron resultados') : res.status(500).send('La búsqueda no se pudo procesar'))
}

module.exports = self;