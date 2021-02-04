const express = require ('express')
const app =express();
const mongoose = require('mongoose')
const router = require('./Routes/article')
const userroute = require('./Routes/register')
const userlogin = require('./Routes/login')
const userdetails = require('./Routes/user')
app.use(express.json());
app.use('/kk',router)
app.use('/kk/register',userroute)
app.use('/kk/login',userlogin)
app.use('/kk/user',userdetails)
const url = `mongodb+srv://dbuser:${process.env.password}@cluster0.vtsye.mongodb.net/${process.env.database}?retryWrites=true&w=majority`
mongoose.connect(url ,{
    useCreateIndex:true,
    useCreateIndex:true,
    useUnifiedTopology:true, 
    useFindAndModify:true
})

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("connected");
}).catch((e)=>{ 
 console.log(e);
})
const port = process.env.port || 3000

    app.listen(port,()=>{
    console.log("server is listening");
}) 