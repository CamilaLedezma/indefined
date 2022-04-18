const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

router.get('/', mainController.index)

router.get('/productsAdmin', mainController.show)

router.get('/tablas',mainController.description)
router.get('/preguntas',mainController.preguntas)


module.exports = router;
