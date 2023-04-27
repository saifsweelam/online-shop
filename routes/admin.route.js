const router = require('express').Router();
const multer = require('multer');

const config = require('../config');

const adminCtrl = require('../controllers/admin.controller');
const validators = require('../helpers/validators');
const permissions = require('../helpers/permissions');

router.get('/add', permissions.requiresAdmin, adminCtrl.getAddProduct);
router.post('/add', permissions.requiresAdmin, multer({storage: config.upload.storage}).single('image'), ...validators.addProduct, adminCtrl.postAddProduct);

module.exports = router;