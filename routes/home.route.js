const router = require('express').Router();

const ctrl = require('../controllers/home.controller');

router.get('/', ctrl.getHome);

module.exports = router;