const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const getroute = require('./routes/getroute')
const postroute = require('./routes/postroute');

require('dotenv').config();

const mongoString = process.env.DATABASE_URL;



mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error)=>{
    console.log("error"+error)
})

database.once('connected',function dsuccess() {
    console.log('Database Connected!');
})



const app = express();

app.use(express.json({limit: '50mb'}))

app.use(bodyParser.json());

app.use('/GET',getroute);
app.use('/POST',postroute);


app.listen(2000,()=>{
    console.log(`Server Started at localhost:${2000}`)
})

module.exports = {app,database};