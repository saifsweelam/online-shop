const router = require('express').Router();

const homeCtrl = require('../controllers/home.controller');

router.get('/', homeCtrl.getHome);

module.exports = router;