import {validationResult} from "express-validator" ; 

const validate = (req , res , next)=>{
    const result = validationResult(req) ; 
    if(result.isEmpty()){
        return next() ; 
    }

    const extracted = result.array().map((err)=>{
        field : err.path || err.param
        message : err.message
    })

    return res.status(400).json({
        validate : "failed" , 
        error : extracted
    })
}

export default validate ; 
