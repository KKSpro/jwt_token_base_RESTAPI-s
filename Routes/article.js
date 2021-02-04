const app = require('express').Router();
const Schema = require('../models/schema')

app.post('/', function (req, res) {
     const query = new Schema({
           title : req.body.title,
           body: req.body.body,
           author : req.body.author
     })
     query.save((err,doc)=>{
         if(err){
             throw err;
         }
          res.status(201).json(doc)
     })
})

app.get('/:id', (req, res) => {
    const {id} = req.params
   
    console.log(id);
    Schema.findOne({_id: id},(err,doc)=>{
        if(err){
            throw err
        }
        if(doc)
        {res.json(doc);}
        else{
            res.status(404).json({error :'Not Found'})
        }
    })
})
app.patch('/:id',(req,res)=>{
      const {id}=req.params;
       const {title , body ,author} = req.body
      Schema.updateOne({_id:id},{title , body ,author}).then(status =>{
          res.json({success : "inserted"});
      }).catch((e)=>{
          console.log(e);
      })

})
app.delete('/:id',(req,res)=>{
    const {id } =req.params
    Schema.deleteOne({_id:id}).then(status =>{
        res.json({id})
    }).catch(e=>{
        res.status(500).json({error :"Server Error"})
    })
})

app.get('/',(req,res)=>{
    Schema.find((err,doc)=>{
        if(err)
        throw err
        else
        res.json(doc)
    })
})

module.exports  = app