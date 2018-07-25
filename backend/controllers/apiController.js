const self = {};
var apiService = require('../services/apiService');
const axios = require("axios")

self.getItems = (req, res, next) => {
  apiService.getItems(req.query.q)
    .then(data => {
      if (data.items.length) res.json(data)
      else res.status(404).send('No se encontraron resultados para la búsqueda');
    })
}

self.getItem = (req, res, next) => {
  apiService.getItem(req.params.id)
    .then(data => {
      if (data) res.json(data);
      else res.status(404).send('No se encontraron resultados para la búsqueda');
    })
}
module.exports = self;