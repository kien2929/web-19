const express = require('express');
const UserRoutes = express();
const UserModel = require('./models')

userRoutes.post('/',(req,res)=>{
    try{
        const existEmail= await UserModel.findOne({
            email:req.body.email,
        }).exec();
        if(existEmail){
            res.status(403).end('Email has been used');
        }
        const userInfo = req.body;
        const newUser = await UserModel.create(userInfo);
        res.status(201).json(newUser);
    }catch(error){
        res.status(500).end(error.message);
    }
}
)
module.exports=UserRoutes;