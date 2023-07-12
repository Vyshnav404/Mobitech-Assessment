const express = require('express')
const mongoose = require ('mongoose')
const bodyParser = require('body-parser');
const User  = require('./schema');
const { error } = require('console');

const app = express();
const port = 3000;

//parse request bodies as json
app.use(bodyParser.json());

//connect to mongodb using mongoose
mongoose.connect('mongodb://localhost/mobitech',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});
const db = mongoose.connection;

//check mongodb connection status
db.on('error',console.error.bind(console,"MongoDB connection error:"));
db.once('open',()=>{
    console.log('connected to MongoDB')
})

//create a new item
app.post('/api/items',(req,res)=>{
    try {
        console.log("hai===>");
        const newItem = req.body;
    User.create(newItem)
    .then((createdItem)=>{
        res.status(200).json(createdItem);
    })
    .catch((error)=>{
        res.status(500).json({error:error.message})
    })
    } catch (error) {
        console.log("this ====== the error",error);
    }
    
})

//get all items
app.get('/api/items',(req,res)=>{
    User.find()
    .then((items)=>{
        res.json(items);
    })
    .catch((error)=>{
        res.status(500).json({error:error.message})
    })
})

//update an item
app.put('/api/items/:id',(req,res)=>{
    const itemId = req.params.id;
    const updatedItem = req.body;
    User.findByIdAndUpdate(itemId,updatedItem,{new:true})
    .then((updatedItem)=>{
        if(!updatedItem){
            res.status(404).json({error:'item not found'})
        }else{
            res.json(updatedItem)
        }
    })
    .catch((error)=>{
        res.status(500).json({error:error.message})
    })
})

//Delete an item
app.delete('/api/items/:id',(req,res)=>{
    const itemId = req.params.id;
    User.findByIdAndRemove(itemId)
    .then((deletedItem)=>{
        if(!deletedItem){
            res.status(404).json({error:"item not found"});
        }else{
            res.sendStatus(200)
        }
    })
    .catch((error)=>{
        res.status(500).json({error:error.message})
    })
})


// start the server 

app.listen(port,()=>{
    console.log(`server listening on port ${port}`);
})
