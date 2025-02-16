const {constant} = require("../constants")

const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode){
        case constant.VALIDATION_ERROR:
            res.json({
                title:"Validation Error",
                message: err.message,
            })
            break
        case constant.NOT_FOUND:
            res.json({
                title:"Not found",
                message:err.message
            })
            break
        case constant.SERVER_ERROR:
            res.json({
                title:"SERVER ERROR",
                message:err.message
            })
            break
        case constant.FORBIDDEN:
            res.json({
                title:"Forbidden",
                message:err.message
            })
            break
        case constant.UNAUTHORIZED:
            res.json({
                title:"Unauthorized",
                message:err.message
            })
            break

        default:
            console.log("no error")
            break
    }
}

module.exports = errorHandler