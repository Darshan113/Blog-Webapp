const express = require('express');
const { AuthenticationController } = require('../controllers');

const router = express.Router()

router
.post('/register',AuthenticationController.Register)


module.exports =  router