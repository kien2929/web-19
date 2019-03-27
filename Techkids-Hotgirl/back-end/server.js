const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const userRouter = require('./api/users/routes');
const postRouter = require('./api/posts/routes');


mongoose.connect('mongodb://localhost:27017/hot-girl',(err)=>{
    if(err) throw err;
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false}));

//routers
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);    


// start server
    app.listen(3000,(err)=>{
    if (err) throw err;
    console.log('Server listen to a port 3000');
})
})