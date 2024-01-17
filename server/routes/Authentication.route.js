const express = require('express');
const { AuthenticationController } = require('../controllers');
const  validate  = require('../middlewares/validate');
const { createUser } = require('../validations/user.validation');

const router = express.Router()

router.post('/register',validate(createUser),AuthenticationController.Register)


module.exports =  router