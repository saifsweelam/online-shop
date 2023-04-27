const router = require('express').Router();

const cartCtrl = require('../controllers/cart.controller');
const validators = require('../helpers/validators');
const permissions = require('../helpers/permissions');

router.use(permissions.requiresAuth);

router.get('/', cartCtrl.getCart);
router.post('/', ...validators.createCartItem, validators.requireValidation, cartCtrl.postCart);

router.post('/:itemId/update', ...validators.updateCartItem, validators.requireValidation, permissions.accessCartItem, cartCtrl.updateCartItem);
router.post('/:itemId/delete', ...validators.deleteCartItem, validators.requireValidation, permissions.accessCartItem, cartCtrl.deleteCartItem);

module.exports = router;