const router = require('express').Router();

const cartCtrl = require('../controllers/cart.controller');
const validators = require('../helpers/validators');
const permissions = require('../helpers/permissions');

router.get('/', permissions.requiresAuth, cartCtrl.getCart);
router.post('/', permissions.requiresAuth, validators.createCartItem, cartCtrl.postCart);

router.post('/:itemId/update', permissions.requiresAuth, ...validators.updateCartItem, permissions.accessCartItem, cartCtrl.updateCartItem);
router.post('/:itemId/delete', permissions.requiresAuth, ...validators.deleteCartItem, permissions.accessCartItem, cartCtrl.deleteCartItem);

module.exports = router;