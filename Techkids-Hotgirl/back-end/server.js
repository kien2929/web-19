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
    app.use(express.static('public'));
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

app.get('/sign-in',(req,res)=>{
    res.status(200).sendFile(path.resolve(__dirname + '/public/sign-in.html'));
});

//register
app.get('/register',(req,res)=>{
    res.status(200).sendFile(path.resolve(__dirname + '/public/register.html'));
});

//create-post
app.get('/posts',(req,res)=>{
    res.status(200).sendFile(path.resolve(__dirname + '/public/posts.html'));
});
// start server
    app.listen(3000,(err)=>{
    if (err) throw err;
    console.log('Server listen to a port 3000');
})
})