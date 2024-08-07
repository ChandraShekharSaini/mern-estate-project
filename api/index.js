const path = require('path')
const express = require('express');
const app = express();
const PORT= process.env.PORT ||4444;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
require('dotenv').config()

app.use(express.json())

app.use(cookieParser())

app.use(express.urlencoded({ extended: true}))

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



mongoose.connect(process.env.MONGO)
.then(()=>{
    app.listen(PORT,()=>{
      console.log("Connected to DB")
        console.log("http://localhost:"+PORT);
    })
})
.catch(error=>{
    console.log(error)
})
