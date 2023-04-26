const router = require('express').Router();

const authCtrl = require('../controllers/auth.controller');
const validators = require('../helpers/validators');
const permissions = require('../helpers/permissions');

router.get('/login', permissions.requiresNoAuth, authCtrl.getLogin);
router.post('/login', permissions.requiresNoAuth, ...validators.login, validators.requireValidation, authCtrl.postLogin);

router.get('/signup', permissions.requiresNoAuth, authCtrl.getSignup);
router.post('/signup', permissions.requiresNoAuth, ...validators.signup, validators.requireValidation, authCtrl.postSignup);

router.all('/logout', authCtrl.logout);

module.exports = router;