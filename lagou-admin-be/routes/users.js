var express = require('express');
var router = express.Router();

const userController = require('../controllers/users')

/* GET users listing. */
router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.get('/issignin', userController.issignIn);
router.get('/signout', userController.signout);

module.exports = router;
