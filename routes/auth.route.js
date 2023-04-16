const router = require('express').Router();

const authCtrl = require('../controllers/auth.controller');

router.get('/login', authCtrl.getLogin);
router.post('/login', authCtrl.postLogin);

router.get('/signup', authCtrl.getSignup);
router.post('/signup', authCtrl.postSignup);

module.exports = router;