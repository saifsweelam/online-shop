const router = require('express').Router();

const ordersCtrl = require('../controllers/orders.controller');
const validators = require('../helpers/validators');
const permissions = require('../helpers/permissions');

router.get('/', permissions.requiresAuth, ordersCtrl.getOrders);
router.post('/', permissions.requiresAuth, ...validators.submitOrder, ordersCtrl.postOrder);

router.post('/all', permissions.requiresAuth, ...validators.submitOrders, ordersCtrl.postOrderAll);

router.post('/:orderId/cancel', permissions.requiresAuth, ...validators.deleteOrder, permissions.accessOrder, ordersCtrl.postCancel);

module.exports = router;