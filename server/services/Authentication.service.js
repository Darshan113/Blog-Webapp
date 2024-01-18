const httpStatus = require("http-status")
const { UserModel, BlogPostModel } = require("../models")
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

const createPost = async(user,body,file) =>{
    const {title,content} = body
    const newTitle = title.split(' ').join('-')
    const isBlogExist = await BlogPostModel.findOne({title}) 
    if(isBlogExist){
        throw new ApiError(httpStatus.BAD_REQUEST,'Title Already Exists Try With Other Name')
    }
    const post =  await BlogPostModel.create({
        title,
        slug : newTitle,
        content,
        image : file.filename,
        user:user
    })

    return post
}


const getAllPost = async()=>{
   const posts =  await BlogPostModel.find({isDeleted : false}).populate('user','name email')
   return {posts , total : posts.length}
}

const getParticularPost = async(id)=>{
   const post =  await BlogPostModel.findOne({_id:id , isDeleted : false}).populate('user','name email')
   return {post}
}

const deleteParticularPost = async(id)=>{
   const post =  await BlogPostModel.findByIdAndUpdate(id,{isDeleted : true})
   return {message : "post deleted successfully"}
}

module.exports = {
    register,
    login,
    userProfile,
    createPost,
    getAllPost,
    getParticularPost,
    deleteParticularPost
}