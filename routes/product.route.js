const router = require('express').Router();

const productCtrl = require('../controllers/product.controller');

router.get('/:id', productCtrl.getProductDetails);

module.exports = router;