const router = require('express').Router();
const User = require('../models/usersSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

 router.post('/',(req,res)=>{
      const {email,password} = req.body

      if(!email || !password)
      {
          return res.status(422).json({error:"All fields are required"})
      }
      User.findOne({email:email},(err,result)=>{
         if(err) 
         {
             return res.status(500).json({error :"server error"})
         }
         if(result){
                 bcrypt.compare(password,result.password).then(user=>{
                     if(user){
                    const accessToken =jwt.sign({
                    id:user._id,
                    name :user.name,
                    email:user.email
                },process.env.jwtsecret,{expiresIn :'50s'});
                return res.send({
                    accessToken:accessToken,
                    type : 'Bearer' 
                })
                }
               return res.status(500).json({error :"Wrong Password"});
                 }).catch(e =>{
                     throw e; 
                 })
         }
         else{
           return res.status(401).json({error :"user not exist"})
         }
      })
 })

 module.exports = router