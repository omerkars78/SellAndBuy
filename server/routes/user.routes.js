const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/users', userController.findAllUsers); // tamam
router.post('/signup', userController.signUp); // tamam
router.post('/signin', userController.signIn); // tamam


module.exports = router;

