const router = require('express').Router();

const cartCtrl = require('../controllers/cart.controller');
const validators = require('../helpers/validators');
const permissions = require('../helpers/permissions');

router.get('/', permissions.requiresAuth, cartCtrl.getCart);
router.post('/', permissions.requiresAuth, ...validators.createCartItem, validators.requireValidation, cartCtrl.postCart);

router.post('/:itemId/update', permissions.requiresAuth, ...validators.updateCartItem, validators.requireValidation, permissions.accessCartItem, cartCtrl.updateCartItem);
router.post('/:itemId/delete', permissions.requiresAuth, ...validators.deleteCartItem, validators.requireValidation, permissions.accessCartItem, cartCtrl.deleteCartItem);

module.exports = router;