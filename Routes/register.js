const router = require('express').Router();
const User = require('../models/usersSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.post('/',(req,res)=>{
    const {name ,email,password}=req.body;
    if(!name || !email || !password)
     {
            return res.status(422).json({error:'All fields are required'})            
     }
    
     User.exists({email:email}, async (err,doc)=>{
         if(err)
         {
             return res.status(500).json({error : 'Something went wrong'})
         }
         if(doc)
         {
             return res.status(422).json({error : 'User with this email already exist'})
         }
         else{
              const hashpassword = await bcrypt.hash(password,10)
              const user = new User({
                  name,
                  email,
                  password:hashpassword
              })
              user.save().then(user=>{
                   const accessToken =jwt.sign({
                    id:user._id,
                    name :user.name,
                    email:user.email
                },process.env.jwtsecret,{expiresIn :'30s'})
                return res.send({
                    accessToken:accessToken,
                    type : 'Bearer' 
                })
              }).catch(e=>{
                  return res.status(500).send({error:'Something went wrong'})
              })
         }
     })


})

module.exports= router