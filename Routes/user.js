const router = require('express').Router()
const middleware = require('../middlewares/auth')
const User = require('../models/usersSchema')

router.post('/' ,middleware,(req,res)=>{
    console.log(req.user);
    User.findOne({email : req.user.email}).select('-password').exec((err,doc)=>{
        if(err){
            return res.json({error:"User not exist"})
        }
        return res.json(doc);
    })  
    
})

module.exports = router
   