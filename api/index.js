
const express = require('express');
const PORT=4444;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const path = require('path')
require('dotenv').config()



mongoose.connect("mongodb://127.0.0.1:27017/mern-booking")
.then(()=>{
    console.log("Connected to DB")
    
})
.catch(error=>{
    console.log(error)
})




const app = express();

app.use(express.json())

app.use(cookieParser())

app.use(express.urlencoded({ extended: true}))

app.listen(PORT,()=>{
      
    console.log("http://localhost:"+PORT);
})


app.use('/api/user',require('./routes/user.route.js'));
app.use('/api/auth',require('./routes/auth.route.js'))
app.use('/api/listing',require('./routes/listing.route.js'));




app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message ||'Internal Server Error';
     return res.status(statusCode).json({
        success:false,
        statusCode,
        message
     });

})