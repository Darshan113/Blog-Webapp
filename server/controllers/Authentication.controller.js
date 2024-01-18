const httpStatus = require("http-status")
const { AuthenticationService } = require("../services")
const catchAsync = require("../utils/catchAsync")

class AuthenticationController {

    // to register new user
    static Register = catchAsync(async(req,res) =>{
        const res_obj = await AuthenticationService.register(req?.body)
        res.status(httpStatus.CREATED).send(res_obj)
    })

    // login user
    static Login = catchAsync(async(req,res) =>{
        const res_obj = await AuthenticationService.login(req?.body)
        res.status(httpStatus.OK).send(res_obj)
    })   
    
    // get  user profile
    static Profile = catchAsync(async(req,res) =>{
        const res_obj = await AuthenticationService.userProfile(req.user)
        res.status(httpStatus.OK).send(res_obj)
    })

        // create blog Post 
        static Post = catchAsync(async(req,res) =>{
            const res_obj = await AuthenticationService.createPost(req?.user,req?.body,req?.file)
            res.status(httpStatus.CREATED).send(res_obj)
        })

        // get all blog Post 
        static getPost = catchAsync(async(req,res) =>{
            const res_obj = await AuthenticationService.getAllPost()
            res.status(httpStatus.OK).send(res_obj)
        })

        // get single post by id
        static getPostById = catchAsync(async(req,res) =>{
            const res_obj = await AuthenticationService.getParticularPost(req.params.id)
            res.status(httpStatus.OK).send(res_obj)
        })

        // delete post by id
        static deletePostById = catchAsync(async(req,res) =>{
            const res_obj = await AuthenticationService.deleteParticularPost(req.params.id)
            res.status(httpStatus.OK).send(res_obj)
        })

}

module.exports = AuthenticationController
