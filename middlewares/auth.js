const jwt = require('jsonwebtoken')
require('dotenv').config()

function usermiddleware(req,res,next){
    let token = req.headers.authorization.split(' ')[1];
    // console.log(token);
    // return res.json({token:token}) 
    if(token){
        jwt.verify(token,process.env.jwtsecret,(err,user)=>{
         if(err)
            {
                return res.json({error : "Invalid Token"})
            }
            console.log(user);
            req.user = user
            next();
        })
    }else{
        return res.json({error : "header required"})
    }
}

module.exports = usermiddleware