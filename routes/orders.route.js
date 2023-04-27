const router = require('express').Router();

const ordersCtrl = require('../controllers/orders.controller');
const validators = require('../helpers/validators');
const permissions = require('../helpers/permissions');

router.use(permissions.requiresAuth);

router.get('/', ordersCtrl.getOrders);
router.post('/', ...validators.submitOrder, validators.requireValidation, ordersCtrl.postOrder);

router.post('/all', ...validators.submitOrders, validators.requireValidation, ordersCtrl.postOrderAll);

router.post('/:orderId/cancel', ...validators.deleteOrder, validators.requireValidation, permissions.accessOrder, ordersCtrl.postCancel);

module.exports = router;