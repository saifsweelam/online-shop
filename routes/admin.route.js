const router = require('express').Router();
const multer = require('multer');

const config = require('../config');

const adminCtrl = require('../controllers/admin.controller');
const validators = require('../helpers/validators');
const permissions = require('../helpers/permissions');

router.use(permissions.requiresAuth, permissions.requiresAdmin);

router.get('/add', adminCtrl.getAddProduct);
router.post('/add', multer({storage: config.upload.storage}).single('image'), ...validators.addProduct, adminCtrl.postAddProduct);

router.get('/orders', adminCtrl.getManageOrders);
router.post('/orders/:orderId/update', ...validators.updateOrder, validators.requireValidation, permissions.accessOrder, adminCtrl.postUpdateOrder);

module.exports = router;