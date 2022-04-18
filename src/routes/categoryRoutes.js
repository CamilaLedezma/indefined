const express = require('express');
const router = express.Router();

const catController = require('../controllers/categoryController');

router.get('/:category',catController.category)




module.exports = router;