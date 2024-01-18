const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const ConstantKeys = require('../constants/KEYS');

const verifyJWT = (req,res,next)=>{
  try {
    const auth  = req.headers['authorization']
    if(!auth.startsWith('Bearer ')){
        throw new ApiError(httpStatus.UNAUTHORIZED,"Not Authorized")
    }
    const token = auth.split('Bearer ')[1]
    // verify user
    const isVerified = jwt.verify(token,ConstantKeys.JWT_KEY)
    req.user = isVerified.userId
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = verifyJWT