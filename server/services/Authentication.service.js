const httpStatus = require("http-status")
const { UserModel } = require("../models")
const ApiError = require("../utils/ApiError")
const { generateToken } = require("../utils/jwt.util")


const register = async(body) => {
      
    // check if user is exist or not
    const isUser = await UserModel.findOne({email : body.email})
    if(isUser){
        throw new ApiError(httpStatus.BAD_REQUEST,'User Already Exist')
    }
    const user = await UserModel.create({...body})
    console.log(user)
    return {message : "User Registered Successfully"}
}

const login = async(body)=>{
   const {email,password} = body
   const user = await UserModel.findOne({email:email})
   if(!user){
      throw new ApiError(httpStatus.NOT_FOUND,"User Not Exists")
   }

  // check credential
  const isMatch = await user.comparePassword(password)
  if(!isMatch){
    throw new ApiError(httpStatus.BAD_REQUEST,'Invalid Credentials')
  }

 // generate token
 const token = await generateToken(user)
  return {message : "Login Successfully",token}
}

const userProfile = async(id)=>{
    return await UserModel.findById(id).select("name email")
}


module.exports = {
    register,
    login,
    userProfile
}