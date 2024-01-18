const express = require('express');
const { AuthenticationController } = require('../controllers');
const  validate  = require('../middlewares/validate');
const { createUser, loginUser } = require('../validations/user.validation');
const verifyJWT = require('../middlewares/verifyToken');
const { upload } = require('../utils/uploads');

const router = express.Router()

router
.post('/register',validate(createUser),AuthenticationController.Register)
.post('/login',validate(loginUser),AuthenticationController.Login)
.get('/profile',verifyJWT,AuthenticationController.Profile)

.post('/post',verifyJWT,upload.single('image'),AuthenticationController.Post)
.get('/post',verifyJWT,AuthenticationController.getPost)
.get('/post/:id',verifyJWT,AuthenticationController.getPostById)

module.exports =  router