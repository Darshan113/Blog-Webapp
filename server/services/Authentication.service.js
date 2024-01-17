const httpStatus = require("http-status")
const { UserModel } = require("../models")
const ApiError = require("../utils/ApiError")


const register = async(body) => {
      
    // check if user is exist or not
    const isUser = await UserModel.findOne({email : body.email})
    if(isUser){
        throw new ApiError(httpStatus.BAD_REQUEST,'User Already Exist')
    }
    const user = await UserModel.create({...body})
    console.log(user)
    return user
}

module.exports = {
    register
}