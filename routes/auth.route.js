const router = require('express').Router();

const authCtrl = require('../controllers/auth.controller');
const validators = require('../helpers/validators');

router.get('/login', authCtrl.getLogin);
router.post('/login', ...validators.login, authCtrl.postLogin);

router.get('/signup', authCtrl.getSignup);
router.post('/signup', ...validators.signup, authCtrl.postSignup);

router.all('/logout', authCtrl.logout);

module.exports = router;