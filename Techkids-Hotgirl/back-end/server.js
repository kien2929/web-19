const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const userRouter = require('./api/users/routes');

mongoose.connect('mongodb://localhost:27017/hot-girl',(err)=>{
    if(err) throw err;
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false}));

//routers
app.use('/api/users', userRouter);
// start server
    app.listen(3000,(err)=>{
    if (err) throw err;
    console.log('Server listen to a port 3000');
})
    
})