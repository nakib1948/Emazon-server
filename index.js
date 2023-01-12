const { MongoClient, ServerApiVersion } = require('mongodb');

const express = require('express')
const app = express()
const bodyParser=require('body-parser')
const cors=require('cors')
const port = 5000

const uri = `mongodb+srv://Hayat:Hayat@cluster0.qxayaa3.mongodb.net/?retryWrites=true&w=majority`;

require('dotenv').config()

app.use(bodyParser.json())
app.use(cors())



const client = new MongoClient(uri);


    const database = client.db("insertDB");
    const haiku = database.collection("haiku");
    // create a document to insert
    app.post('/addProduct',(req,res)=>{
         const product=req.body;
         haiku.insertMany(product)
         .then(result=>{
          console.log(result.insertedCount)
          
        }) 
  }) 

    app.get('/products',(req,res)=>{
      haiku.find({})
      .toArray((err,documents)=>{
        res.send(documents)
      })
    })
 
    app.get('/product/:key',(req,res)=>{
      haiku.find({key: req.params.key})
      .toArray((err,documents)=>{
        res.send(documents)
      })
    })


  app.post('/productsByKeys',(req,res)=>{
    const productKeys=req.body;
    
    haiku.find({key: {$in: productKeys}})
    .toArray((err,documents)=>{
      
      res.send(documents);
    })
  })






app.get('/',(req,res)=>{
  res.send('Hello Wolrd')
})

app.listen(port)