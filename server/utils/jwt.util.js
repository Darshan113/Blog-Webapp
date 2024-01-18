const jwt = require('jsonwebtoken');
const ConstantKeys = require('../constants/KEYS');


exports.generateToken = async(user) =>{
    const token = await jwt.sign({userId : user._id},ConstantKeys.JWT_KEY,{expiresIn : '1d'})
    return token
}