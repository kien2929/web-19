const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const userRouter = require('./api/users/routes');
const postRouter = require('./api/posts/routes');
const authRouter =require('./api/auth/routes');
const expressSession = require('express-session')


mongoose.connect('mongodb://localhost:27017/hot-girl',(err)=>{
    if(err) throw err;
    const app = express();
    //midle ware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false}));
    app.use(expressSession({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
      }));

//routers
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);   
app.use('/api/auth',authRouter); 


// start server
    app.listen(3000,(err)=>{
    if (err) throw err;
    console.log('Server listen to a port 3000');
})
})