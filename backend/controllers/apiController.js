const self = {};
var apiService = require('../services/apiService');
const axios = require("axios")

self.getItems = (req, res, next) => {
  apiService.getItems(req.query.q)
    .then(data => res.json(data))
    .catch(error => res.status(404).send('No se encontraron resultados'));
}

self.getItem = (req, res, next) => {
  apiService.getItem(req.params.id)
    .then(data => res.json(data))
    .catch(error => res.status(404).send('No se encontraron resultados'));
}
module.exports = self;