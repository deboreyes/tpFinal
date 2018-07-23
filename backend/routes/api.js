var express = require('express');
var router = express.Router();
var apiController = require('../controllers/apiController');

router.get('/items', apiController.getItems);

router.get('/items/:id', apiController.getItem)

module.exports = router;